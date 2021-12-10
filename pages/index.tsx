import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import Link from "next/link";
import { Pagination } from "@mui/material";

import Header from "./components/Header";
import Algolia from "../lib/algoliaService";
import Contentful from "../lib/contentfulService";
import NewsItem from "./components/NewsItem";

import styles from "../styles/Home.module.css";


export interface INewsConfig {
  menuLabel: string;
  searchLabel: string;
  ttile: string;
  logo: any;
}

export interface INews {
  description: string;
  slug: string;
  imageUrl: string;
  name: string;
  organization: any;
  publicationDate: string;
  subtype: string;
  topics: any;
}

// main page
const Home = ({ newsConfig, news: newsData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [news, setNews] = useState(newsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const newsIndex = Algolia.initIndex('news');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header
          logo={newsConfig.logo.fields.file.url}
          label={newsConfig.menuLabel}
        />
        <div className={styles.contentContainer}>
          <h1 className={styles.newsTitle}>{newsConfig.ttile}</h1>
          <div className={styles.newsContainer}>
            <div className={styles.newsLeft}>
              <span className={styles.searchLabel}>{newsConfig.searchLabel}</span>
              <div className={styles.searchInput}>
                <input
                  className={styles.orgInput}
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className={styles.searchButton}
                  onClick={async () => {
                    try {
                      setPage(0);
                      const res = await newsIndex.search(searchTerm, {
                        page: 0,
                      });
                      setNews(res);
                    } catch (error) {
                      console.error(error); 
                    }
                  }}
                >
                  <AiOutlineSearch color={'white'} width={12} height={12} />
                </button>
              </div>
            </div>
            <div className={styles.newsRight}>
              {news.hits.map((data: INews) => {
                return (
                  <Link
                    key={data.name}
                    href={`/news/${encodeURIComponent(data.slug)}`}
                    passHref={true}
                  >
                    <a>
                      <NewsItem
                        publicationDate={data.publicationDate}
                        description={data.description}
                        name={data.name}
                        organization={data.organization}
                        topics={data.topics}
                        imageURL={data.imageUrl}
                      />
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={styles.paginationContainer}>
            <Pagination
              count={news.nbPages}
              onChange={async (_, page: number) => {
                setPage(page - 1);
                const news = await newsIndex.search(searchTerm, {
                  page: page - 1,
                });
                setNews(news);
              }}
              variant="outlined"
              color="primary"
              shape="rounded"
              page={page + 1}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{ newsConfig: INewsConfig, news: any }> = async () => {
  const newsConfig = await Contentful.getEntries<INewsConfig>({ content_type: 'newsConfig' });
  const newsIndex = Algolia.initIndex('news');
  const news = await newsIndex.search('', {
    page: 0,
  });

  return {
    props: {
      newsConfig: newsConfig.items[0].fields,
      news,
    },
  };
};

export default Home;
