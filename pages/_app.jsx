import "../styles/globals.css"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useEffect } from "react"
import { fetchUser } from "../utils/fetchUser"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const user = fetchUser()
    if (!user) router.push("/login")
  }, [])

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Component {...pageProps} />;
    </GoogleOAuthProvider>
  )
}

export default MyApp
