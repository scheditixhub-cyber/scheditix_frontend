import { useState } from "react";
import logo from "../../assets/LogoWrap.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const nav = useNavigate()

  return (
    <nav className="flex items-center justify-between w-full h-15 p-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center cursor-pointer gap-2 font-bold text-lg">
     <img src={logo} alt="" />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-gray-600">
        <a href="#" className="hover:text-[#27187E]">
          Discover Events
        </a>
        <a href="#" className="hover:text-[#27187E]">
          About Us
        </a>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-4">
        <button onClick={() => nav("/login")} className="text-gray-600 cursor-pointer hover:text-[#27187E]">
          Sign In
        </button>
        <button onClick={() => nav("/signup")} className="bg-[#27187E] text-white px-4 py-2 rounded-lg hover:bg-[#3b2eb0]">
          Sign Up
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-600 focus:outline-none"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-4 md:hidden z-10">
          <a href="#" className="text-gray-600 hover:text-[#27187E]">
            Discover Events
          </a>
          <a href="#"  className="text-gray-600  hover:text-[#27187E]">
            About Us
          </a>
          <button onClick={() => nav("/login")} className="text-gray-600 hover:text-[#27187E] text-left">
            Sign In
          </button>
          <button onClick={() => nav("/signup")} className="bg-[#27187E] text-white px-4 py-2 rounded-lg hover:bg-[#3b2eb0] w-full">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
