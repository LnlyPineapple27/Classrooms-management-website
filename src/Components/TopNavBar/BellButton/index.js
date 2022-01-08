import * as React from "react";
import {useBell } from "@magicbell/react-headless";
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import IconButton from '@mui/material/IconButton';
import NotificationDialog from './NotificationDialog'
const NotificationsBell = () => {
    const { unreadCount, markAllAsSeen } = useBell('unread');
    const [openNotificationDialog, setNotificationDialog] = React.useState(false);
    return (
        <div>
        <IconButton
            size="large"
            aria-label="Notification"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {
                markAllAsSeen();
                console.log("button pressed");
                setNotificationDialog(true);
            }}
            color="inherit">
            <Badge badgeContent={unreadCount} color="success">
                <NotificationsNoneIcon />
            </Badge>           
                   
        </IconButton>
        <NotificationDialog open={openNotificationDialog} close={() => setNotificationDialog(false)} />
        </div>
    );
  }

  export default NotificationsBell;