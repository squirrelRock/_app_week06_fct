// pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListMain } from '../lib/datalist';

// GET STATIC PROPS
export async function getStaticProps() {
    const allDataMain = getListMain(); // Data from shogunMain.json
    return {
      props: { allDataMain }
    };
}

// HOME COMPONENT
export default function Home({ allDataMain }) {
  return (
    <Layout>
       <strong>Breaking News - Sept 16, 2024</strong>
      <div className="box p-2 m-4">
       
      <p > <strong className="large">Shōgun</strong> - &#8220;An adaptation from a 1975 best-selling book centered on 17th century feudal Japan on the brink of civil war, set a record on September 15, 2024 for <strong>most Emmys won by a show in a single year, winning 18 in all.</strong> It was also the first time a foreign language show (roughly 70 percent of the show was in Japanese) had taken the best drama award that is normally the domain of shows that take place in the United States, the United Kingdom or Westeros.&#8220; <strong>- The New York Times</strong></p>
      </div>
      <hr/>
      <h1 className="text-center">Shōgun Characters and Cast</h1>
      <hr/>
      <h2>Main Characters</h2>
      <div className="list-group">
        {allDataMain && allDataMain.map(({ id, Character, gender }) => {
          const genderClass = gender === 1 ? 'male' : 'female';
          return (
            <Link key={id} href={`/main/${id}`} className={`list-group-item list-group-item-action ${genderClass}`}>
              {Character}
            </Link>
          );
        })}
      </div>

      {/* Secondary Characters */}
      <h4 className="mt-3">More . . .</h4>
      <Link href="/secondary" className="btn btn-secondary btn-sm small">
        View Supporting Characters
      </Link>
      <Link href="/clans" className="btn btn-secondary btn-sm small ms-2">
        View Clans
      </Link>
      <Link href="/things" className="btn btn-secondary btn-sm small ms-2 ">
        View Favorite Things
      </Link>
    </Layout>
  );
}
