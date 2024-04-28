import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = ({ title, message, buttonTitle, openModal, onCancel }) => {
  const [open, setOpen] = useState(false);

  // Change the state only if openModal state changed(got new placed order)
  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  // Change the current state to false and also the openModal state to false
  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onreset}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {buttonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
