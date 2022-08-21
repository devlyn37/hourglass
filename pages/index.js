import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Logo from '../components/logo.js';
import BgShape from '../components/bgshape.js';

export default function Home() {
  // Test Mongo connection with api/hello call
  var promise = axios.get("api/hello");
  var data = "";
  promise.then(r => {
    data = r.data;
    console.log("Successful mongo connection");
    // console.log("Data is: " + data);
    // console.log("First entry name " + data[0].name);
  }).catch(e => console.error(e));  

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
