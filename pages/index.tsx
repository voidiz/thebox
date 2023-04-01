import ImageSequence from "@/components/ImageSequence";
import IntroSection from "@/components/IntroSection";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { useRef } from "react";

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>the box</title>
        <meta name="description" content="just a box" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar introRef={introRef} specsRef={specsRef} />
      <Hero />
      <div ref={introRef}>
        <IntroSection />
      </div>
      <div ref={specsRef}>
        <ImageSequence
          className="h-[900vh] bg-slate-900"
          frames={120}
          format={"/assets/boxfalling/<id>.webp"}
        />
      </div>
    </>
  );
}
