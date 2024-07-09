import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialogSlide({ openDialog, handleClose }) {
    return (
        <React.Fragment>
            <Dialog style={{ position: 'absolute' }}
                open={openDialog}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Archive All"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Do you want to archive all calls?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('cancel')}>Cancel</Button>
                    <Button onClick={() => handleClose('ok')}>Ok</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}