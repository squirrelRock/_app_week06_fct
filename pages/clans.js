// pages/clans.js
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import FamilyGroupCard from '../components/FamilyGroupCard'; 
import { combinedData, groupByFamily } from '../lib/datalist';

export async function getStaticProps() {
  const dataCombined = await combinedData();
  const familyGroups = await groupByFamily(dataCombined);
  
  console.log("Final Family Groups:", JSON.stringify(familyGroups, null, 2));
  
  return {
    props: { familyGroups }
  };
}

export default function Clans({ familyGroups }) {
  console.log("Family Groups Passed to Clans Component:", familyGroups)
  return (
    <Layout>
      <h1>Family Connections</h1>
      <h4>(Blood Clan and Bonded Relationships)</h4>
      <p>
        In Japan in the 1600&apos;s, a man of power could have many wives and consorts. A son born of a consort could still be heir to his father&apos;s title.
      </p>

     
      <div className="row">
        {Object.keys(familyGroups).map(groupId => {
          const group = familyGroups[groupId];
          const { headOfClan, members } = group;

          return (
            <div key={groupId} className="col-md-6">
              <FamilyGroupCard
                groupId={groupId}
                headOfClan={headOfClan}
                members={members}
              />
            </div>
          );
        })}
      </div>

     
      <Link href="/main" className="btn btn-secondary btn-sm small mt-3">
        Main Characters
      </Link>
      <Link href="/secondary" className="btn btn-secondary btn-sm small  ms-2 mt-3">
        Supporting Characters
      </Link>
      <Link href="/things" className="btn btn-secondary btn-sm small ms-2 mt-3">
        All Character List
      </Link>
    </Layout>
  );
}
