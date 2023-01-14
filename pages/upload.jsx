import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { client } from "../utils/client"
import Spinner from "../components/Spinner"
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { HiMenu } from "react-icons/hi"
import { AiFillCloseCircle } from "react-icons/ai"
import { fetchUser } from "../utils/fetchUser"
import { categories, userQuery } from "../utils/data"
import Logo from "../assets/logo.png"
import { useEffect } from "react"

function Upload() {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const [imageAssets, setImageAssets] = useState(null)
  const [title, setTitle] = useState("")
  const [about, setAbout] = useState("")
  const [destination, setDestination] = useState("")
  const [category, setCategory] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [fields, setFields] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wrongImageType, setWrongImageType] = useState(false)

  const router = useRouter()
  useEffect(() => {
    const user = fetchUser()
    const query = userQuery(user?.sub)
    client.fetch(query).then((data) => {
      setUser(data[0])
    })
  }, [])

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0]
    if (
      type === "image/png" ||
      type === "image/jpeg" ||
      type === "image/svg" ||
      type === "image/jpg" ||
      type === "image/gif"
    ) {
      setWrongImageType(false)
      setLoading(true)
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAssets(document)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Image upload error", error)
        })
    } else {
      setWrongImageType(true)
    }
  }
  const savePicture = () => {
    if (title && about && destination && imageAssets?._id && category) {
      const doc = {
        _type: "Image",
        title,
        about,
        destination,
        category,
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: imageAssets?._id },
        },
        userId: user?._id,
        postedBy: {
          _type: "postedBy",
          _ref: user?._id,
        },
      }
      client.create(doc).then(() => {
        router.push("/")
      })
    } else {
      setFields(true)
      setTimeout(() => {
        setFields(false)
      }, 2000)
    }
  }

  return (
    <>
      <div className="flex bg-gray-50 md:flex-row flex-col h-screen w-full transition-height duration-75 ease-out mt-2">
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
              <Image src={Logo} alt="NextPix" height={50} width={150} />
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
        <div className=" px-2 flex-1 h-screen w-full">
          <div className="bg-gray-50">
            <Navbar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              user={user}
            />
          </div>
          <div className="flex flex-col items-center ">
            {fields && (
              <p className="text-red-500 mb-1 text-xl transition-all duration-150 ease-in">
                Please fill in all the filelds.
              </p>
            )}
            <div className="flex lg:flex-row flex-col justify-center items-center bg-white p-3 lg:p-5 w-full lg:w-4/5">
              <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                <div className="flex flex-col justify-center items-center border-2 border-dotted border-gray-300 p-3 w-full h-420">
                  {loading && <Spinner />}
                  {wrongImageType && <p>Wrong Image Type</p>}
                  {!imageAssets ? (
                    <label>
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col justify-center items-center">
                          <p className="font-bold text-2xl">
                            <AiOutlineCloudUpload fontSize={150} />
                          </p>
                          <p className="text-lg">Click to upload your image</p>
                        </div>
                        <p className="mt-23 text-gray-400 text-center">
                          You need to use high-quality JPG, SVG, PNG, GIF or
                          TIFF
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-image"
                        className="w-0 h+0"
                        onChange={uploadImage}
                      />
                    </label>
                  ) : (
                    <div className="relative h-full">
                      <Image
                        className="h-full w-full"
                        src={imageAssets?.url}
                        alt="uploaded image"
                        height={500}
                        width={500}
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                        onClick={() => {
                          setImageAssets(null)
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    value={title}
                    name="title"
                    id="title"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="title"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Picture Title
                  </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    value={about}
                    name="about"
                    id="about"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => setAbout(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="about"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    About Picture
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    value={destination}
                    name="destination"
                    id="destination"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="destination"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Picture URL
                  </label>
                </div>
                <div className="flex flex-col">
                  <div>
                    <select
                      id="categories"
                      onChange={(e) => setCategory(e.target.value)}
                      className="capitalize block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    >
                      <option value="Other" className="bg-white ">
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option
                          key={category.name}
                          className="text-base border-0 outline-none capitalize bg-white text-black"
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end items-end mt-10">
                    <button
                      type="button"
                      onClick={savePicture}
                      className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Save Picture
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Upload
