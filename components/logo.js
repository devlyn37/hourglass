import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function Logo() {
    return (
        <Image src="/hourglass-logo.svg" className={styles.logo} width={500} height={200}/>
    );
}