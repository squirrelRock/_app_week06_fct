import { useState } from 'react';

import Layout from '../../components/Layout';
import { getAllIdsSecond, getDataSecond } from '../../lib/datalist';

// define a getStaticProps() function to have next.js retrieve data to use for the dynamic page
// - this name is defined by next.js
export async function getStaticProps( { params } ) {
  const itemData = await getDataSecond(params.id);
  return {
    props: {
      itemData
    }
  };
}

// define a getStaticPaths() function to tell next.js all valid URLs: 1,2,3,4 
// - this name is defined by next.js
export async function getStaticPaths() {
  const paths = getAllIdsSecond();
  return {
    paths,
    fallback: false
  };
}




export default function Card({ itemData }) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <Layout>
      <article className="card col-9">
        <div className={`card-body ${itemData.Gender === 1 ? 'male' : 'female'}`}>
          <h5 className="card-title">Character: {itemData.Character}</h5>
          <p className="card-text small">Role: {itemData.Role}</p>
          <p className="card-text small">Personality: {itemData.Personality}</p>
          
          <button
            className="btn btn-secondary btn-sm  mt-1 w-100" 
            onClick={() => setShowAbout(!showAbout)}
          >
            {showAbout ? 'Close' : 'Description'}
          </button>
          {showAbout && (
            <p className="card-text mt-2 small"><strong>Description:</strong> {itemData.About}</p> 
          )}
          <hr/>
          <h6 className="card-subtitle mb-2 text-body-secondary d-flex justify-content-between align-items-center">
  <span>
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