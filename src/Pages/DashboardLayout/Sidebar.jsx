import { NavLink, Link } from "react-router-dom";
import { FaChartPie, FaUser, FaCubes, FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  const role = "user"; // later from backend

  const baseLink =
    "flex items-center gap-3 px-4 py-2 rounded hover:bg-primary hover:text-white transition";

  const activeLink = "bg-primary text-white font-semibold";

  return (
    <aside className="w-64 min-h-screen bg-base-100 shadow-lg">
      {/* Logo */}
      <div className="p-4.5 border-b text-center text-xl font-bold">
        Dashboard
      </div>

      <ul className="menu p-4 space-y-2">
        {/* USER MENU */}
        <li>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? `${baseLink} ${activeLink}` : baseLink
            }
          >
            <FaChartPie />
            Overview
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/my-models"
            className={({ isActive }) =>
              isActive ? `${baseLink} ${activeLink}` : baseLink
            }
          >
            <FaCubes />
            My Models
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/my-purchase"
            className={({ isActive }) =>
              isActive ? `${baseLink} ${activeLink}` : baseLink
            }
          >
            <FaShoppingCart />
            My Purchases
          </NavLink>
        </li>

        {/* ADMIN MENU */}
        {role === "admin" && (
          <>
            <div className="divider">Admin</div>

            <li>
              <NavLink
                to="/dashboard/manage-models"
                className={({ isActive }) =>
                  isActive ? `${baseLink} ${activeLink}` : baseLink
                }
              >
                <FaCubes />
                Manage Models
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  isActive ? `${baseLink} ${activeLink}` : baseLink
                }
              >
                <FaUser />
                Manage Users
              </NavLink>
            </li>
          </>
        )}

        {/* ✅ ALWAYS VISIBLE */}
        <li className="mt-6 border-t pt-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:text-primary"
          >
            ← Back to Home
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
