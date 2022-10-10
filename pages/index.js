import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../_recoil/userState';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Home() {
  const [user,setUser] = useRecoilState(userState);
  const router = useRouter();
  useEffect(()=>{
    if (user){
      router.push('/dashboard')
    }else {
      router.push('/login')
    }
    },[])
  return (
    <div>
      <Head>
        <title>Aryan&apos;s Project</title>
        <meta name="description" content="Aryan's Hackathon project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="min-h-section bg-black bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg p-2">
        {/* Make a good landing page for my site */}
      </section>
    </div>
  )
}
