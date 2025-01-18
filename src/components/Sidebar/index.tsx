import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import {
  ArrowLeftToLine,
  BookTypeIcon,
  ChevronDownIcon,
  LogInIcon,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      id="sidebar"
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-slate-900 duration-300 ease-linear dark:bg-slate-800 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 pt-5.5 lg:pt-6.5">
        <NavLink
          to="/welcome"
          className="flex space-x-4 items-center text-white text-xl font-bold"
        >
          <img src="/images/favicon.webp" className="w-11" alt="Logo" />
          Admin Dashboard
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          // aria-expanded={sidebarOpen}
          className="block lg:hidden text-white"
          aria-label="Open sidebar"
        >
          <ArrowLeftToLine />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-slate-400">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Berita --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/berita" || pathname.includes("berita")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-slate-200 duration-300 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-600 ${
                          (pathname === "/berita" ||
                            pathname.includes("berita")) &&
                          "bg-slate-700 dark:bg-slate-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BookTypeIcon />
                        Berita
                        <ChevronDownIcon
                          className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      {/* <!-- Dropdown Berita Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/berita/create"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-slate-400 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Menambahkan Berita
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/berita/update/${id}"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-slate-400 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Mengedit Berita
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Berita End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Berita --> */}

              {/* <!-- Menu Item Geleri --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/galeri" || pathname.includes("galeri")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-slate-200 duration-300 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-600 ${
                          (pathname === "/galeri" ||
                            pathname.includes("galeri")) &&
                          "bg-slate-700 dark:bg-slate-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BookTypeIcon />
                        Galeri
                        <ChevronDownIcon
                          className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      {/* <!-- Dropdown Galeri Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/galeri/create"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-slate-400 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Menambahkan Galeri
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/galeri/update/${id}"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-slate-400 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Mengedit Galeri
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Galeri End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Galeri --> */}

              {/* <!-- Menu Item Sapras --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/sapras" || pathname.includes("sapras")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-slate-200 duration-300 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-600 ${
                          (pathname === "/sapras" ||
                            pathname.includes("sapras")) &&
                          "bg-slate-700 dark:bg-slate-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BookTypeIcon />
                        Sapras
                        <ChevronDownIcon
                          className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      {/* <!-- Dropdown Sapras Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/sarana/create"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-slate-400 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Menambahkan Sapras
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/sarana/update/${id}"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-slate-400 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Mengedit Sapras
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Sapras End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Sapras --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-slate-400">
              Lainnya
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("auth")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-slate-200 duration-300 ease-in-out hover:bg-slate-600 dark:hover:bg-slate-600 ${
                          (pathname === "/" || pathname.includes("auth")) &&
                          "bg-slate-700 dark:bg-slate-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <LogInIcon />
                        Authentication
                        <ChevronDownIcon
                          className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-slate-400 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Log Out
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
