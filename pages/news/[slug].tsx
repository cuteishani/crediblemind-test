import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { ReactElement } from 'react';

import NewsItem from '../components/NewsItem';
import Algolia from '../../lib/algoliaService';

import styles from '../../styles/Home.module.css';

interface Props {
  news: any; 
}
// individual news page
function News({ news }: Props): ReactElement {

  console.log(news);

  return (
    <div className={styles.container}>
      <Head>
        <title>Credible Mind</title>
        <meta name="description" content="Credible Mind news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NewsItem
          topics={news.topics}
          name={news.name}
          description={news.description}
          imageURL={news.imageUrl}
          organization={news.organization}
          publicationDate={news.publicationDate}
        />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{news: any }> = async (context) => {
  const newsIndex = Algolia.initIndex('news');

  const news = await newsIndex.search(context.query.slug as string);

  if (news.nbHits >= 1) {
    return {
      props: {
        news: news.hits[0],
      },
    };
  }

  return {
    notFound: true,
  };
};

export default News;
