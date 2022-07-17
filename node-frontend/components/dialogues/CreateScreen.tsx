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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Location } from '../../types';

export default function FormDialog() {

  const [ screen, setScreen ] = useState({
    name: "",
    location: ""
  });

  const [ options, setOptions ] = useState([]);


  const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: { }
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    getLocations();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createScreen = () => {
    let formData = new FormData();
    formData.append('name', screen.name);
    formData.append('location', screen.location);
    formData.append('created_by', '1');
    formData.append('created_at', '');
    formData.append('modified_at', '');

    console.log(formData);
    api.post('/api/screens/', formData)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log('error creating screen', error)
    })
    
    handleClose();
  };

  const handleChange = (event: any) => {
    setScreen({
      ...screen,
      [event.target.name]: event.target.value,
    });
  };

  function getLocations() {
    api.get('/api/locations/').then(res => {
        setOptions(res.data as [])
    })
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Screen
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create Screen</DialogTitle>
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
          <Select 
            autoFocus
            margin="dense"
            name="location"
            onChange={handleChange}
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            required={true}
          > 
            {options.map((row: Location) => (
                    <MenuItem value={row.id}>
                      {row.name}
                    </MenuItem>
                  ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createScreen}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
