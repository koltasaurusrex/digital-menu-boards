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
import EditIcon from '@mui/icons-material/Edit';


export default function EditScreenViewDialog( data: any ) {

  const [ screen_view, setScreenView ] = useState({
    name: "",
    description: ""
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateScreenView = () => {
    let formData = new FormData();

    if (screen_view.name != "") {
        formData.append('name', screen_view.name);
    }
    if (screen_view.description != "") {
        formData.append('description', screen_view.description);
    }

    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: { }
    })
    api.patch(`/api/screen_views/${data.data.id}`, formData)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log('error creating screen_view', error)
    })
    
    handleClose();
  };

  const handleChange = (event: any) => {
    setScreenView({
      ...screen_view,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit ScreenView</DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus
            margin="dense"
            name="name"
            onChange={handleChange}
            label="Name"
            type="text"
            defaultValue={data.data.name}
            fullWidth
            variant="standard"
            required={true}
          />
          <TextField 
            autoFocus
            margin="dense"
            name="description"
            onChange={handleChange}
            label="Description"
            type="text"
            defaultValue={data.data.description}
            fullWidth
            variant="standard"
            required={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateScreenView}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
