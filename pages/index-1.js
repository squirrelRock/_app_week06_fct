// pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getSortedList } from '../lib/datalist';
import { Paragraphs, Counter, NameInput, ChooseList } from '../components/PracticeComponents'; 



// GET STATIC PROPS
export async function getStaticProps() {
    const allData = getSortedList();
    return {
      props: { allData }
    };
}

// HOME COMPONENT
export default function Home({ allData }) { 
  console.log(allData);
  return (
    <div>
      <h1>Characters and Cast from Shogun</h1>
      {/* <ChooseList /> */}
    
      <Layout home>
        <h1>Main Characters</h1>
        <div className="list-group">
          {allData.map(({ id, Character, gender }) => {
            
            const genderClass = gender === 1 ? 'male' : 'female';
            
            return (
              <Link key={id} href={`/${id}`} className={`list-group-item list-group-item-action ${genderClass}`}>
                {Character}
              </Link>
            );
          })}
        </div>
      </Layout>
    </div>
  );
}

