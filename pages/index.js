import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Logo from '../components/logo.js';
import BgShape from '../components/bgshape.js';

export default function Home() {
  const [testData, setTestData] = useState([]);

  // useEffect(() => {
  //   const test = async () => {
  //     const result = await axios.get("api/hello");
  //     setTestData(JSON.stringify(result.data.testData));
  //   };

  //   test();
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hourglass</title>
        <meta name='description' content='Hourglass landing page' />
      </Head>
      <BgShape />
      <Logo />
      <div className={styles.navigator}>
        <Link href='/employer/login'>
          <button className={styles.button}>EMPLOYER</button>
        </Link>
        <Link href='/employee/login'>
          <button className={styles.button}>EMPLOYEE</button>
        </Link>
      </div>
    </div>
  );
}
