import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { client, urlFor } from "../utils/client"
import Link from "next/link"
import { MdDownloadForOffline } from "react-icons/md"
import { BsFillArrowUpRightCircleFill } from "react-icons/bs"
import { AiFillDelete } from "react-icons/ai"
import { fetchUser } from "../utils/fetchUser"
import { v4 as uuidv4 } from "uuid"

function ImageCard({ picture }) {
  const router = useRouter()
  const { postedBy, image, _id, destination } = picture

  const [postHover, setPostHover] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const user = fetchUser()

  let alreadySaved = picture?.save?.filter((item) => {
    item?.postedBy?._id === user?.sub
  })

  const savePicture = (id) => {
    if (alreadySaved?.length === (0 || undefined)) {
      setSavingPost(true)

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          router.reload()
          setSavingPost(false)
        })
    }
  }
  const deletePicture = (id) => {
    client.delete(id).then(() => router.reload())
  }

  return (
    <div className="m-2">
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setPostHover(true)}
        onMouseLeave={() => setPostHover(false)}
        onClick={() => router.push(`/picture-detail/${_id}`)}
      >
        <Image
          className="rounded-lg w-full"
          alt="user post"
          src={urlFor(image).width(250).url()}
          width={1000}
          height={1500}
          loading="lazy"
        />
        {postHover && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 py-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Link
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </Link>
              </div>
              {alreadySaved?.length !== (0 || undefined) ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {picture?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    savePicture(_id)
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {picture?.save?.length} {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <Link
                  href={destination}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 px-4 rounded-full opacity-70 hover:opacity-100 font-bold-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15
                    ? destination.slice(8, 15)
                    : destination.slice(8)}
                </Link>
              )}
              {postedBy?._id === user.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePicture(_id)
                  }}
                  className="bg-white opacity-70 hover:opacity-100 text-black font-bold text-dark rounded-3xl hover:shadow-md outline-none p-1"
                >
                  <AiFillDelete fontSize={20} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        href={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <Image
          src={postedBy?.image}
          alt="user image"
          width={25}
          height={25}
          className="rounded-full"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default ImageCard
