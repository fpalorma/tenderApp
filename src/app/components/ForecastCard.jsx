import Image from "next/image"

const ForecastCard = ({locationData, forecast, isRaining, phrase, tempMin, tempMax, zone, province})=>{
    return(
        <div className="bg-peach-pastel max-w-fit p-4 m-auto  font-mono shadow-md mb-2 rounded-sm">
        {/* {lat ? <p>lat= {lat}</p> : <p>Latitud pendiente</p>} */}
          {/* {lon ? <p>lon= {lon}</p> : <p>longitud pendiente</p>} */}
          {{locationData} ? (
            <p>{zone}, {province}</p>
          ) : (
            <p>Localizando...</p>
          )}
          {{forecast} ? (
            <p>
              Temperatura máxima esperada:{" "}
              {tempMax}°C
            </p>
          ) : (
            <p>temperatura pendiente</p>
          )}
          {{forecast} ? (
            <p>
              Temperatura mínima esperada:{" "}
              {tempMin}°C
            </p>
          ) : (
            <p>temperatura pendiente</p>
          )}
          {
            {forecast}?(
              <p>{phrase}</p>
            ):(<p>Cargando pronóstico</p>)
          }
          {{forecast} ? (
          <>
              {{isRaining} ? (
                <>
                <p>Tender adentro</p>
                <Image width="300" height="300"src="/tender-dentro.jpeg" alt="ropa secándose dentro de casa" />
                </>
              ) : (
                <>
                <p>Tender afuera</p>
                <Image width="300" height="300"src="/tender-fuera.jpeg" alt="ropa secándose bajo el sol" />
                </>
              )}
              </>
          ) : (
            <p>No hay datos de pronóstico disponibles.</p>
          )}
        </div>
    )
}

export default ForecastCard