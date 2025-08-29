import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import logoImage from "../assets/RedNotes Logo Design.png";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-4">
              <img
                src={logoImage}
                alt="RedNotes Logo"
                className="h-9 w-19 object-contain"
              />
              <span className="text-3xl font-bold text-purple-500 tracking-wide">RedNotes</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
