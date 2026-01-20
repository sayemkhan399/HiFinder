import { useState } from "react";
import {
  Search,
  Github,
  Users,
  MapPin,
  BookOpen,
  Building2,
  Link as LinkIcon,
  Twitter,
  Calendar,
  BadgeCheck,
} from "lucide-react";

const GithubSearch = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");
      setUser(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-3xl px-4 space-y-8">
        {/* Search */}
        <form onSubmit={handleSearch}>
          <div className="flex items-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg dark:bg-white/5">
            <div className="pl-4 opacity-70">
              <Search size={20} />
            </div>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Search GitHub username..."
              className="flex-1 px-4 py-4 bg-transparent outline-none"
            />

            <button
              type="submit"
              className="mr-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-md hover:shadow-lg transition"
            >
              Search
            </button>
          </div>
        </form>

        {loading && (
          <div className="text-center py-6 opacity-70">Fetching profile…</div>
        )}

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-100 p-4 text-center text-red-700">
            {error}
          </div>
        )}

        {user && (
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl dark:bg-white/5">
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-5">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="h-20 w-20 rounded-2xl"
                />
                <div>
                  <h2 className="text-2xl font-bold">
                    {user.name || user.login}
                  </h2>
                  <p className="opacity-70">@{user.login}</p>
                </div>
              </div>

              {user.bio && <p className="opacity-80">{user.bio}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Stat icon={<Users size={18} />} text={`${user.followers} followers`} />
                <Stat icon={<BookOpen size={18} />} text={`${user.public_repos} repos`} />
                {user.location && <Stat icon={<MapPin size={18} />} text={user.location} />}
                {user.company && <Stat icon={<Building2 size={18} />} text={user.company} />}
                {user.blog && (
                  <Stat
                    icon={<LinkIcon size={18} />}
                    text={
                      <a
                        href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        {user.blog}
                      </a>
                    }
                  />
                )}
                {user.twitter_username && (
                  <Stat icon={<Twitter size={18} />} text={`@${user.twitter_username}`} />
                )}
                <Stat
                  icon={<Calendar size={18} />}
                  text={`Joined ${new Date(user.created_at).toLocaleDateString()}`}
                />
                {user.hireable && (
                  <Stat icon={<BadgeCheck size={18} />} text="Hireable" />
                )}
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-700 to-purple-600 px-5 py-3 font-semibold text-white shadow-md"
              >
                <Github size={20} />
                View Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Stat = ({ icon, text }) => (
  <div className="flex items-center gap-2 opacity-80">
    <span className="text-indigo-400">{icon}</span>
    <span>{text}</span>
  </div>
);

export default GithubSearch;
