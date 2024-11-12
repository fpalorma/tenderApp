import Image from "next/image";

const ForecastCard = ({
  title,
  isRaining,
  phrase,
  tempMin,
  tempMax,
  zone,
  province,
  isRainingAtNight,
}) => {
  return (
    <div className="flex flex-col items-center mb-5 m-x-2 divide-y text-black dark:text-white">
      <p>
        {zone}, {province}
      </p>
      <p className="text-xl font-bold">{title}</p>
      {isRaining ? (
        <>
          <p>Tender adentro</p>
          <Image
            width="300"
            height="300"
            src="/tender-dentro.jpeg"
            alt="ropa secándose dentro de casa"
            priority
          />
        </>
      ) : (
        <>
          <p>Tender afuera</p>
          <Image
            width="300"
            height="300"
            src="/tender-fuera.jpeg"
            alt="ropa secándose bajo el sol"
            priority
          />
        </>
      )}
      <div className="flex flex-col gap-2 justify-center items-center max-w-[300px] mt-2">
        <p className="font-medium text-lg">Detalles:</p>
        <div>

        <p className="text-center">Máx: {tempMax}°C</p>
        <p className="text-center">Min: {tempMin}°C</p>
        </div>

        <p className="text-center">{phrase}</p>
      </div>
      {
        !isRaining && isRainingAtNight &&(
          <>
          <p className="text-red-600">Posibles tormentas hacia la noche</p>
          </>
        )
      }
    </div>
  );
};

export default ForecastCard;
