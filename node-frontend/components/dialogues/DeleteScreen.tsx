import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, IconButton, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { stringify } from 'querystring';
import { Description } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteScreenDialog(data: any) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteScreen = () => {

    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: { }
    })
    api.delete(`/api/screens/${data.data.id}`)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log('error creating screen', error)
    })
    
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Delete Screen</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete {data.data.name}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteScreen}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
