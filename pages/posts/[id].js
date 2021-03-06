// Packages
import Head from 'next/head';

// Components
import Layout from '../../components/Layout';
import Date from '../../components/Date';

// Lib
import { getAllPostsIds, getPostData } from '../../lib/getPosts';

// Styles
import utilStyles from '../../styles/utils.module.css';

const Post = (props) => {
    const { postData } = props;
    const { id, title, date, contentHtml } = postData;
    return (
        <Layout>
          <Head>
             <title>{title}</title>
          </Head>
          <article>
          <h1 className={utilStyles.headingXl}>{title}</h1>
          <div className={utilStyles.lightText}>
           <Date dateString={date} />
          </div>
           <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>
        </Layout>
    );
}

export async function getStaticPaths() {
  const paths = getAllPostsIds();
  return {
      paths,
      fallback: false
  }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
}

export default Post;
