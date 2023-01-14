import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import MasonryLayout from "../../components/MasonryLayout"
import { client } from "../../utils/client"
import { allPictures, searchQuery, userQuery } from "../../utils/data"
import Layout from "../../components/Layout"
import Navbar from "../../components/Navbar"
import { fetchUser } from "../../utils/fetchUser"

function Search() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [picture, setPicture] = useState(null)
  const router = useRouter()
  const searchTerm = router.query.searchValue

  useEffect(() => {
    const userInfo = fetchUser()
    const query = userQuery(userInfo?.sub)
    client.fetch(query).then((data) => {
      setUser(data[0])
    })
  }, [])

  useEffect(() => {
    if (searchTerm !== "") {
      setLoading(true)
      const query = searchQuery(searchTerm)
      client.fetch(query).then((data) => {
        setPicture(data)
        setLoading(false)
      })
    } else {
      client.fetch(allPictures).then((data) => {
        setPins(data)
        setPicture(false)
      })
    }
  }, [searchTerm])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen w-full transition-height duration-75 ease-out mt-2">
      <Layout />
      <div className=" px-2 flex-1 h-screen w-full">
        <div className="bg-gray-50">
          <Navbar user={user} />
        </div>
        {loading && <Spinner message="Searching for Picture..." />}
        {picture?.length !== 0 && <MasonryLayout pictures={picture} />}
        {picture?.length === 0 && searchTerm !== "" && !loading && (
          <div className="mt-10 text-center text-xl ">No Pictures Found!</div>
        )}
      </div>
    </div>
  )
}

export default Search
