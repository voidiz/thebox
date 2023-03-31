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
      <h1 className="text-indigo-500 text-3xl p-24">Hello</h1>
    </>
  );
}
