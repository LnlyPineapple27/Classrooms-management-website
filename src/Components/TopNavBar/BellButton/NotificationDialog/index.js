import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useMagicBellEvent, useNotifications } from "@magicbell/react-headless";
import NotificationItem from "./NotificationItem";
import './index.css'
const NotificationDialog = ({ open, close }) => {
  const store = useNotifications();

  useMagicBellEvent("notifications.new", (notification) => {
    console.log({ notification });
  });

  useMagicBellEvent("notifications.delete", (notification) => {
    console.log({ notification });
  });
  
  return (
    <Dialog
      style={{ zIndex: 1700 }}
      open={open}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <DialogTitle >
          {"Notifications"}
          {close ? (
            <IconButton
              aria-label="close"
              onClick={close}
              sx={{
                position: 'absolute',
                right: 4,
                top: 4,
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseIcon />
            </IconButton>) 
            : null
          }
        </DialogTitle>
        
        <DialogContent dividers>
          <header className="dialog-noti">
            <button  className="read-btn" onClick={() => store.markAllAsRead()}>
              Mark all as read
            </button>
            <p>
              {store.total} notifications / {store.unreadCount} unread
            </p>
          </header>
          <section>
            {store.notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </section>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDialog;
