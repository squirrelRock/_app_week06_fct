import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children}) {

  const router = useRouter();

  const isHomePage = router.pathname === '/';

  return (
    <>
      <Head>
        <title>Shōgun - Main Characters</title>
      </Head>
      <header>
        <nav className="navbar navbar-light p-3" style={{ backgroundColor: '#e3f2fd' }}>

        <h1><em>Shōgun</em></h1>

          <ul className='navbar-nav'>
          {isHomePage ? (
            <Link href="/secondary" className="btn btn-secondary btn-sm">
              Next Page →
            </Link>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => router.back()}>
              ← Go Back
            </button>
          )}
          </ul>
        </nav>

      </header>

      <main>
      <div className = "container flex p-2 pt-4">
      {children}
      </div>
        
      </main>

      <footer>
        <div className='container p-2 small '>
          <p>Shōgun is a 10-part telvision series produced by FX on Hulu, released 2024.</p>
        </div>
      </footer>
    </>
  );
}

