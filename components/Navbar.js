import Image from "next/image"
import Link from "next/link"
import { googleLogout } from "@react-oauth/google"
import { useRouter } from "next/router"
import { HiSearch } from "react-icons/hi"
import { IoMdAdd } from "react-icons/io"
import { AiOutlineLogout } from "react-icons/ai"
import { useState } from "react"

function Navbar({ user }) {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()
  const handleSearch = (e) => {
    e.preventDefault()

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }
  const removeUser = () => {
    localStorage.clear()
  }

  if (!user) return null

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 items-center justify-between">
      <div className="flex justify-start items-center flex-grow px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex w-full justify-between items-center bg-slate-200 rounded-xl"
        >
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search "
            value={searchValue}
            className="p-2 w-full outline-none bg-slate-200 rounded-xl placeholder:text-gray-900 placeholder:font-semibold"
          />
          <button onClick={handleSearch} className="pr-2">
            <HiSearch fontSize={21} className="ml-1 text-gray-900" />
          </button>
        </form>
      </div>
      <div className="flex gap-3 items-center">
        <Link href={`/user-profile/${user._id}`}>
          <Image
            src={user.image || user.picture}
            alt="user"
            height={40}
            width={40}
            className="rounded-full cu"
          />
        </Link>
        <Link href="/upload">
          <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
            <IoMdAdd className="text-xl" />{" "}
            <span className="hidden md:block">Upload </span>
          </button>
        </Link>
        <Link href="/login">
          <button
            type="button"
            className=" border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
            onClick={() => {
              googleLogout()
              removeUser()
            }}
          >
            <AiOutlineLogout color="red" fontSize={21} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
