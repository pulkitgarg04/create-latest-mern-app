import { ShoppingCart, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav>
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="size-8 rounded bg-black flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">MERN Store</span>
        </Link>
      </div>

      <div className="nav-links hidden md:flex">
        <a href="#platform">Platform</a>
        <a href="#developers">Developers</a>
        <a href="#blogs">Blogs</a>
        <a href="#company">Company</a>
      </div>

      <div className="flex items-center gap-4">
        {authUser ? (
          <>
            <Link to="/dashboard" className="btn-outline-pill py-2">Dashboard</Link>
            <button onClick={logout} className="btn-black py-2 px-6">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-outline-pill py-2 text-sm">Experience App</Link>
            <Link to="/signup" className="btn-black py-2 px-6 text-sm">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
