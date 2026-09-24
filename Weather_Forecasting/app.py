import streamlit as st
import folium
from streamlit_folium import st_folium
import requests

PREDICT_API = "http://localhost:8000/predict"

st.set_page_config(page_title="Fishing Safety", page_icon="🎣")

st.title("🎯 Fishing Safety Prediction")
st.write("Click on the map to select a location and automatically fetch weather data.")


# -----------------------------------------------------------
# CLICKABLE MAP (Folium)
# -----------------------------------------------------------

st.subheader("🗺 Click on the map to choose a location")

m = folium.Map(location=[20.5937, 78.9629], zoom_start=5)  # India center

# Add Leaflet click listener
m.add_child(folium.LatLngPopup())

map_data = st_folium(m, height=450, width=700)

lat, lon = None, None

if map_data and map_data["last_clicked"]:
    lat = map_data["last_clicked"]["lat"]
    lon = map_data["last_clicked"]["lng"]
    st.success(f"📍 Location Selected: {lat}, {lon}")


# -----------------------------------------------------------
# WEATHER API FETCH
# -----------------------------------------------------------

def fetch_weather(lat, lon):
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}"
        f"&daily=wind_speed_10m_max,rain_sum,precipitation_sum,"
        f"shortwave_radiation_sum,apparent_temperature_mean"
        f"&timezone=auto"
    )
    res = requests.get(url).json()
    d = res["daily"]

    return {
        "wind_speed_10m_max": d["wind_speed_10m_max"][0],
        "rain_sum": d["rain_sum"][0],
        "precipitation_sum": d["precipitation_sum"][0],
        "shortwave_radiation_sum": d["shortwave_radiation_sum"][0],
        "apparent_temperature_mean": d["apparent_temperature_mean"][0]
    }


# -----------------------------------------------------------
# PREDICTION
# -----------------------------------------------------------
if lat and lon:
    if st.button("Get Weather & Predict Fishing Safety"):
        with st.spinner("Fetching weather data..."):
            weather = fetch_weather(lat, lon)
        
        st.subheader("🌤 Weather Data")
        st.json(weather)

        with st.spinner("Checking safety..."):
            result = requests.post(PREDICT_API, json=weather).json()
        
        st.subheader("🎣 Fishing Safety Result")
        if result["safe"]:
            st.success("✅ SAFE FOR FISHING")
        else:
            st.error("❌ NOT SAFE FOR FISHING")

        st.write("📌", result["message"])
else:
    st.info("Click anywhere on the map to select a location.")
