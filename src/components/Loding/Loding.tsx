import { BounceLoader } from "react-spinners";

export default function Loding() {
  return (
    <div className="min-h-screen  fixed z-50 inset-0 bg-gray-400 flex justify-center items-center">
        <BounceLoader size={100} color="#09d" />
    </div>
  )
}
