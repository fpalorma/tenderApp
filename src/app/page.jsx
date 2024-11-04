"use client";
import { useState, useEffect } from "react";
import ForecastCard from "@/app/components/ForecastCard.jsx";

export default function Home() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [zone, setZone] = useState(null);
  const [province, setProvince] = useState(null);
  const [isToday, setIsToday] = useState(true);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
          setLat(latitude);
          setLon(longitude);
        },
        (error) => {
          console.error("Error al obtener la geolocalización: ", error);
        }
      );
    } else {
      console.error("Geolocalización no soportada por este navegador.");
    }
  }, []);
  useEffect(() => {
    const fetchLocationData = async () => {
      if (lat !== null && lon !== null) {
        console.log("Coordenadas:", lat, lon); // Verifica las coordenadas
        try {
          const response = await fetch(
            `/api/getLocationKey?lat=${lat}&lon=${lon}`
          );
          if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.statusText}`);
          }
          const data = await response.json();
          console.log("Datos de ubicación:", JSON.stringify(data, null, 2)); // Formato legible
          setLocationData(data.Key);
          setProvince(data.AdministrativeArea.LocalizedName);
          setZone(data.LocalizedName);
        } catch (error) {
          console.error("Error al obtener los datos de ubicación:", error);
        }
      }
    };
    fetchLocationData();
  }, [lat, lon]);
  useEffect(() => {
    const fetchForecast = async () => {
      if (locationData !== null) {
        console.log("location key is:", locationData); // Verifica locationData
        try {
          const response = await fetch(
            `/api/getForecast?locationKey=${locationData}`
          );
          if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.statusText}`);
          }
          const data = await response.json();
          console.log("Forecast:", JSON.stringify(data, null, 2)); // Formato legible
          setForecast(data);
        } catch (error) {
          console.error("Error al obtener los datos de ubicación:", error);
        }
      }
    };
    fetchForecast();
  }, [locationData]);
  const toggleDay = () => {
    setIsToday((prevIsToday) => !prevIsToday);
  };
  return (
    <>
      {locationData && forecast ? (
         <ForecastCard
         title={isToday ? "Hoy" : "Mañana"}
         zone={zone}
         province={province}
         isRaining={forecast.DailyForecasts[isToday ? 0 : 1].Day.HasPrecipitation}
         phrase={forecast.DailyForecasts[isToday ? 0 : 1].Day.LongPhrase}
         tempMin={forecast.DailyForecasts[isToday ? 0 : 1].Temperature.Minimum.Value}
         tempMax={forecast.DailyForecasts[isToday ? 0 : 1].Temperature.Maximum.Value}
       />
      ) : (
        <div className="bg-peach-pastel max-w-fit p-4 m-auto font-mono shadow-md mb-2 rounded-sm text-black">
          <p className="text-xl">Pronóstico</p>
          <p>Localizando...</p>
          <p>temperatura pendiente...</p>
          <p>temperatura pendiente...</p>
          <p>Cargando pronóstico...</p>
          <p>No hay datos de pronóstico disponibles...</p>
        </div>
      )}
       {locationData && forecast &&(

      <button onClick={toggleDay} className="mb-4 p-2 bg-peach-pastel text-black rounded hover:bg-orange-400 mx-auto block">
        Mostrar {isToday ? "Mañana" : "Hoy"}
      </button>
       )}
    </>
  );
}
