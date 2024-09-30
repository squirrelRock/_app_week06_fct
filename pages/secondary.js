// pages/secondary.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getListSecond } from '../lib/datalist';

export async function getStaticProps() {
   
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
            <Link key={id} href={`/things-id/${id}`} className={`list-group-item list-group-item-action ${genderClass}`}>
            {Character}
          </Link>
          );
        })}
      </div>
      
      
      <Link href="/main" className="btn btn-secondary btn-sm small mt-3">
        Main Characters
      </Link>
      <Link href="/clans" className="btn btn-secondary btn-sm small ms-2 mt-3">
        Clans
      </Link>
      <Link href="/things" className="btn btn-secondary btn-sm small ms-2 mt-3">
        All Characters
      </Link>
    </Layout>
  );
}
