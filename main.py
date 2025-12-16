from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import numpy as np
import tensorflow as tf
import uvicorn
import traceback

app = FastAPI(
    title="Anemia Screening API",
    description="Single-model anemia screening from conjunctiva image.",
    version="1.0.0",
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

anemia_model = None
IMG_SIZE = 224  # change if your training used a different size


def load_anemia_model():
    global anemia_model
    try:
        print("=== Loading anemia_model.keras ===")
        anemia_model = tf.keras.models.load_model("efficientnet_model.keras")
        print("=== Model loaded successfully ===")
        try:
            anemia_model.summary()
        except Exception:
            pass
    except Exception:
        print("=== FATAL: Could not load anemia_model.keras ===")
        traceback.print_exc()
        anemia_model = None


load_anemia_model()


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((IMG_SIZE, IMG_SIZE))
    arr = np.array(image).astype("float32") / 255.0
    return arr


@app.post("/screen/")
async def screen_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty file uploaded.")

    img = preprocess_image(image_bytes)
    input_tensor = np.expand_dims(img, axis=0)

    if anemia_model is not None:
        preds = anemia_model.predict(input_tensor)
        p_anemic = float(np.squeeze(preds))  # sigmoid output 0–1
    else:
        print("WARNING: anemia_model is None, returning dummy prediction")
        p_anemic = 0.42  # TEMP fallback

    confidence_score = p_anemic

    if confidence_score >= 0.75:
        risk_level = "High"
        recommendation = (
            "High Risk: The model is confident that signs of anemia are present. "
            "It is highly recommended to consult a doctor for a clinical diagnosis."
        )
    elif confidence_score >= 0.40:
        risk_level = "Moderate"
        recommendation = (
            "Moderate Risk: The model has detected some potential indicators of anemia. "
            "Monitoring your health and considering a consultation with a doctor is advised."
        )
    else:
        risk_level = "Low"
        recommendation = (
            "Low Risk: The model did not detect strong visual indicators of anemia. "
            "Continue to monitor your health as usual."
        )

    return JSONResponse(
        content={
            "filename": file.filename,
            "confidence_score": float(confidence_score),
            "risk_level": risk_level,
            "recommendation": recommendation,
        }
    )


@app.get("/")
def read_root():
    return {"status": "Anemia Screening API is running."}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
