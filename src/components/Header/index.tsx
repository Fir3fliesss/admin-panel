import { Link } from "react-router-dom";
import DropdownUser from "./DropdownUser";
import DarkModeSwitcher from "./DarkModeSwitcher";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-slate-800 dark:drop-shadow-none">
      <div className="flex w-full items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Kiri: Logo dan Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:hidden"
          >
            {/* Hamburger Icon */}
          </button>
          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src="/images/favicon.webp" className="h-7 w-11" alt="Logo" />
          </Link>
        </div>

        {/* Kanan: Dark Mode Switcher dan Dropdown User */}
        <div className="flex items-center gap-3 ml-auto 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li>
              <DarkModeSwitcher />
            </li>
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
