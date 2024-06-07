import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <NavBar/>
      <Component {...pageProps} />
      <Footer/>
    </SessionProvider>
  );
}
