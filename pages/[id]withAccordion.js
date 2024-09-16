
import Accordion from '../components/Accordion';
import Layout from '../components/Layout';
import { getAllIds, getData } from '../lib/datalist';

// Define a getStaticProps() function to retrieve data for the dynamic page
export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
  return {
    props: {
      itemData
    }
  };
}

// Define a getStaticPaths() function to tell Next.js all valid URLs
export async function getStaticPaths() {
  const paths = getAllIds();
  return {
    paths,
    fallback: false
  };
}

export default function Entry({ itemData }) {
  
  return (
    <Layout>
      <article className="col-6">
        <Accordion itemData={itemData} /> 
      </article>
    </Layout>
  );
}
