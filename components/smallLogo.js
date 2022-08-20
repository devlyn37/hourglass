import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function SmallLogo() {
    return (
        <Image src="/hgs-logo.svg" className={styles.logo} width={500} height={200}/>
    );
}