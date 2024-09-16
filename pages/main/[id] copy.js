// pages/main/[id].js
import Layout from '../../components/Layout';
import { getAllIdsMain, getDataMain } from '../../lib/datalist';

export async function getStaticProps({ params }) {
  const itemData = await getDataMain(params.id);
  return {
    props: {
      itemData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllIdsMain();
  return {
    paths,
    fallback: false,
  };
}

export default function Entry({ itemData }) {
  return (
    <Layout>
      <article className="col-6">
        <div>
          <h5 className="card-title">Character: {itemData.Character}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">Actor: {itemData.Actor}</h6>
          <p className="card-text">{itemData.About}</p>
        </div>
      </article>
    </Layout>
  );
}
