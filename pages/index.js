// pages/index.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
// import { getListMain } from '../lib/datalist';

// GET STATIC PROPS
// export async function getStaticProps() {
//     const allDataMain = getListMain(); // Data from shogunMain.json
//     return {
//       props: { allDataMain }
//     };
// }

// HOME COMPONENT
export default function Home({ allDataMain }) {
  return (
    <Layout>
 
      <h4 className="mt-3 text-center">Shōgun Characters</h4>
<div className="d-flex flex-column align-items-center mb-5">

  <Link href="/things" className="btn btn-secondary btn-sm small mt-2 text-center">
  Character Lists
  </Link>
  <Link href="/clans" className="btn btn-secondary btn-sm small mt-2 text-center">
    Clans and Bonded Relationships
  </Link>
 
</div>
<hr/>
<h6 className='mt-4'><strong>Sept 16, 2024</strong></h6>
       <div className='border p-3 mt-1'>
      <div className="box p-2 m-4">
       
      <p className="display-6 p-5"> <strong className="display-4">Shōgun</strong> - &#8220;An adaptation from a 1975 best-selling book centered on 17th century feudal Japan on the brink of civil war, set a record on September 15, 2024 for <strong>most Emmys won by a show in a single year, winning 18 in all</strong>...&#8220; <strong>- The New York Times</strong></p>
      </div>
      </div>

    </Layout>
  );
}
