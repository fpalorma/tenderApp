"use client";
import { useState, useEffect } from "react";
import ForecastCard from "@/app/components/ForecastCard.jsx";
import LoadingCard from "@/app/components/LoadingCard.jsx";
import ErrorCard from "@/app/components/ErrorCard.jsx";

export default function Home() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [zone, setZone] = useState(null);
  const [province, setProvince] = useState(null);
  const [isToday, setIsToday] = useState(true);
  const [isError, setError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLat(latitude);
          setLon(longitude);
        },
        () => setError(true)
      );
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    const fetchLocationData = async () => {
      if (lat !== null && lon !== null) {
        try {
          const response = await fetch(`/api/getLocationKey?lat=${lat}&lon=${lon}`);
          if (!response.ok) throw new Error(`Error en la respuesta: ${response.statusText}`);
          const data = await response.json();
          setLocationData(data.Key);
          setProvince(data.AdministrativeArea.LocalizedName);
          setZone(data.LocalizedName);
        } catch {
          setError(true);
        }
      }
    };
    fetchLocationData();
  }, [lat, lon]);

  useEffect(() => {
    const fetchForecast = async () => {
      if (locationData !== null) {
        try {
          const response = await fetch(`/api/getForecast?locationKey=${locationData}`);
          if (!response.ok) throw new Error(`Error en la respuesta: ${response.statusText}`);
          const data = await response.json();
          setForecast(data);
        } catch {
          setError(true);
        }
      }
    };
    fetchForecast();
  }, [locationData]);

  const toggleDay = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsToday((prevIsToday) => !prevIsToday);
      setIsTransitioning(false);
    }, 200); 
  };

  return (
    <>
      {isError ? (
        <ErrorCard />
      ) : locationData && forecast ? (
        <>
          <div
            className={`transition-opacity duration-200 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <ForecastCard
              title={isToday ? "Hoy" : "Mañana"}
              zone={zone}
              province={province}
              isRaining={forecast.DailyForecasts[isToday ? 0 : 1].Day.HasPrecipitation}
              isRainingAtNight={forecast.DailyForecasts[isToday ? 0 : 1].Night.HasPrecipitation}
              phrase={forecast.DailyForecasts[isToday ? 0 : 1].Day.LongPhrase}
              tempMin={forecast.DailyForecasts[isToday ? 0 : 1].Temperature.Minimum.Value}
              tempMax={forecast.DailyForecasts[isToday ? 0 : 1].Temperature.Maximum.Value}
              tenderFueraImg={isToday? "/tender-fuera.jpeg":"/tender-fuera2.webp"}
            />
          </div>
          <button
            onClick={toggleDay}
            className="mb-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
          >
            Mostrar {isToday ? "Mañana" : "Hoy"}
          </button>
        </>
      ) : (
        <LoadingCard />
      )}
    </>
  );
}
