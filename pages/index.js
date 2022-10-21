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
  // useEffect(()=>{
  //   if (user){
  //     router.push('/dashboard')
  //   }else {
  //     router.push('/login')
  //   }
  //   },[])
  return (
    <div>
      <Head>
        <title>Aryan&apos;s Project</title>
        <meta name="description" content="Aryan's Hackathon project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="min-h-section bg-black bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg p-2">
        {/* Some text on left and emp1.png on right like landing page */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col justify-center items-center md:items-start">
            <h1 className="text-4xl font-bold text-white p-2">Employees&apos; Management App</h1>
            <p className="text-xl text-white p-2">Graphical Representation of Employees&apos; Work Data | Manage Employees&apos; | Admin dashboard | Activate or Deactivate Users </p>
          </div>
          </div>

        <div className="flex flex-wrap-reverse flex-row justify-around items-center my-4 p-4">
          <div className="flex justify-center items-center ">
            <Image src="/emp2.png" width={500} height={400} />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start py-4">
            <h1 className="text-4xl font-bold text-white">Aryan&apos;s Project</h1>
            <p className="text-xl text-white">Aryan&apos;s Hackathon project</p>
          </div>
        </div>


        <div className="flex flex-wrap flex-row justify-around items-center my-4 p-4">
          <div className="flex flex-col justify-center items-center md:items-start py-4">
            <h1 className="text-4xl font-bold text-white">Aryan&apos;s Project</h1>
            <p className="text-xl text-white">Aryan&apos;s Hackathon project</p>
          </div>
          <div className="flex justify-center items-center">
            <Image src="/emp1.png" width={500} height={600} />
          </div>
        </div>

        



      </section>
    </div>
  )
}
