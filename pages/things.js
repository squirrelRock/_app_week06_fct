import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getSortedList } from '../lib/thingList'; 

export async function getStaticProps() {
    
    const allCharacterData = await getSortedList();  
    return {
      props: { allCharacterData }
    };
}

export default function Things({ allCharacterData }) {
  return (
    <Layout>
      <h1 className="text-center">-    Shōgun Characters   -  </h1>
      <h3 className="text-center mt-2">(and their favored personal possessions)</h3>
      <hr/>
      <h4 className="text-center mt-5">Main Characters</h4>
     <div className='container spacing'>
      <div className="list-group mt-4">
        {allCharacterData && allCharacterData
          .filter(item => parseInt(item.id) % 2 !== 0) // main chars have odd ids
          .map(({ id, Character, Gender }) => {
          
          const genderClass = Gender === 1 ? 'male' : 'female';
          
        
          return (
            <Link key={id} href={`/things-id/${id}`} className={`list-group-item list-group-item-action ${genderClass}`}>
              {Character}
            </Link>
          );
        })}
      </div>
      </div>

      <h4 className="text-center mt-5">Supporting Characters</h4>
      <div className='container spacing'>
      <div className="list-group mt-4">
        {allCharacterData && allCharacterData
          .filter(item => parseInt(item.id) % 2 === 0) //supporting characters have even ids
          .map(({ id, Character, Gender }) => {
            const genderClass = Gender === 1 ? 'male' : 'female';
            return (
              <Link key={id} href={`/things-id/${id}`} className={`list-group-item list-group-item-action ${genderClass}`}>
                {Character}
              </Link>
            );
          })}
      </div>
      </div>
      
   
      <Link href="/" className="btn btn-secondary btn-sm small  ms-2 mt-3">
        Home
      </Link>
      <Link href="/clans" className="btn btn-secondary btn-sm small ms-2 mt-3">
        Clans
      </Link>
    </Layout>
  );
}