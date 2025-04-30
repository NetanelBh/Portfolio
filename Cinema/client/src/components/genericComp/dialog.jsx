import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = ({ title, text, buttonsArray, open }) => {
    // buttonArray is an array of buttons objects. Each element contains button text and button onClick function.
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle >{title}</DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-slide-description">{text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {buttonsArray.map((buttonObj) => (
                        <Button key={buttonObj.text} onClick={buttonObj.onClick}>
                            {buttonObj.text}
                        </Button>
                    ))}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CustomDialog;
