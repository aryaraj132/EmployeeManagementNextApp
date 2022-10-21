import Nav from "./Nav";
import Head from 'next/head'
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="md:px-14 sm:px-4 sm:py-1 bg-gradient-to-br from-teal-500 to-cyan-500 relative min-h-main">{children}</main>
    </div>
  );
}