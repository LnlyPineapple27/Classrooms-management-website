import * as React from "react";
import {useBell } from "@magicbell/react-headless";
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import IconButton from '@mui/material/IconButton';
const NotificationsBell = () => {
    const { unreadCount, markAllAsSeen } = useBell('unread');
    return (
      <IconButton
        size="large"
        aria-label="Notification"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => {
            markAllAsSeen();
            console.log("button pressed");}}
        color="inherit"
        >
          <Badge badgeContent={unreadCount} color="secondary">
            <NotificationsNoneIcon />
          </Badge>                 
      </IconButton>
    );
  }

  export default NotificationsBell;