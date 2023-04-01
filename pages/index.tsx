import ImageSequence from "@/components/ImageSequence";
import IntroSection from "@/components/IntroSection";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>the box</title>
        <meta name="description" content="just a box" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ImageSequence
        className="h-[600vh] bg-slate-950 bg-[url('/assets/effect.webp')] bg-no-repeat bg-right-top"
        frames={57}
        format={"/assets/box/<id>.webp"}
      />
      <IntroSection />
      <ImageSequence
        className="h-[900vh] bg-slate-900"
        frames={120}
        format={"/assets/boxfalling/<id>.webp"}
      />
    </>
  );
}
