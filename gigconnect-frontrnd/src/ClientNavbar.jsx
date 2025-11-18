import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function ClientNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/client-home" },
    { name: "Post Jobs", path: "/post-jobs" },
    { name: "Messages", path: "/messages" },
    { name: "Status", path: "/status" },
  ];

  return (
    <nav className="w-full bg-black shadow-md fixed top-0 left-0 z-50 px-6 py-2">
      <div className="max-w-7xl mx-5 flex justify-between items-center h-16 px-0">
        <h1
          className="font-bold p-2 m-0 text-3xl text-orange-600 cursor-pointer"
          onClick={() => navigate("/client-home")}
        >
          GigConnect-Client
        </h1>

        <div className="hidden md:flex space-x-8 ml-auto mr-6 relative items-center">
          {links.map((link) => (
            <motion.span
              key={link.name}
              className={`text-lg font-medium cursor-pointer ${location.pathname === link.path
                  ? "text-orange-600"
                  : "text-white hover:text-orange-600"
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(link.path)}
            >
              {link.name}
            </motion.span>
          ))}

          {loggedInUser && (
            <div className="relative" ref={dropdownRef}>
              // User Avatar Button
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg hover:bg-orange-700 transition"
              >
                {loggedInUser.charAt(0).toUpperCase()}
              </button>

              // Dropdown Menu
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-50"
                >
                  <button
                    onClick={() => {
                      navigate("/Client-profile"); // My Profile page route
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      //Mobile Menu
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden flex flex-col items-center bg-[#072019] space-y-6 py-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => (
              <motion.span
                key={link.name}
                className={`text-lg font-medium cursor-pointer ${location.pathname === link.path
                    ? "text-orange-600"
                    : "text-white hover:text-orange-600"
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate(link.path);
                  setIsOpen(false);
                }}
              >
                {link.name}
              </motion.span>
            ))}

            {loggedInUser && (
              <div className="flex flex-col items-center space-y-3">
                <span className="text-white font-semibold">{loggedInUser}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
