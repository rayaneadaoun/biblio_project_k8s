import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";



import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import '../styles/globals.css';
import { userService } from '../services';
import { Nav } from '../components';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url) {
      // redirect to login page if accessing a private page and not logged in 
      const publicPaths = ['/login' , '/register' , '/404'];
      const path = url.split('?')[0];
      if (!userService.userValue && !publicPaths.includes(path)) {
          setAuthorized(false);
          router.push({
              pathname: '/login',
              query: { returnUrl: router.asPath }
          });
      } else {
          setAuthorized(true);
      }
  }
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className=" bg-light bg-image justify-content-center align-items-center">
          <Nav/>
          <div className="row p-4 h-100 w-100">
                <Component {...pageProps} />
          </div>
       
    </div>
    </>
   )
}
