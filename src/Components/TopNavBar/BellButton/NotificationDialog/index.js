import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const NotificationDialog = ({ open, close }) => {

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
            {/* <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setDialog2Open(true);
              }}
            >
              Open Dialog 2
            </Button> */}
            <p>Hi there</p>
          </DialogContent>
      </Dialog>
    );
};

export default NotificationDialog;
