from fastapi import FastAPI, UploadFile, File
from inference_sdk import InferenceHTTPClient
import base64

app = FastAPI()

CLIENT = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key="jORPCW8UaFLxjVCm2NBd"
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read file bytes directly
    # Read file bytes
    file_bytes = await file.read()

    # Convert → Base64 (Roboflow requirement)
    image_b64 = base64.b64encode(file_bytes).decode("utf-8")

    # Perform inference
    result = CLIENT.infer(
        image= "fish.png",
        model_id="fish-species-fmt6s/1"
    )

    # If no detections
    if "predictions" not in result or len(result["predictions"]) == 0:
        return {"message": "No species detected", "predictions": []}

    return result