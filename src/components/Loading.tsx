type Props = {};
import { FaSpinner } from "react-icons/fa6";
function Loading({}: Props) {
  return (
    <div className="w-full flex justify-center items-center py-2">
      <FaSpinner className="text-2xl animate-spin" />
    </div>
  );
}

export default Loading;
