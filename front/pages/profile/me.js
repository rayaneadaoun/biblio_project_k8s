import Layout from '../../components/layout';
import { getCurrentUser } from '../../lib/users';
import { getBooksForUser } from '../../lib/books';
import Head from 'next/head';
import Image from 'next/image';
import { userService , bookService  } from '../../services';
import { useRouter } from 'next/router';
import BookCard from '../../components/Book';



 export default function Profile({userData = userService.userValue }) {
    function logout() {
        userService.logout();
    }
  return ( 
  <Layout>
    <Head>
      <title>Votre profil</title>
    </Head>
    <div className='row justify-content-center'>
      <div className="card col-4 h-100 m-2" >
        <div className='row justify-content-center '>
              <Image
                className="card-img-top text-center mt-2"
                src="/images/profil-img.jpg" // Route of the image file
                height={200}  //Desired size with correct aspect ratio
                width={150} // Desired size with correct aspect ratio
                alt="Card image user"
                quality={65}
                layout="fixed"
              />
        </div>

        <div className="card-body">
       
          <h5  suppressHydrationWarning className="card-text text-justify"><strong>Nom du profil :</strong> {userData?.name}</h5>

          <p suppressHydrationWarning className="card-text text-justify"><strong>Username :</strong> {userData?.username}</p>
          <p suppressHydrationWarning className="card-text text-justify"><strong>Email :</strong> {userData?.email}</p>
          <p suppressHydrationWarning className="card-text text-justify"><strong>Age :</strong> {userData?.age}</p>
        
          <div className="row justify-content-between">
              <button type="button w-20" className=" col-3 btn btn-sm btn-outline-primary">Editer</button>
              <button type="button w-20" onClick={logout} className=" col-3 btn btn-sm btn-outline-danger">Déconnexion</button>
          </div>
        </div>
      </div>
    </div>
      <div className='row justify-content-center'>
        <div className="col-4 bg-title m-5 border border-dark rounded">
          <h4 className="text-center" > Vos livres disponibles</h4>
        </div>
     
        <div className='row text-center border border-light border-2 rounded bg-livre' >
        { userData?.activeBooks?.map(book=>
          <BookCard  key={book.params.id} book={book.params}/>
          )}
        </div> 

        <div className='row justify-content-center'>
          <div className="col-4 bg-title m-5 border border-dark rounded">
            <h4 className="text-center " > Vos livres rendus</h4>
          </div>
          <div className='row text-center  border border-light border-2 rounded  bg-livre'>
            { userData?.inactiveBooks?.map(book=>
              <BookCard  key={book.params.id} book={book.params}/>
              )}
          </div> 
        </div>
      </div>
  </Layout>);
}

