import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Replace this with your OpenWeather API key
const API_KEY = "e2f2e1b594f52a1c0c6a9227f74ba8c4";

/**
 * Fetch 7-day daily weather forecast from OpenWeatherMap
 * @param lat Latitude
 * @param lon Longitude
 * @returns Weather forecast data
 */
export const fetchWeather = async (lat: number, lon: number) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    // Group hourly data into days
    const daily: Record<string, any[]> = {};
    data.list.forEach((e: any) => {
      const date = e.dt_txt.split(" ")[0];
      if (!daily[date]) daily[date] = [];
      daily[date].push(e);
    });

    // Calculate average values per day
    return Object.keys(daily).map((date) => {
      const entries = daily[date];
      const avg = (f: (e: any) => number) =>
        entries.reduce((sum, e) => sum + f(e), 0) / entries.length;

      const weather =
        entries[Math.floor(entries.length / 2)].weather[0].description;

      return {
        date,
        weather,
        temp: avg((e) => e.main.temp),
        feels_like: avg((e) => e.main.feels_like),
        humidity: avg((e) => e.main.humidity),
        wind: avg((e) => e.wind.speed),
        pressure: avg((e) => e.main.pressure),
        clouds: avg((e) => e.clouds.all),
      };
    });
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

/**
 * Merge Tailwind CSS class names conditionally
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
