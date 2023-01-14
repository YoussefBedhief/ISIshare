import Head from "next/head"
import { useState, useEffect, useRef } from "react"
import SideBar from "./SideBar"
import Main from "./Main"
import { client } from "../utils/client"
import { userQuery } from "../utils/data"
import Logo from "../assets/logo.png"
import { HiMenu } from "react-icons/hi"
import { AiFillCloseCircle } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import { fetchUser } from "../utils/fetchUser"

const Homes = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
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
  const link = `user-profile/${user?._id}`
  const userImage = user?.image

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen w-full transition-height duration-75 ease-out mt-2">
      <Head>
        <title>NextPix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="flex flex-row w-full justify-between items-center p-2 shadow-md">
          <HiMenu
            className="cursor-pointer"
            fontSize={40}
            onClick={() => {
              setToggleSidebar(true)
            }}
          />
          <Link href="/">
            <Image src={Logo} alt="Logo" height={50} width={150} />
          </Link>
          <Link href={link}>
            {userImage ? (
              <Image
                src={userImage}
                alt="User Image"
                height={35}
                width={35}
                className="rounded-full"
              />
            ) : (
              <FaUserCircle fontSize={40} />
            )}
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <SideBar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
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
