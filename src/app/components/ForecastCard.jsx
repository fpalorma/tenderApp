import Image from "next/image";

const ForecastCard = ({
  title,
  isRaining,
  phrase,
  tempMin,
  tempMax,
  zone,
  province,
}) => {
  return (
    <div className="bg-peach-pastel max-w-fit p-4 m-auto  font-mono shadow-md mb-2 rounded-sm text-black">
      <p className="text-xl">{title}</p>
      <p>
        {zone}, {province}
      </p>

      <p>Temperatura máxima esperada: {tempMax}°C</p>

      <p>Temperatura mínima esperada: {tempMin}°C</p>

      <p>{phrase}</p>

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
    </div>
  );
};

export default ForecastCard;
