import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

const DropdownUser = () => {
  const [dropdownUserOpen, setDropdownUserOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownUserOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownUserOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownUserOpen || keyCode !== 27) return;
      setDropdownUserOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <>
      <div className="relative">
        <Link
          ref={trigger}
          onClick={() => setDropdownUserOpen(!dropdownUserOpen)}
          className="flex items-center space-x-6"
          to="#"
        >
          <div className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Super Admin
          </span>
            <span className="block text-xs">Manager</span>
          </div>

          <div className="flex items-center space-x-1">
            <div className="flex items-center p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full">
              <UserIcon size={24} />
            </div>
            <ChevronDownIcon size={24} className={` ${
              dropdownUserOpen && "rotate-180"
            }`} />
          </div>
        </Link>

        {/* <!-- Dropdown Start --> */}
        <div
          ref={dropdown}
          onFocus={() => setDropdownUserOpen(true)}
          onBlur={() => setDropdownUserOpen(false)}
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-slate-700 dark:bg-slate-800 ${
            dropdownUserOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-slate-700">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <UserIcon size={24} />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <SettingsIcon size={24} />
                Account Settings
              </Link>
            </li>
          </ul>
          <button
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <LogOutIcon size={24} />
            Log Out
          </button>
        </div>
        {/* <!-- Dropdown End --> */}
      </div>
    </>
  );
};

export default DropdownUser;
