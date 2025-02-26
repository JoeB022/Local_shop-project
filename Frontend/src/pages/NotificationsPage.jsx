import React from "react";
import { useAppContext } from "../context/AppContext"; // ✅ Ensure the path is correct

const NotificationsPage = () => {
  const { user, notifications } = useAppContext(); // Use context to get user and notifications

  // Filter notifications based on user role
  const userNotifications = notifications.filter((notification) =>
    notification.roles.includes(user.role)
  );

  return (
    <div className="container mt-4">
      <h2>Notifications</h2>
      {userNotifications.length > 0 ? (
        userNotifications.map((notification, index) => (
          <div key={index} className={`alert ${notification.type}`} role="alert">
            <h4 className="alert-heading">{notification.title}</h4>
            <p>{notification.message}</p>
            <small className="text-muted">{notification.date}</small>
          </div>
        ))
      ) : (
        <div className="alert alert-secondary" role="alert">
          No notifications available.
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;

