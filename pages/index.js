import Head from "next/head";
// IMPORT COMPONENT
import Navbar from "../component/layout/navbar/navbar";

const Home = () => {
  return (
    <>
      <Head>
        <title>Plinth</title>
      </Head>

      <Navbar />
      Homepage
    </>
  );
};

export default Home;