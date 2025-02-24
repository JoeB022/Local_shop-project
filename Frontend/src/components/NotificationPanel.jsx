import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New supply request received", type: "info", read: false },
    { id: 2, message: "Inventory updated successfully", type: "success", read: true },
    { id: 3, message: "Payment pending for Supplier A", type: "warning", read: false }
  ]);

  useEffect(() => {
    // Fetch notifications from backend (optional)
  }, []);

  return (
   <div className="card w-75 shadow">
    <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Notifications</h5>
        </div>
        <ul className="list-group list-group-flush">
            {notifications.length === 0 ? (
                <li className="list-group-item text-center text-muted">
                      No notifications available
                </li>
                ) : (
                    notifications.map(({id, message, type, read}) => (
                        <li key={id} className={`list-group-item ${read ? 'text-muted' : 'fw-bold'}`}>
                            <span className={`badge bg-${type === "success" ? "success" : type === "warning" ? "warning" : "info"}me-2`}>
                                {type.toUpperCase()}
                                </span>
                                {message}
                        </li>
             ))
             )}
        </ul>
    </div>
  );
};
export default NotificationPanel;