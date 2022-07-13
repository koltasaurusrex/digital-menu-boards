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

  const [ flavor, setFlavor ] = useState({
    name: "Fred",
    description: "George"
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createFlavor = () => {

    let formData = new FormData();
    formData.append('name', flavor.name);
    formData.append('description', flavor.description);

    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: { }
    })
    console.log(formData);
    api.post('/flavors/', formData)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log('error creating flavor', error)
    })
    
    handleClose();
  };

  const handleChange = (event: any) => {
    setFlavor({
      ...flavor,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Flavor
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create Flavor</DialogTitle>
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
            name="description"
            onChange={handleChange}
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            required={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createFlavor}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
