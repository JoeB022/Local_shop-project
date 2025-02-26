import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);

    // Function to determine dashboard route based on user role
    const getDashboardRoute = () => {
        if (!user) return "/login"; // Redirect to login if user is not authenticated
        if (user.role === "merchant") return "/merchant-dashboard";
        if (user.role === "admin") return "/admin-dashboard";
        if (user.role === "clerk") return "/clerk-dashboard";
        return "/dashboard"; // Default dashboard if role is unknown
    };

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "250px" }}>
            <Link className="fs-5 fw-bold text-white text-decoration-none mb-3" to={getDashboardRoute()}>
                Local Shop
            </Link>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link className="nav-link text-white" to={getDashboardRoute()}>Dashboard</Link>
                </li>

                {/* Admin-Specific Links */}
                {user?.role === "admin" && (
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/manage-users">Manage Users</Link>
                    </li>
                )}

                <li className="nav-item">
                    <Link className="nav-link text-white" to="/reports">Reports</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-danger" to="/logout">Logout</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
