import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { client } from "../utils/client"
import { allPictures, searchQuery } from "../utils/data"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"
import { MdOutlineImageNotSupported } from "react-icons/md"

function Pictures() {
  const [loading, setLoading] = useState(false)
  const [picture, setPicture] = useState(null)
  const router = useRouter()
  const { topic } = router.query
  useEffect(() => {
    setLoading(true)
    if (topic) {
      const query = searchQuery(topic)

      client.fetch(query).then((data) => {
        setPicture(data)
      })
      setLoading(false)
    } else {
      client.fetch(allPictures).then((data) => {
        setPicture(data)
      })
      setLoading(false)
    }
  }, [topic])

  if (loading) {
    return (
      <Spinner message="Nous ajoutons de nouveaux examens, veuillez patienter un instant " />
    )
  }
  if (!picture?.length) {
    return (
      <div className="text-center">
        <h2 className="flex justify-center items-center text-4xl mt-4 ">
          Aucune image trouvée
        </h2>
        <p className="text-9xl inline-block mt-2">
          <MdOutlineImageNotSupported />
        </p>
      </div>
    )
  }

  return <div>{picture && <MasonryLayout pictures={picture} />}</div>
}

export default Pictures
