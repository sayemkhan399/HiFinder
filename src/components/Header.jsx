import { useContext } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "./Logo";

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/20 backdrop-blur-xl shadow-lg dark:bg-black/30">
          {/* Logo */}
          <div className="px-6 py-4">
            <Logo/>
          </div>

          {/* Theme Button */}
          <button
            onClick={toggleTheme}
            className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/30 text-gray-900 hover:bg-white/40 transition dark:bg-black/30 dark:text-white dark:hover:bg-black/40"
            aria-label="Toggle theme"
          >
            <ThemeSwitcher />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
