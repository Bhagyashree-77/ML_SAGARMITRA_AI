import streamlit as st
import requests
import pandas as pd

FASTAPI_URL = "http://127.0.0.1:8000/predict"

st.set_page_config(page_title="Fishing Safety", layout="wide")
st.title("🎣 Fishing Safety Prediction + 7-Day Forecast Cards")


# ----------------------------
# FETCH 7-DAY FORECAST DATA
# ----------------------------
def get_forecast(lat, lon):
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}"
        f"&daily=wind_speed_10m_max,rain_sum,precipitation_sum,"
        f"shortwave_radiation_sum,apparent_temperature_mean"
        f"&timezone=auto"
    )
    res = requests.get(url).json()
    daily = res["daily"]

    df = pd.DataFrame({
        "date": daily["time"],
        "wind": daily["wind_speed_10m_max"],
        "rain": daily["rain_sum"],
        "precip": daily["precipitation_sum"],
        "radiation": daily["shortwave_radiation_sum"],
        "temp": daily["apparent_temperature_mean"]
    })
    return df


# ----------------------------
# SAFETY PREDICTION (FastAPI)
# ----------------------------
def get_safety(row):
    payload = {
        "wind_speed_10m_max": row["wind"],
        "rain_sum": row["rain"],
        "precipitation_sum": row["precip"],
        "shortwave_radiation_sum": row["radiation"],
        "apparent_temperature_mean": row["temp"]
    }
    res = requests.post(FASTAPI_URL, json=payload).json()
    return res["safe"], res["message"]


# ----------------------------
# USER INPUT
# ----------------------------
col1, col2 = st.columns(2)
lat = col1.number_input("Latitude", value=18.87522)
lon = col2.number_input("Longitude", value=72.814964)

if st.button("Get 7-Day Forecast + Safety"):
    with st.spinner("Fetching weather forecast..."):
        df = get_forecast(lat, lon)

    st.subheader("📅 7-Day Forecast with Fishing Safety")

    # ------------------------------------
    # DISPLAY FORECAST IN CARDS
    # ------------------------------------
    for i, row in df.iterrows():

        safe, msg = get_safety(row)

        card_color = "#C8F7C5" if safe else "#F6C6C6"
        emoji = "✅" if safe else "❌"

        st.markdown(
            f"""
            <div style="
                padding: 20px;
                border-radius: 12px;
                background-color: {card_color};
                margin-bottom: 15px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            ">
                <h3>{row['date']} — {emoji} {msg}</h3>

                <p><b>💨 Wind:</b> {row['wind']} km/h</p>
                <p><b>🌧 Rain:</b> {row['rain']} mm</p>
                <p><b>☔ Precipitation:</b> {row['precip']} mm</p>
                <p><b>🔆 Radiation:</b> {row['radiation']} MJ/m²</p>
                <p><b>🌡 Temp:</b> {row['temp']} °C</p>
            </div>
            """,
            unsafe_allow_html=True
        )
