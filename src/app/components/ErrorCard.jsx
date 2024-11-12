import Image from "next/image"
const ErrorCard = ()=>{
    return (
        <div className="flex flex-col items-center mb-5 m-x-2 mt-10 text-black dark:text-white">
            <h2 className="font-semibold text-xl mb-2">Ups! algo salió mal...</h2>
          <Image
            width="300"
            height="300"
            src="/error-img.webp"
            alt="something went wrong"
            priority
            
          />
          <p className="mx-4 text-center mt-2">Espera un momento y vuelve a cargar la página.<br></br> Recuerda tener habilitado los permisos de acceso de tu dispositivo a tu ubicación</p>
        </div>
    )
}
export default ErrorCard