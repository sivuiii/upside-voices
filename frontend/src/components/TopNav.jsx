import { Link, useLocation } from "react-router-dom";

export default function TopNav({ showProfile = true }) {
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const isSubmit = pathname === "/submit";
  const isMap = pathname === "/map";
  const isProfile = pathname === "/profile";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {!isHome && (
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-red-100 border border-red-500/50 rounded-full px-3 py-1.5 hover:bg-red-500/10"
        >
          Home
        </Link>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {!isSubmit && (
          <Link
            to="/submit"
            className="px-4 py-1.5 text-sm font-medium tracking-wider rounded bg-primary hover:bg-red-600 text-white shadow-lg shadow-red-900/20 transition-all transform hover:scale-105"
          >
            SHARE
          </Link>
        )}

        {!isMap && (
          <Link
            to="/map"
            className="px-4 py-1.5 text-sm font-medium tracking-wider rounded border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-white/5 transition-all"
          >
            MAP
          </Link>
        )}

        {showProfile && !isProfile && (
          <Link
            to="/profile"
            className="px-4 py-1.5 text-sm font-medium tracking-wider rounded border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-white/5 transition-all"
          >
            PROFILE
          </Link>
        )}
      </div>
    </div>
  );
}
