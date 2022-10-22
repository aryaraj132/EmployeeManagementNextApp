import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../_recoil/userState";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const [user, setUser] = useRecoilState(userState);
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
        <div className="flex flex-col lg:flex-row justify-around items-center mt-10 px-4">
          <div className="flex flex-col justify-center items-center md:items-start">
            <h1 className="text-4xl font-bold text-white p-2">
              Employees&apos; Management App
            </h1>
            <p className="text-xl text-white p-2">
              Manage employees and watch their work and progress
            </p>
          </div>
          <div className="flex flex-col justify-between items-center my-10 ">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold text-white p-2">
              Get Started Now !
            </h3>
            <div className="flex justify-center items-center my-2">
              {!user ? (
                <button
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
        </div>
        <hr className="border-transparent h-2 w-full bg-gradient-to-b from-transparent via-slate-500 to-transparent opacity-40" />

        {/* <div className="flex justify-start px-4 mt-10 ">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-white p-2">
              Features
            </h1>
          </div>
        </div> */}

        <div className="flex flex-wrap-reverse flex-row justify-around items-center my-4 p-4">
          <div className="flex justify-center items-center max-w-md md:max-w-half xl:max-w-lg">
            <Image
              src="/emp3.png"
              width={500}
              height={300}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start py-4 max-w-md md:max-w-half xl:max-w-lg">
            <h1 className="text-4xl font-bold text-white"><span className="text-cyan-100">Admin</span> <span className="text-teal-100">Dashboard</span></h1> <hr className="border-transparent h-2 w-full bg-gradient-to-b from-transparent via-slate-500 to-transparent opacity-40" />
            <p className="text-xl text-white">
              Manage employees&apos; data and access and see the work done by
              each of the employees
            </p>
          </div>
        </div>

        <div className="flex flex-wrap flex-row justify-around items-center my-4 p-4">
          <div className="flex flex-col justify-center items-center md:items-start py-4 max-w-md md:max-w-half xl:max-w-lg">
            <h1 className="text-4xl font-bold text-white"><span className="text-teal-100">Daily</span> <span className="text-cyan-100">Data</span></h1> <hr className="border-transparent h-2 w-full bg-gradient-to-b from-transparent via-slate-500 to-transparent opacity-40" />
            <p className="text-xl text-white">
              Pie charts to show the work done by an employee on daily basis.
              Choose a date and see work done on that day
            </p>
          </div>
          <div className="flex justify-center items-center max-w-md md:max-w-half xl:max-w-lg">
            <Image
              src="/emp1.png"
              width={450}
              height={500}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-wrap-reverse flex-row justify-around items-center my-4 p-4">
          <div className="flex justify-center items-center max-w-md md:max-w-half xl:max-w-lg">
            <Image
              src="/emp2.png"
              width={500}
              height={400}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start py-4 max-w-md md:max-w-half xl:max-w-lg">
            <h1 className="text-4xl font-bold text-white"><span className="text-cyan-100">Weekly</span> <span className="text-teal-100">Data</span></h1> <hr className="border-transparent h-2 w-full bg-gradient-to-b from-transparent via-slate-500 to-transparent opacity-40" />
            <p className="text-xl text-white">
              Bar Graphs to show all the work done by an employee in current
              month on weekly basis
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
