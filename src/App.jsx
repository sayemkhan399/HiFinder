import { useContext } from "react";
import Header from "./components/Header";
import GithubSearch from "./components/GithubSearch";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300
        ${
          isDark
            ? "bg-linear-to-br from-slate-900 via-slate-800 to-gray-800 text-white"
            : "bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-900"
        }`}
    >
      <Header />
      <main className="pt-24">
        {" "}
        <GithubSearch />
      </main>
    </div>
  );
}

export default App;
