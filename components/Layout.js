import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';


  export default function Layout({ children }) {
    const router = useRouter();
    const { pathname } = router;
  
    //  which page?
    const isHome = pathname === '/';
    const isMain = pathname === '/main';
    const isSecondary = pathname === '/secondary';
    const isClan = pathname === '/clans';
    const isFavored = pathname === '/things';

  return (
    <>
      <Head>
        <title>Shōgun</title>
      </Head>
      <header>
        <nav className="navbar navbar-light p-3" style={{ backgroundColor: 'black' }}>
          <h1 style={{ color: 'whitesmoke' }}><em>Shōgun</em></h1>
          <ul className='navbar-nav'>
            <span>
            <Link href="/" className={`btn btn-sm small ${isHome ? 'btn-warning active' : 'btn-secondary'} mx-1`}>
                Home
              </Link>
             
            <Link href="/clans" className={`btn btn-sm small ${isClan ? 'btn-warning active' : 'btn-secondary'} mx-1`}>
                Clans
              </Link>
              <Link href="/things" className={`btn btn-sm small ${isFavored ? 'btn-warning active' : 'btn-secondary'} mx-1`}>
        All Characters
      </Link>

         
            </span>
          </ul>
        </nav>
      </header>

      <main>
      <div className = "container flex p-2 pt-4">
      {children}
      </div>
        
      </main>

      <footer>
        <div className='container p-4 mt-4 text-center '>
          <p>Shōgun is a 10-part television series produced by FX on Hulu, released 2024.</p>
        </div>
      </footer>
    </>
  );
}

