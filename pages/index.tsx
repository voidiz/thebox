import ImageSequence from "@/components/ImageSequence";
import IntroSection from "@/components/IntroSection";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { useContext, useRef } from "react";
import { PreloadedAssetsContext } from "@/contexts/PreloadedAssets";
import Spinner from "@/components/Spinner";
import Footer from "@/components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { loaded } = useContext(PreloadedAssetsContext);

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>the box</title>
        <meta name="description" content="just a box" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Navbar heroRef={heroRef} introRef={introRef} specsRef={specsRef} footerRef={footerRef} />
        <div ref={heroRef} >
          <Hero />
        </div>
        <div ref={introRef}>
          <IntroSection />
        </div>
        <div ref={specsRef}>
          <ImageSequence
            className="h-[900vh]"
            assetKey="/assets/anim2/<id>.webp"
          />
        </div>
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    </>
  );
}
