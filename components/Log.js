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
  }
  return (
    <div className="h-screen flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-900 to-purple-600 i justify-around items-center hidden">
        <div>
          <div className="p-5 mb-2">
            <Image src={logo} width={400} height={400} alt="ISI-Share Logo" />
          </div>
          <h1 className="text-white font-bold text-4xl font-sans">
            Cher étudiant
          </h1>
          <p className="text-white mt-1 text-xl">
            Veuillez respecter les instructions suivantes:
          </p>
          <ul className="list-disc">
            <li className="text-white mt-1 mr-2">
              Connecter vous avec votre adresse mail universitaire.
            </li>
            <li className="text-white mt-1 mr-2">
              Ajouter des images claires et lisibles.
            </li>
            <li className="text-white mt-1 mr-2">
              Respecter les autres membres de l'application.
            </li>
            <li className="text-white mt-1 mr-2">
              Pas de commentaires insultants ou offensifs.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white w-full">
        <form className="bg-white text-center">
          <Image
            src={logo}
            width={400}
            height={400}
            alt="ISI-Share Logo"
            className="mb-1 md:hidden"
          />
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Bonjour</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Bienvenue à ISI-Share
          </p>
          <p className="text-sm font-normal text-gray-600 mb-7">
            S'il vous plait respecter les instructions lister à gauche
          </p>

          <div className="shadow-2xl bg-center flex justify-center items-center">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.error("ERROR")
              }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Log
