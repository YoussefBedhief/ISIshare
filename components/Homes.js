import Head from "next/head"
import { useState, useEffect, useRef } from "react"
import Layout from "./Layout"
import Main from "./Main"
import { client } from "../utils/client"
import { userQuery } from "../utils/data"
import { fetchUser } from "../utils/fetchUser"

const Homes = () => {
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const userInfo = fetchUser()
    const query = userQuery(userInfo?.sub)
    client.fetch(query).then((data) => {
      setUser(data[0])
    })
  }, [])
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  })

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen w-full transition-height duration-75 ease-out mt-2">
      <Head>
        <title>ISI-Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll w-full"
        ref={scrollRef}
      >
        <Main user={user && user} />
      </div>
    </div>
  )
}

export default Homes
