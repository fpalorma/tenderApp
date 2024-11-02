// app/api/getLocationKey/route.js
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const apiKey = process.env.SECRET_KEY;
    
  
    if (!lat || !lon || !apiKey) {
      return new Response(JSON.stringify({ error: "Latitud, longitud o clave API no definida" }), { status: 400 });
    }
  
    try {
      const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}`);
      if (!response.ok) {
        throw new Error(`Error en la solicitud a AccuWeather: ${response.statusText}`);
      }
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      console.error("Error en la solicitud a AccuWeather:", error);
      return new Response(JSON.stringify({ error: "Error al obtener los datos de ubicación" }), { status: 500 });
    }
  }
  