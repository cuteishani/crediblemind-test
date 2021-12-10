import React, { ReactElement } from 'react';
import Image from 'next/image';

import styles from '../../styles/Header.module.css';

interface Props {
  label: string;
  logo: string;
}

// component for news header
function Header({ logo, label }: Props): ReactElement {
  return (
    <div className={styles.main}>
      <Image
        src={`https:${logo}`}
        alt="news - logo"
        height={50}
        width={160}
      />
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default Header;
