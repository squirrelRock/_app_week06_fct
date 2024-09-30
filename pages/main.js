// pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListMain } from '../lib/datalist';

// GET STATIC PROPS
export async function getStaticProps() {
    const allDataMain = await getListMain(); // Data from shogunMain.json
    return {
      props: { allDataMain }
    };
}

// HOME COMPONENT
export default function Main({ allDataMain }) {
  return (
    <Layout>
    
      <h1 className="text-center">Shōgun Characters and Cast</h1>
      <hr/>
      <h2>Main Characters</h2>
      <div className="list-group">
        {allDataMain && allDataMain.map(({ id, Character, gender }) => {
          const genderClass = gender === 1 ? 'male' : 'female';
          return (
            <Link key={id} href={`/things-id/${id}`} className={`list-group-item list-group-item-action ${genderClass}`}>
            {Character}
          </Link>
          );
        })}
      </div>

      {/* Secondary Characters */}
      <h4 className="mt-3">More . . .</h4>
      <Link href="/secondary" className="btn btn-secondary btn-sm small">
        Supporting Characters
      </Link>
      <Link href="/clans" className="btn btn-secondary btn-sm small ms-2">
        Clans
      </Link>
      <Link href="/things" className="btn btn-secondary btn-sm small ms-2 ">
        All Characters
      </Link>
    </Layout>
  );
}
