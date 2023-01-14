import { BsFillTelephoneFill, BsHddNetworkFill } from "react-icons/bs"
import { FaRobot } from "react-icons/fa"
import { GiDatabase, GiElectricalResistance } from "react-icons/gi"
import { TbMath } from "react-icons/tb"
import { ImEmbed } from "react-icons/im"
import { FcElectronics } from "react-icons/fc"
import { MdCategory, MdOutlineComputer, MdSecurity } from "react-icons/md"

export const categories = [
  {
    name: "Computer Science",
    icon: <MdOutlineComputer />,
  },
  {
    name: "Network",
    icon: <BsHddNetworkFill />,
  },
  {
    name: "IA",
    icon: <FaRobot />,
  },
  {
    name: "Math",
    icon: <TbMath />,
  },
  {
    name: "Electronic",
    icon: <GiElectricalResistance />,
  },
  {
    name: "Telecommunication",
    icon: <BsFillTelephoneFill />,
  },
  {
    name: "development",
    icon: <ImEmbed />,
  },
  {
    name: "Database",
    icon: <GiDatabase />,
  },
  {
    name: "Electronics",
    icon: <FcElectronics />,
  },
  {
    name: "Security",
    icon: <MdSecurity />,
  },
  {
    name: "Others",
    icon: <MdCategory />,
  },
]

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id =='${userId}']`
  return query
}

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "Image" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image{
      asset ->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image,
    },
    save[]{
      _key,
      postedBy-> {
        _id,
        userName,
        image,
      },
    },
  }`

  return query
}

export const allPictures = `*[_type == "Image"] | order(_createdAt desc){
  image{
      asset ->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image,
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image,
      },
    },

}`

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "Image" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`
  return query
}

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "Image" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comment[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`
  return query
}
export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'Image' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`
  return query
}

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'Image' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`
  return query
}
