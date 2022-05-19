import Head from "next/head";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const wave = () => {};

  return (
    <div>
      <Head>
        <title>Wave Portal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mainContainer">
        <div className="dataContainer">
          <div className="header">👋 Hey there!</div>

          <div className="bio">
            I am Anonymous and I am learning Web 3 and Blockchain so that's
            pretty cool right?
            <br />
            Connect your Ethereum wallet and wave at me!
          </div>

          <button className="waveButton" onClick={wave}>
            〰️ Wave 〰️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
