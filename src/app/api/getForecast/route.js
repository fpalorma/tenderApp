export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const locationKey = searchParams.get('locationKey');
    const apiKey = process.env.SECRET_KEY;
    
  
    if (!locationKey|| !apiKey) {
      return new Response(JSON.stringify({ error: "locationKey o clave API no definida" }), { status: 400 });
    }
  
    try {
      const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true&language=es-ar&details=true`);
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