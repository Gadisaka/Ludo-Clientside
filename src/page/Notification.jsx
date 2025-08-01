import React from "react";
import {
  FaBell,
  FaGift,
  FaCreditCard,
  FaUsers,
  FaTrophy,
  FaTimes,
  FaCheck,
  FaSignOutAlt,
  FaWifi,
} from "react-icons/fa";

const Notifications = () => {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "withdraw",
      title: "Withdrawal Successful",
      message:
        "Your withdrawal of 300 ETB has been processed and sent to your account",
      time: "5 minutes ago",
      unread: true,
      icon: FaSignOutAlt,
    },
    {
      id: 2,
      type: "game_disconnect",
      title: "Game Disconnected",
      message: "You lost the game due to connection issues.",
      time: "15 minutes ago",
      unread: true,
      icon: FaWifi,
    },
    {
      id: 3,
      type: "transaction",
      title: "Deposit Successful",
      message: "Your deposit of 500 ETB has been processed successfully",
      time: "1 hour ago",
      unread: false,
      icon: FaCreditCard,
    },
    {
      id: 4,
      type: "game_result",
      title: "Game Won!",
      message: "Congratulations! You won 200 ETB in your last game",
      time: "3 hours ago",
      unread: false,
      icon: FaTrophy,
    },
    {
      id: 5,
      type: "withdraw",
      title: "Withdrawal Pending",
      message: "Your withdrawal request of 150 ETB is being processed",
      time: "1 day ago",
      unread: false,
      icon: FaSignOutAlt,
    },
  ];

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

  const markAsRead = (id) => {
    console.log(`Marking notification ${id} as read`);
  };

  const deleteNotification = (id) => {
    console.log(`Deleting notification ${id}`);
  };

  const markAllAsRead = () => {
    console.log("Marking all notifications as read");
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

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
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-gray-700 border border-gray-600 rounded-xl transition-all hover:bg-gray-650 ${
                    notification.unread ? "border-l-4 border-l-blue-400" : ""
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`p-2 rounded-full bg-gray-600 ${getNotificationColor(
                          notification.type
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
                                notification.unread
                                  ? "text-white"
                                  : "text-gray-300"
                              }`}
                            >
                              {notification.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                notification.unread
                                  ? "text-gray-300"
                                  : "text-gray-400"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1 ml-2">
                            {notification.unread && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0 text-gray-400 hover:text-green-400 hover:bg-gray-600 rounded-full flex items-center justify-center"
                                aria-label="Mark as read"
                              >
                                <FaCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
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
