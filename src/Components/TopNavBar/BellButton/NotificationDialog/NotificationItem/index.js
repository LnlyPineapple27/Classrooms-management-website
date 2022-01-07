import { useNotification } from "@magicbell/react-headless";
import React from "react";
import NotificationState from "./NotificationState";

export default function NotificationItem({ notification: data }) {
    const notification = useNotification(data);

    const toggleRead = () => {
        if (notification.isRead) notification.markAsUnread();
        else notification.markAsRead();
    };

    const handleDelete = () => {
        notification.delete();
    };
    

    return (
        <article className="p-3 bg-gray-100 rounded mb-2 flex">
        <div className="text-center">
          <NotificationState isRead={notification.isRead} onClick={toggleRead} />
        </div>
        <div className="flex-1">
          <p className="mb-1">{notification.title}</p>
          <span style={{ opacity: 0.5 }}>
            {notification.sentAt?.format("ddd MMM, YYYY")}
          </span>
        </div>
        <div>
          <button className="delete-button p-2 rounded" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </article>
    );
}
