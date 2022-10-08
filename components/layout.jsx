import Nav from "./Nav";
import Head from 'next/head'
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="mx-14 relative h-main">{children}</main>
    </div>
  );
}