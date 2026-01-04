import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

const DashboardNavbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow px-6">
      <div className="flex-1"></div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                user?.photoURL ||
                "https://img.icons8.com/?size=100&id=12438&format=png"
              }
              alt="profile"
              referrerPolicy="no-referrer"
            />
          </div>
        </label>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li className="border-b pb-2">
            <span className="font-semibold">{user?.displayName}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </li>
          <li>
            <Link to="/dashboard">Dashboard Home</Link>
          </li>
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <button onClick={logOut}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardNavbar;
