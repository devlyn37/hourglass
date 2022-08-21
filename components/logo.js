import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <div className={styles.logo} />
    </Link>
  );
}
