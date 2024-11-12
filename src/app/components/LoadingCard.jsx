import Image from "next/image"
const LoadingCard = ()=>{
    return (
        <div className="flex flex-col items-center mb-5 m-x-2 mt-10 text-black dark:text-white">
            <h2 className="font-semibold text-xl">Buscando datos del clima...</h2>
          <Image
            width="300"
            height="300"
            src="/radar.gif"
            alt="radar"
            priority
            style={{borderRadius: "50%"}}
          />
        </div>
    )
}
export default LoadingCard