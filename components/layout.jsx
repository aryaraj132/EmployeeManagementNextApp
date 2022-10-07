import Nav from "./Nav";
import Head from 'next/head'
export default function Layout({ children }) {
  return (
    <>
    <Head>
        <title>Aryan's Project</title>
        <meta name="description" content="Aryan's Hackathon project" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="mx-14 relative h-main">{children}</main>
    </div>
    </>
  );
}