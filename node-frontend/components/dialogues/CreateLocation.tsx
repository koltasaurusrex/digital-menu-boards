import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { stringify } from 'querystring';
import { Description } from '@mui/icons-material';

export default function FormDialog() {

  const [ location, setLocation ] = useState({
    name: "",
    address: ""
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createLocation = () => {
    let formData = new FormData();
    formData.append('name', location.name);
    formData.append('address', location.address);
    formData.append('created_by', '1');
    formData.append('created_at', '');
    formData.append('modified_at', '');

    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: { }
    })
    console.log(formData);
    api.post('/api/locations/', formData)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log('error creating location', error)
    })
    
    handleClose();
  };

  const handleChange = (event: any) => {
    setLocation({
      ...location,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Location
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create Location</DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus
            margin="dense"
            name="name"
            onChange={handleChange}
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            required={true}
          />
          <TextField 
            autoFocus
            margin="dense"
            name="address"
            onChange={handleChange}
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            required={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createLocation}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
