import { useState } from "react";
import WeatherCard from "../components/ui/WeatherCard";
import { fetchWeather } from "../lib/utils";

interface ForecastData {
  date: string;
  weather: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind: number;
  pressure: number;
  clouds: number;
}

const WeatherPage: React.FC = () => {
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [region, setRegion] = useState("");
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);

  interface Coordinates {
    lat: number;
    lon: number;
  }

  const locations: Record<string, Record<string, Record<string, Coordinates>>> = {
    Mumbai: {
      "South Mumbai": {
        "Colaba Port": { lat: 18.9067, lon: 72.8147 },
        "Versova Jetty": { lat: 19.14, lon: 72.795 },
      },
      "Western Mumbai": {
        "Marve Beach": { lat: 19.1928, lon: 72.7897 },
        "Madh Island": { lat: 19.145, lon: 72.79 },
      },
    },
    Ratnagiri: {
      Jaigad: {
        "Jaigad Port": { lat: 17.326, lon: 73.215 },
        "Ganpatipule Beach": { lat: 17.147, lon: 73.283 },
      },
      "Ratnagiri City": {
        "Mirya Beach": { lat: 17.002, lon: 73.302 },
        "Bhatye Beach": { lat: 16.991, lon: 73.296 },
      },
    },
    Sindhudurg: {
      Malvan: {
        "Tarkarli Beach": { lat: 16.063, lon: 73.474 },
        "Chivla Beach": { lat: 16.06, lon: 73.46 },
      },
      Devgad: {
        "Vijaydurg Port": { lat: 16.566, lon: 73.3 },
        "Devgad Beach": { lat: 16.383, lon: 73.333 },
      },
    },
  };

  const handleGetForecast = async () => {
    if (!district || !subdistrict || !region) {
      alert("Please select district, subdistrict, and sea region!");
      return;
    }

    const { lat, lon } = locations[district][subdistrict][region];
    setLoading(true);

    try {
      const data = await fetchWeather(lat, lon);
      setForecast(data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      alert("Failed to fetch forecast. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#e0f7fa", minHeight: "100vh", padding: "30px 15px", textAlign: "center" }}>
      <div
        style={{
          backgroundColor: "#0288d1",
          borderRadius: 14,
          padding: "25px 0",
          marginBottom: 25,
          width: "90%",
          maxWidth: 600,
          marginInline: "auto",
          color: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2>🌊 Marine Weather Forecast</h2>
        <p>Plan your fishing safely</p>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 20,
          width: "90%",
          maxWidth: 600,
          marginInline: "auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <label style={styles.label}>📍 Select District</label>
        <select
          style={styles.select}
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setSubdistrict("");
            setRegion("");
          }}
        >
          <option value="">Select District</option>
          {Object.keys(locations).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {district && (
          <>
            <label style={styles.label}>🏖 Select Subdistrict</label>
            <select
              style={styles.select}
              value={subdistrict}
              onChange={(e) => {
                setSubdistrict(e.target.value);
                setRegion("");
              }}
            >
              <option value="">Select Subdistrict</option>
              {Object.keys(locations[district]).map((sd) => (
                <option key={sd} value={sd}>
                  {sd}
                </option>
              ))}
            </select>
          </>
        )}

        {subdistrict && (
          <>
            <label style={styles.label}>⚓ Select Sea Region / Port</label>
            <select
              style={styles.select}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">Select Region</option>
              {Object.keys(locations[district][subdistrict]).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </>
        )}

        <button style={styles.button} onClick={handleGetForecast}>
          🌤 Get Forecast
        </button>
      </div>

      {loading && <p style={{ marginTop: 20 }}>⏳ Loading forecast...</p>}

      {forecast.length > 0 && (
        <>
          <h3 style={{ marginTop: 30, color: "#01579b" }}>
            🌦 Forecast for {region}, {subdistrict}, {district}
          </h3>
          <div style={styles.grid}>
            {forecast.map((f, i) => (
              <WeatherCard key={i} data={f} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  label: {
    display: "block",
    marginTop: 10,
    fontWeight: 600,
    color: "#0277bd",
  },
  select: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #90caf9",
    marginTop: 6,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4fc3f7",
    border: "none",
    borderRadius: 10,
    padding: "12px 24px",
    color: "#004d40",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
    marginTop: 10,
    boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
};

export default WeatherPage;
