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
            className="px-3 py-1.5 text-sm rounded bg-red-600 hover:bg-red-500 text-white"
          >
            Share
          </Link>
        )}

        {!isMap && (
          <Link
            to="/map"
            className="px-3 py-1.5 text-sm rounded border border-zinc-700 text-zinc-200 hover:border-red-500/60"
          >
            Map
          </Link>
        )}

        {showProfile && !isProfile && (
          <Link
            to="/profile"
            className="px-3 py-1.5 text-sm rounded border border-zinc-700 text-zinc-200 hover:border-red-500/60"
          >
            Profile
          </Link>
        )}
      </div>
    </div>
  );
}
