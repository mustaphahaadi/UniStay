import { useEffect } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { NOTIFICATION_TYPES } from "../config";

const NotificationSystem = () => {
  const { notifications, removeNotification } = useNotification();

  // Auto-hide notifications on route change
  useEffect(() => {
    return () => {
      // This will run when the component unmounts (route changes)
      notifications.forEach((notification) => {
        if (notification.autoClose !== false) {
          removeNotification(notification.id);
        }
      });
    };
  }, [notifications, removeNotification]);

  if (notifications.length === 0) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case NOTIFICATION_TYPES.ERROR:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case NOTIFICATION_TYPES.WARNING:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case NOTIFICATION_TYPES.INFO:
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "bg-green-50 dark:bg-green-900 dark:bg-opacity-20";
      case NOTIFICATION_TYPES.ERROR:
        return "bg-red-50 dark:bg-red-900 dark:bg-opacity-20";
      case NOTIFICATION_TYPES.WARNING:
        return "bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20";
      case NOTIFICATION_TYPES.INFO:
      default:
        return "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20";
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "border-green-400 dark:border-green-600";
      case NOTIFICATION_TYPES.ERROR:
        return "border-red-400 dark:border-red-600";
      case NOTIFICATION_TYPES.WARNING:
        return "border-yellow-400 dark:border-yellow-600";
      case NOTIFICATION_TYPES.INFO:
      default:
        return "border-blue-400 dark:border-blue-600";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start p-3 rounded-md shadow-md border-l-4 ${getBorderColor(
            notification.type
          )} ${getBackgroundColor(notification.type)} animate-slide-in`}
        >
          <div className="flex-shrink-0 mr-3">{getIcon(notification.type)}</div>
          <div className="flex-1 mr-2">
            {notification.title && (
              <h4 className="font-semibold text-gray-800 dark:text-white">{notification.title}</h4>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-200">{notification.message}</p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;