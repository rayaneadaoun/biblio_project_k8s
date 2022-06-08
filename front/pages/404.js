import { useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/dist/client/image"
import Link from "next/dist/client/link"
export default function Custom404() {
  const router = useRouter()



  return (
    <div className='row justify-content-center'>
      <div className="col">
          <Image
            className="card-img-top text-center mt-2"
            src="/images/book-burning.png" // Route of the image file
            height={800}  //Desired size with correct aspect ratio
            width={1200} // Desired size with correct aspect ratio
            alt="Card image user"
            quality={65}
            layout="fixed"
          />
      </div>
      <div className="col align-self-center text-center text-white">
        <div className="row">       
            <h1>Erreur 404</h1>
            <h1>Désolé</h1>
        </div>
        <div className="row">
            <span>La page que vous cherchez est partie en fumée</span> <br></br>
        </div>
        <div className="row justify-content-center mt-3">
            <Link href={`/`} className=" nav-link text-white">
              <button type="button" className="col-3 btn btn-success"> Revenir au menu principal</button>
            </Link>
        </div>

      
      </div>
    </div>
  )
}