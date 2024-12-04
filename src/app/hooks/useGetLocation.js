import { useState, useEffect} from "react"

export function useGetLocation ({ lat, lon }){
    const [locationData, setLocationData] = useState(null);
    const [province, setProvince] = useState(null);
    const [zone, setZone] = useState(null);
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
      return { locationData, zone, province }
}