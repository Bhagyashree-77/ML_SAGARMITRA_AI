
import { WiDayCloudy, WiThermometer, WiStrongWind, WiHumidity } from "react-icons/wi";
import { FaTachometerAlt, FaCloud } from "react-icons/fa";

const WeatherCard = ({ data }) => {
  const { date, weather, temp, humidity, wind, pressure, clouds} = data;

  const isSafeForFishing =
    wind <= 20 && temp >= 20 && !["Thunderstorm", "Rain", "Snow"].includes(weather);
  const formattedWind = Number(data.wind.toFixed(3));

  // 🌬 Wind (OpenWeather gives m/s)
  const windSpeedMs = wind;
  const windSpeedKmh = Number((windSpeedMs * 3.6).toFixed(2));

  // 🌊 Wave speed estimation (OpenWeather does not provide wave data)
  // Marine approximation: Wave Speed ≈ 0.8 × Wind Speed
  const waveSpeed = Number((windSpeedMs * 0.8).toFixed(2)); // m/s


  return (
    <div
      style={{
        backgroundColor: isSafeForFishing ? "#e9f9ef" : "#fdecea",
        borderRadius: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: 20,
        margin: 15,
        textAlign: "center",
        width: 300,
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>📅 {date}</h3>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <WiDayCloudy size={28} color="#555" />
        <span style={{ fontSize: 16 }}>{weather}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <WiThermometer size={28} color="#ff7b00" />
        <span style={{ fontSize: 16 }}>
          Temp: {temp.toFixed(2)}°C
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <WiHumidity size={28} color="#1e90ff" />
        <span style={{ fontSize: 16 }}>Humidity: {humidity}%</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <WiStrongWind size={28} color="#00bcd4" />
        <span style={{ fontSize: 16 }}>Wind: {formattedWind} km/h</span>
      </div>
      {/* 🌊 Wave Speed */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <FaTachometerAlt size={28} color="#0097a7" />
        <span>Wave Speed: {waveSpeed} m/s</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <FaTachometerAlt size={22} color="#666" />
        <span style={{ fontSize: 16 }}>Pressure: {pressure} hPa</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <FaCloud size={20} color="#777" />
        <span style={{ fontSize: 16 }}>Clouds: {clouds}%</span>
      </div>

      <div
        style={{
          backgroundColor: isSafeForFishing ? "#d4edda" : "#f8d7da",
          borderRadius: 10,
          marginTop: 10,
          padding: 8,
        }}
      >
        <strong style={{ color: isSafeForFishing ? "#155724" : "#721c24" }}>
          {isSafeForFishing ? "✅ Safe for Fishing" : "⚠️ Not Safe for Fishing"}
        </strong>
      </div>
    </div>
  );
};

export default WeatherCard;
