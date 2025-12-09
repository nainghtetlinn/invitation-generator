import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm">
        <Link
          to="/"
          className="btn btn-ghost text-xl"
        >
          Invitation Generator
        </Link>
      </div>
    </header>
  );
};
