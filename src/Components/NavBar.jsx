import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.jpg";
import { FaSun, FaMoon } from "react-icons/fa";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 🌗 Apply theme to HTML and persist in localStorage
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    signOutUser()
      .then(() => toast.success("Logged out successfully"))
      .catch((error) => {
        console.error("Logout error:", error.message);
        toast.error("Logout failed");
      });
  };

  return (
    <div className="navbar bg-primary text-primary-content w-full sticky top-0 z-50 shadow-md px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-model">Add Model</Link>
            </li>
            <li>
              <Link to="/models">View Models</Link>
            </li>

            {user && (
              <>
                <li>
                  <Link to="/my-models">My Models</Link>
                </li>
                <li>
                  <Link to="/my-purchase">My Purchases</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <div className="bg-primary rounded-full h-10 w-10 flex items-center justify-center overflow-hidden shadow-md">
            <img
              src={logo}
              alt="AI Model Manager Logo"
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-xl font-bold text-primary">
            AI Model Manager
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-model">Add Model</Link>
          </li>
          <li>
            <Link to="/models">View Models</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/my-models">My Models</Link>
              </li>
              <li>
                <Link to="/my-purchase">My Purchases</Link>
              </li>
            </>
          )}
          {user && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* 🌗 Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
          title={
            theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
        >
          {theme === "light" ? (
            <FaMoon className="text-gray-800" />
          ) : (
            <FaSun className="text-yellow-400" />
          )}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://img.icons8.com/?size=100&id=12438&format=png"
                  }
                  alt="User Profile"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box mt-3 w-52 p-2 shadow"
            >
              <li className="border-b pb-2">
                <span className="font-semibold">{user.displayName}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </li>
              <li>
                <Link to="/my-purchase">My Purchases</Link>
              </li>
              <li>
                <Link to="/my-models">My Models</Link>
              </li>
              {user && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}

              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-ghost text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
