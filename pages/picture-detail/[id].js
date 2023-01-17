import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  pinDetailMorePinQuery,
  pinDetailQuery,
  userQuery,
} from "../../utils/data"
import { v4 as uuidv4 } from "uuid"
import { client, urlFor } from "../../utils/client"
import Spinner from "../../components/Spinner"
import { fetchUser } from "../../utils/fetchUser"
import Link from "next/link"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import { MdDownloadForOffline } from "react-icons/md"
import Layout from "../../components/Layout"
import Head from "next/head"
import { BiSend } from "react-icons/bi"
import { AiOutlineComment } from "react-icons/ai"
function Detail() {
  const [picture, setPicture] = useState(null)
  const [pictureDetails, setPictureDetails] = useState(null)
  const [comment, setComment] = useState("")
  const [addingComment, setAddingComment] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pictureId = router.query.id

  const fetchpictureDetails = () => {
    let query = pinDetailQuery(pictureId)

    if (query) {
      client.fetch(query).then((data) => {
        setPictureDetails(data[0])
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0])
          client.fetch(query).then((response) => setPicture(response))
        }
      })
    }
  }
  useEffect(() => {
    const userInfo = fetchUser()
    const query = userQuery(userInfo?.sub)
    client.fetch(query).then((data) => {
      setUser(data[0])
    })
    fetchpictureDetails()
  }, [pictureId])

  const addComment = () => {
    if (comment) {
      setAddingComment(true)

      client
        .patch(pictureId)
        .setIfMissing({ comment: [] })
        .insert("after", "comment[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user?._id },
          },
        ])
        .commit()
        .then(() => {
          fetchpictureDetails()
          setComment("")
          setAddingComment(false)
        })
    }
  }

  if (!pictureDetails) {
    return <Spinner message="Chargement des détails de l'image..." />
  } else {
    return (
      <>
        <Head>
          <title>ISI-Share</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
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
            <div
              className="flex xl:flex-row flex-col m-auto bg-white"
              style={{ maxWidth: "1500px", borderRadius: "32px" }}
            >
              <div className="flex justify-center items-center flex-initial md:items-start">
                <Image
                  className="rounded-t-3xl rounded-b-lg"
                  src={
                    pictureDetails?.image && urlFor(pictureDetails?.image).url()
                  }
                  alt="picture"
                  height={400}
                  width={400}
                />
              </div>
              <div className="w-full p-5 flex-1 xl:min-w-620">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`${pictureDetails?.image?.asset?.url}?dl=`}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                    >
                      <MdDownloadForOffline />
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold break-words mt-3">
                    {pictureDetails?.title}
                  </h1>
                  <p className="mt-3">{pictureDetails?.about}</p>
                </div>
                <Link
                  href={`/user-profile/${pictureDetails?.postedBy?._id}`}
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg "
                >
                  <Image
                    src={pictureDetails?.postedBy?.image}
                    className="w-10 h-10 rounded-full"
                    alt="user-profile"
                    height={400}
                    width={400}
                  />
                  <p className="font-bold">
                    {pictureDetails?.postedBy?.userName}
                  </p>
                </Link>
                <h2 className="mt-5 text-2xl">Laisser un commentaire</h2>
                <div className="max-h-370 overflow-y-auto">
                  {pictureDetails?.comment?.map((item) => (
                    <div
                      className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                      key={item?.comment}
                    >
                      <img
                        src={item?.postedBy?.image}
                        className="w-10 h-10 rounded-full cursor-pointer"
                        alt="user-profile"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold">{item?.postedBy?.userName}</p>
                        <p>{item?.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap mt-6 gap-3">
                  <Link href={`/user-profile/${user?._id}`}>
                    <img
                      src={user?.image}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      alt="user-profile"
                    />
                  </Link>
                  <input
                    className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                    type="text"
                    placeholder="Commenter ici"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-full px-3 py-2 font-semibold text-base outline-none"
                    onClick={addComment}
                  >
                    {addingComment ? (
                      <AiOutlineComment className="text-2xl" />
                    ) : (
                      <BiSend className="text-2xl" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Detail
