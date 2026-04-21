import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const PasswordCell = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <span className="tracking-widest">
        {show ? "No visible" : "••••••••"}
      </span>

      <button
        onClick={() => setShow(!show)}
        className="text-gray-500 hover:text-black"
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
};