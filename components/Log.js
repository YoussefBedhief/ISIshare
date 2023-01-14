import React from "react"
import { GoogleLogin } from "@react-oauth/google"
import logo from "../assets/logo.png"
import Image from "next/image"
import jwt_decode from "jwt-decode"
import { client } from "../utils/client"
import { useRouter } from "next/router"

function Log() {
  const route = useRouter()
  const responseGoogle = (response, addUser) => {
    const decoded = jwt_decode(response.credential)
    const { name, picture, sub } = decoded
    localStorage.setItem("user", JSON.stringify(decoded))
    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    }
    client.createIfNotExists(user).then(() => {
      route.push("/")
    })
    //addUser(user)
  }
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <Image src={logo} width={400} height={400} alt="Nextpix Logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.error("ERROR")
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Log
