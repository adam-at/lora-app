import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function QuickDeleteConfirmationDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmation = () => {
    setOpen(false);
    props.fun(props.id);
  }


  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete {props.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this {props.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmation}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default QuickDeleteConfirmationDialog;