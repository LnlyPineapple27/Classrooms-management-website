import { useNotification } from "@magicbell/react-headless";
import React from "react";
import NotificationState from "./NotificationState";
import './index.css'
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
        <article className="noti-item">
        <div className="read-unread-button">
          <NotificationState isRead={notification.isRead} onClick={toggleRead} />
        </div>
        <div className="noti-data">
          <h3 className="noti-title">{notification.title}</h3>
          <p className="noti-body">{notification.content}</p>
          <span style={{ opacity: 0.5 }}>
            {notification.sentAt?.format("ddd MMM, YYYY")}
          </span>
        </div>
        <div>
          <button className="noti-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </article>
    );
}
