import React, { ReactElement } from "react";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';


import styles from "../../styles/NewsItem.module.css";

interface Props {
  topics: any[];
  name: string;
  description: string;
  publicationDate: string;
  organization: any[];
  imageURL: string;
}

dayjs.extend(customParseFormat);

// single news item
function NewsItem({
  topics,
  name,
  description,
  publicationDate,
  organization,
  imageURL,
}: Props): ReactElement {
  return (
    <div className={styles.main}>
      <div className={styles.imgWrapper}>
        <img
          src={imageURL}
          className={styles.image}
          alt={name}
        />
      </div>
      <div className={styles.description}>
        <div className={styles.topicWrapper}>
          {topics.map((topic) => {
            return (
              <span
                className={styles.topic}
                key={topic.id}
              >
                  {topic.title}
              </span>
            );
          })}
        </div>
        <div className={styles.name}>{name}</div>
        <p className={styles.newsDesc}>{description}</p>
        <div className={styles.subComp}>
          <span className={styles.newsDate}>{dayjs(publicationDate).format('MMM DD, YYYY').toString()}</span>
          <div>
            {organization.map((org) => {
              return (
                <span
                  key={org.fields.name}
                  className={styles.newsOrg}
                >
                  {org.fields.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
