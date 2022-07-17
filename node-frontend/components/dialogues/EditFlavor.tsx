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


export default function EditFlavorDialog( data: any ) {

  const [ flavor, setFlavor ] = useState({
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

  const updateFlavor = () => {
    let formData = new FormData();

    if (flavor.name != "") {
        formData.append('name', flavor.name);
    }
    if (flavor.description != "") {
        formData.append('description', flavor.description);
    }

    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: { }
    })
    api.patch(`/api/flavors/${data.data.id}`, formData)
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
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Flavor</DialogTitle>
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
          <Button onClick={updateFlavor}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
