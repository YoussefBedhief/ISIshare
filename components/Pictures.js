import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { client } from "../utils/client"
import { allPictures, searchQuery } from "../utils/data"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"

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
    return <Spinner message="We are adding new ideas, Please wait a moment " />
  }
  if (!picture?.length) {
    return (
      <h2 className="flex justify-center items-center text-4xl mt-4">
        No picture available
      </h2>
    )
  }

  return <div>{picture && <MasonryLayout pictures={picture} />}</div>
}

export default Pictures
