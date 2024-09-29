// pages/secondary.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListSecond } from '../lib/datalist';

export async function getStaticProps() {
    // Data from shogun2nd.json
    const allDataSecond = await getListSecond(); 
    return {
      props: { allDataSecond }
    };
}

export default function Secondary({ allDataSecond }) {
  return (
    <Layout>
      <h1>Supporting Characters from Shōgun</h1>
      <div className="list-group">
        {allDataSecond && allDataSecond.map(({ id, Character, gender }) => {
          const genderClass = gender === 1 ? 'male' : 'female';
          return (
            <Link key={id} href={`/secondary/${id}`} className={`list-group-item list-group-item-action ${genderClass}`}>
              {Character}
            </Link>
          );
        })}
      </div>
      
      
      <Link href="/" className="btn btn-secondary btn-sm small mt-3">
        Back to Main Characters
      </Link>
      <Link href="/clans" className="btn btn-secondary btn-sm small ms-2 mt-3">
        View Clans
      </Link>
      <Link href="/things" className="btn btn-secondary btn-sm small ms-2 mt-3">
        View Favorite Things
      </Link>
    </Layout>
  );
}
