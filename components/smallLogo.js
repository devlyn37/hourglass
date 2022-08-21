import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function SmallLogo() {
  return (
    <Link href='/'>
      <div className={styles.slogo} />
    </Link>
  );
}
