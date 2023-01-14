import { ColorRing } from "react-loader-spinner";
function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#d92129", "#de4e22", "#e47b1b", "#eaa814", "#849b87"]}
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
