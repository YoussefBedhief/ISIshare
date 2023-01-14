import Head from "next/head"
import Homes from "../components/Homes"

const Home = () => {
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <Head>
        <title>NextPix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Homes />
    </div>
  )
}

export default Home
