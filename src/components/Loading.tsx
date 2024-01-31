type Props = {};
import { FaSpinner } from "react-icons/fa6";
function Loading({}: Props) {
  return (
    <div className="w-full py-2">
      <FaSpinner className="text-2xl animate-spin" />
    </div>
  );
}

export default Loading;
