from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

# Load models
classifier = joblib.load("classifier.pkl")
arima_model = joblib.load("wind_arima.pkl")


# --------------------------------------------
# 1) Predict Safe/Unsafe
# --------------------------------------------
@app.post("/predict")
def predict(data: dict):
    features = [
        data["wind_speed_10m_max"],
        data["rain_sum"],
        data["precipitation_sum"],
        data["shortwave_radiation_sum"],
        data["apparent_temperature_mean"]
    ]
    pred = classifier.predict([features])[0]

    return {
        "safe": bool(pred),
        "message": "Safe for fishing" if pred == 1 else "Unsafe for fishing"
    }


# --------------------------------------------
# 2) Forecast wind using ARIMA
# --------------------------------------------
@app.get("/forecast")
def forecast_wind(days: int = 7):

    # Forecast future values
    forecast_values = arima_model.forecast(steps=days)

    return {
        "days": days,
        "forecast": list(np.round(forecast_values, 2))
    }
