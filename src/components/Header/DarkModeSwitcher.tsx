import useColorMode from "../../hooks/useColorMode";
import { MoonIcon, SunIcon } from "lucide-react";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <>
      <ul className="flex items-center gap-2 2xsm:gap-4">
        <li>
          <label
            htmlFor="dark-mode-toggle"
            aria-label="Toggle dark mode"
            onClick={() => {
              if (typeof setColorMode === "function") {
                setColorMode(colorMode === "light" ? "dark" : "light");
              }
            }}
            className={`relative m-0 block h-7.5 w-14 rounded-full ${
              colorMode === "dark" ? "bg-primary" : "bg-stroke"
            }`}
          >
            <input
              id="dark-mode-toggle"
              name="dark-mode-toggle"
              type="checkbox"
              className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
            />
            <div
              className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-200 ease-linear ${
                colorMode === "dark" && "!right-[3px] !translate-x-full"
              }`}
            >
              <SunIcon className="dark:hidden" />
              <MoonIcon className="fill-primary hidden dark:inline-block" />
            </div>
          </label>
        </li>
        <li></li>
      </ul>
    </>
  );
};

export default DarkModeSwitcher;
