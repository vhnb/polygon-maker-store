import Image from "next/image";
import Head from 'next/head'
import imgMain from '../../public/assets/imgMain.png'
import styles from "@/styles/Home.module.css";
import { CiCircleCheck } from "react-icons/ci";

export default function Home() {
  function toStart(){
    window.location.href = ''
  }

  return (
    <main className={styles.container}>
      <Head>
        <title>Sell with polygon</title>
      </Head>
      <div className={styles.contentMain}>
        <div className={styles.contentTextMain}>
          <h1>With <span>Polygon</span>, make your sales simpler and easier</h1>
          <ul>
            <li><CiCircleCheck className={styles.iconListMain}/> Easy to use</li>
            <li><CiCircleCheck className={styles.iconListMain}/> Quick to sell</li>
            <li><CiCircleCheck className={styles.iconListMain}/> Focused on the simple</li>
          </ul>
          <button onClick={toStart}>Start now</button>
        </div>
        <div className={styles.contentImgMain}>
          <Image className={styles.imgMain} src={imgMain} alt="imgIllustration" />
        </div>
      </div>
    </main>
  );
}
