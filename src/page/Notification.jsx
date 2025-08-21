import React, { useEffect } from "react";
import {
  FaBell,
  FaCreditCard,
  FaTrophy,
  FaTimes,
  FaCheck,
  FaSignOutAlt,
} from "react-icons/fa";
import useWalletStore from "../store/walletStore";

const Notifications = () => {
  const {
    notifications,
    unreadCount,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useWalletStore();

  // Fetch notifications on component mount
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const getNotificationColor = (type) => {
    switch (type) {
      case "withdraw":
        return "text-green-400";
      case "game_disconnect":
        return "text-red-400";
      case "transaction":
        return "text-blue-400";
      case "game_result":
        return "text-yellow-400";
      case "bonus":
        return "text-purple-400";
      case "system":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = (id) => {
    // For now, just mark as read instead of deleting
    markAsRead(id);
  };

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaBell className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-gray-400 text-sm">
                  {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-md px-4 py-1 text-sm"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-gray-700 border border-gray-600 rounded-xl">
              <div className="p-8 text-center">
                <FaBell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No notifications yet</p>
                <p className="text-gray-500 text-sm mt-2">
                  You'll see game invites, transaction updates, and other
                  important notifications here
                </p>
              </div>
            </div>
          ) : (
            notifications.map((notification) => {
              // Determine icon based on notification type
              let IconComponent = FaBell; // default
              let notificationType = "system";

              if (notification.message.toLowerCase().includes("deposit")) {
                IconComponent = FaCreditCard;
                notificationType = "transaction";
              } else if (
                notification.message.toLowerCase().includes("withdraw")
              ) {
                IconComponent = FaSignOutAlt;
                notificationType = "withdraw";
              } else if (notification.message.toLowerCase().includes("game")) {
                IconComponent = FaTrophy;
                notificationType = "game_result";
              }

              // Format time
              const timeAgo = (date) => {
                const now = new Date();
                const diff = now - new Date(date);
                const minutes = Math.floor(diff / 60000);
                const hours = Math.floor(diff / 3600000);
                const days = Math.floor(diff / 86400000);

                if (minutes < 60) return `${minutes} minutes ago`;
                if (hours < 24) return `${hours} hours ago`;
                return `${days} days ago`;
              };

              return (
                <div
                  key={notification._id}
                  className={`bg-gray-700 border border-gray-600 rounded-xl transition-all hover:bg-gray-650 ${
                    notification.status === "UNREAD"
                      ? "border-l-4 border-l-blue-400"
                      : ""
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`p-2 rounded-full bg-gray-600 ${getNotificationColor(
                          notificationType
                        )}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3
                              className={`font-semibold ${
                                notification.status === "UNREAD"
                                  ? "text-white"
                                  : "text-gray-300"
                              }`}
                            >
                              {notification.type === "SUCCESS"
                                ? "Success"
                                : "Notification"}
                            </h3>
                            <p
                              className={`text-sm ${
                                notification.status === "UNREAD"
                                  ? "text-gray-300"
                                  : "text-gray-400"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {timeAgo(notification.createdAt)}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1 ml-2">
                            {notification.status === "UNREAD" && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="h-8 w-8 p-0 text-gray-400 hover:text-green-400 hover:bg-gray-600 rounded-full flex items-center justify-center"
                                aria-label="Mark as read"
                              >
                                <FaCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification._id)
                              }
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded-full flex items-center justify-center"
                              aria-label="Delete notification"
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
