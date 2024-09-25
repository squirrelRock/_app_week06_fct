import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getSortedList } from '../lib/thingList'; 

export async function getStaticProps() {
    
    const allCharData = getSortedList();  
    return {
      props: { allCharData }
    };
}

export default function Things({ allCharData }) {
  return (
    <Layout>
      <h1>Shōgun Characters - All </h1>
      <h4>Favored Personal Possessions</h4>
      <div className="list-group">
        {allCharData && allCharData.map(({ id, Character, Gender }) => {
          console.log(Gender); // is gender value correct?
          const genderClass = Gender === 1 ? 'male' : 'female';
          return (
            <Link key={id} href={`/things-id/${id}`} className={`list-group-item list-group-item-action ${genderClass}`}>
              {Character}
            </Link>
          );
        })}
      </div>
      
      <Link href="/" className="btn btn-secondary btn-sm small mt-3">
        Back to Main Characters
      </Link>
      <Link href="/secondary" className="btn btn-secondary btn-sm small  ms-2 mt-3">
        View Supporting Characters
      </Link>
      <Link href="/clans" className="btn btn-secondary btn-sm small ms-2 mt-3">
        View Clans
      </Link>
    </Layout>
  );
}