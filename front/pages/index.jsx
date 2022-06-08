import { useState } from 'react';


import { Link } from '../components';
import Head from 'next/head';
import Layout from '../components/layout';

export default Home;

function Home() {
    const [users, setUsers] = useState(null);



    return (
        <Layout>
            <div className='col-12 w-100 h-100'>
                <Head>
                    <title>Bibliotheque en ligne</title>
                </Head>
                <div className='row w-100'>
                    <h4 className="card-header text-center text-white">Bienvenue sur la librairie en ligne </h4>
                </div>
                <div className='row w-100 p-5 justify-content-between'>

                        <div className=' col-3 border-success bg-white text-center border border-succes rounded'>
                            <Link href={`/profile/me`} className=" nav-link text-success">
                                <h5 className="card-title">Mes livres</h5>
                                <p>Accedez facilement à vos livres empruntés </p>
                            </Link> 
                        </div>

                        <div className=' col-4 border-success bg-white text-center border border-succes rounded'>
                            <Link href={`/books/list`} className=" nav-link text-success">
                                <h5 className="card-title">Accéder au catalogue</h5>
                                <p> Découvrez une séléction de livres de différents genres </p>
                            </Link> 
                        </div>

                        <div className=' col-3 border-success bg-white text-center border border-succes rounded'>
                            <Link href={`/profile/me`} className=" nav-link text-success">
                                <h5 className="card-title">Votre profil</h5>
                                <p>  Visualisez vos anciens livres empruntés et laissez leur une note </p>
                            </Link> 
                        </div>
                       
                </div>
            </div> 
        </Layout>
    );
}
