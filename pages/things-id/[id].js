import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllCharacterIds, getCharacterData } from '../../lib/thingList';


// - getStaticProps() function is defined by next.js to retrieve data to use for the dynamic page
export async function getStaticProps( { params } ) {
  const itemData = await getCharacterData(params.id);
  return {
    props: {
      itemData
    }
  };
}


// - getStaticPaths() function  is defined by next.js, tells next.js all valid URLs: 1,2,3 etc.
export async function getStaticPaths() {
  const paths = await getAllCharacterIds();
  return {
    paths,
    fallback: false
  };
}




export default function Card({ itemData }) {
  

  return (
    <Layout>
      <article className="card characters col-9 mx-auto ">
        <div className={`card-body ${itemData.Gender === 1 ? 'male' : 'female'}`}>
          <h5 className="card-title character-title">Character: <span className="white">{'\u00A0\u00A0'}{itemData.Character}</span></h5>
          <h6 className="card-text small px-2 pt-2 red"><strong>Role:</strong> <span className="white">{'\u00A0\u00A0'}{itemData.Role}</span></h6>
          <h6 className="card-text small px-2 red"><strong>Personality:</strong> <span className="white">{'\u00A0\u00A0'}{itemData.Personality}</span></h6>
          
         
            <h6 className="card-text mt-2 small px-2 red"><strong>Description:</strong> <span className="white">{'\u00A0\u00A0'}{itemData.About}
            </span></h6> 
            <h6 className="card-text mt-2 small px-2 pt-3 red"><strong>Favorite Personal Objects</strong></h6>
          <ol>
            {itemData.things && itemData.things.map(
                ({id, thing}) => (
                  <li key={id}>
                    {thing}
                  </li>
                )
              )
            }
          </ol>
          
          <hr/>
          <h6 className="card-subtitle mb-2 text-body-secondary d-flex justify-content-between align-items-center">
  <span className='red underline-link'>
    Actor: {'\u00A0'}
    <a href={itemData.IMDb} target="_blank" rel="noopener noreferrer" className="card-link">
      {itemData.Actor}
    </a>
  </span>
  <a href={itemData.IMDb} target="_blank" rel="noopener noreferrer" className="mark">
    <u>IMDb</u>
  </a>
</h6>


        </div>
      </article>
     
    </Layout>
  );
}



