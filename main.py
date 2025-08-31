from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PIL import Image
import io
import numpy as np
import tensorflow as tf
import joblib
import uvicorn

# --- 1. Initialize FastAPI app ---
app = FastAPI(
    title="Anemia Screening API",
    description="An API that uses a stacking ensemble model to predict the likelihood of anemia from a conjunctiva image.",
    version="1.0.0"
)

# --- 2. Load the trained models on startup ---
try:
    base_model_effnet = tf.keras.models.load_model('efficientnet_model.keras')
    base_model_resnet = tf.keras.models.load_model('resnet_model.keras')
    meta_model = joblib.load('meta_model.joblib')
    print("All models loaded successfully.")
    
    # --- THIS IS THE KEY FIX ---
    # Get the class names directly from the saved model or a config
    # For this example, we know the order from the training script.
    # A more robust solution would save class_names with the model.
    class_names = ['Anemic', 'Non-anemic'] # Assuming alphabetical order: Anemic=0, Non-anemic=1
    # Find the index that corresponds to the "Anemic" class
    ANEMIC_CLASS_INDEX = meta_model.classes_.tolist().index(0) # Find where class '0' (Anemic) is in the output
    print(f"Anemic class index identified as: {ANEMIC_CLASS_INDEX}")

except Exception as e:
    print(f"FATAL: Could not load models. Error: {e}")
    base_model_effnet, base_model_resnet, meta_model = None, None, None


# --- 3. Preprocessing function for a single image ---
IMG_SIZE = 224

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((IMG_SIZE, IMG_SIZE))
    return np.array(image)


# --- 4. Define the prediction endpoint ---
@app.post("/screen/")
async def screen_image(file: UploadFile = File(...)):
    if not all([base_model_effnet, base_model_resnet, meta_model]):
        raise HTTPException(status_code=503, detail="Models are not loaded or failed to load. API is not operational.")

    image_bytes = await file.read()
    processed_image = preprocess_image(image_bytes)
    input_tensor = np.expand_dims(processed_image, axis=0)
    
    pred_effnet = base_model_effnet.predict(input_tensor)[0][0]
    pred_resnet = base_model_resnet.predict(input_tensor)[0][0]

    meta_features = np.array([[pred_effnet, pred_resnet]])
    
    # --- USE THE CORRECT INDEX FOR THE CONFIDENCE SCORE ---
    # Get the probability for the specific "Anemic" class index
    confidence_score = meta_model.predict_proba(meta_features)[0][ANEMIC_CLASS_INDEX]

    # ... (The rest of the recommendation logic remains the same) ...
    if confidence_score >= 0.75:
        risk_level = "High"
        recommendation = "High Risk: The model is confident that signs of anemia are present. It is highly recommended to consult a doctor for a clinical diagnosis."
    elif confidence_score >= 0.40:
        risk_level = "Moderate"
        recommendation = "Moderate Risk: The model has detected some potential indicators of anemia. Monitoring your health and considering a consultation with a doctor is advised."
    else:
        risk_level = "Low"
        recommendation = "Low Risk: The model did not detect strong visual indicators of anemia. Continue to monitor your health as usual."

    return JSONResponse(content={
        "filename": file.filename,
        "confidence_score": float(confidence_score),
        "risk_level": risk_level,
        "recommendation": recommendation
    })


# --- 5. Root endpoint and main execution block (no changes) ---
@app.get("/")
def read_root():
    return {"status": "Anemia Screening API is running."}

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
