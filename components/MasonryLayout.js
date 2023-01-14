import Masonry from "react-masonry-css";
import ImageCard from "./ImageCard";

const breakPointObject = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};
function MasonryLayout({ pictures }) {
  return (
    <Masonry
      className="flex animate-slide-fwd"
      breakpointCols={breakPointObject}
    >
      {pictures?.map((picture) => (
        <ImageCard key={picture._id} picture={picture} className="w-max" />
      ))}
    </Masonry>
  );
}

export default MasonryLayout;
