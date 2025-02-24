import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';


const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: "250px"}}>
        <Link className="fs-5 fw-bold text-white text-decoration-none mb-3" to="/dashboard">Local Shop</Link>
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
                </li>
                {user?.role === "admin"&& (
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
export default Sidebar;  // Export the component