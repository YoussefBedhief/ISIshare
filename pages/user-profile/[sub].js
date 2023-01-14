import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import MasonryLayout from "../../components/MasonryLayout"
import { client } from "../../utils/client"
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../../utils/data"
import Layout from "../../components/Layout"
import Navbar from "../../components/Navbar"

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none"

function Profile() {
  const [user, setUser] = useState(null)
  const [picture, setPicture] = useState(null)
  const [text, setText] = useState("Created")
  const [searchValue, setSearchValue] = useState("")
  const [activeBtn, setActiveBtn] = useState("created")
  const router = useRouter()
  const userId = router.query.sub

  const unsplashimg = {
    src: "https://source.unsplash.com/random/1600x900/?nature,photography,technology",
    alt: "random unsplash image",
  }
  useEffect(() => {
    const query = userQuery(userId)
    client.fetch(query).then((data) => setUser(data[0]))
  }, [userId])

  useEffect(() => {
    if (text === "Created") {
      const createdPictureQuery = userCreatedPinsQuery(userId)
      console.log(createdPictureQuery)
      client.fetch(createdPictureQuery).then((data) => {
        setPicture(data)
      })
    } else {
      const savededPictureQuery = userSavedPinsQuery(userId)
      client.fetch(savededPictureQuery).then((data) => setPicture(data))
    }
  }, [text, userId])

  if (!user) {
    return <Spinner message="Loading profile..." />
  }
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen w-full transition-height duration-75 ease-out mt-2">
      <Layout />
      <div className=" px-2 flex-1 h-screen w-full">
        <div className="bg-gray-50">
          <Navbar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            user={user}
          />
        </div>
        <div className="relative pb-2 h-full justify-center items-center">
          <div className="flex flex-col pb-5">
            <div className="relative flex flex-col mb-7">
              <div className="flex flex-col justify-center items-center">
                <Image
                  className=" w-full h-370 2xl:h-410 shadow-lg object-cover"
                  src={unsplashimg.src}
                  alt={unsplashimg.alt}
                  width={1800}
                  height={400}
                />
                <Image
                  className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                  src={user.image}
                  alt="user-pic"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <div className="text-center mb-7">
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn("created")
                }}
                className={`${
                  activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Created
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn("saved")
                }}
                className={`${
                  activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Saved
              </button>
            </div>
            <div className="px-2">
              {picture?.length ? (
                <MasonryLayout pictures={picture} />
              ) : (
                <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                  No Picture Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
