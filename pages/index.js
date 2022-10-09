import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../_recoil/userState';
export default function Home() {
  const [user,setUser] = useRecoilState(userState);
  
  return (
    <div>
      <Head>
        <title>Aryan&apos;s Project</title>
        <meta name="description" content="Aryan's Hackathon project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="min-h-full bg-black bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg p-2"></section>
    </div>
  )
}
