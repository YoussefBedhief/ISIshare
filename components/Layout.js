import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { HiMenu } from "react-icons/hi"
import SideBar from "./SideBar"
import Logo from "../assets/logo.png"

function Layout() {
  const [toggleSidebar, setToggleSidebar] = useState(false)

  return (
    <>
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar />
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
            <SideBar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>{" "}
    </>
  )
}

export default Layout
