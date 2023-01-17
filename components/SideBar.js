import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import Logo from "../assets/logo.png"
import { AiFillHome } from "react-icons/ai"
import { categories } from "../utils/data"
function SideBar({ closeToggle }) {
  const router = useRouter()
  const { topic } = router.query

  const normalLink =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-red-500 transition-all duration-200 ease-in-out capitalize "
  const activeLink =
    "flex items-center px-5 gap-3 text-red-500 border-r-2 border-red-500 transition-all duration-200 ease-in-out capitalize "
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar shadow-xl">
      <div className="flex flex-col">
        <Link
          href="/"
          className="flex px-5 gap-2 my-6 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <Image src={Logo} alt="Logo" height="auto" width="auto" />
        </Link>
        <div className="flex flex-col gap-5">
          <Link
            href="/"
            className={!topic ? activeLink : normalLink}
            onClick={handleCloseSidebar}
          >
            <AiFillHome /> Accueil
          </Link>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl ">
            Discover our categories
          </h3>
          {categories.slice(0, categories.length).map((category) => (
            <Link
              key={category.name}
              href={`/?topic=${category.name}`}
              className={topic == category.name ? activeLink : normalLink}
              onClick={handleCloseSidebar}
            >
              <span className="font-bold text-2xl xl:text-md ">
                {category.icon}
              </span>
              <span className={`font-medium text-md capitalize`}>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
