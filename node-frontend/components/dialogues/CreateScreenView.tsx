import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, MenuItem, Select, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { stringify } from 'querystring';
import { Description } from '@mui/icons-material';
import { Flavor, Screen } from '../../types';

export default function FormDialog() {

  const [ screen_view, setScreenView ] = useState({
    name: "",
    screen: ""
  });

  const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: { }
  })

  const [ options, setOptions ] = useState([]);
  const [ flavorOptions, setFlavorOptions ] = useState<Flavor[]>([]);
  const [ flavors, setFlavors ] = useState<Flavor[]>([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    getOptions();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createScreenView = () => {
    let formData = new FormData();
    formData.append('name', screen_view.name);
    formData.append('flavor_id', `[${flavors}]`);
    formData.append('created_at', '');
    formData.append('modified_at', '');
    formData.append('screen', screen_view.screen);
    formData.append('created_by', '1');

    
    console.log(formData);
    api.post('/api/screen_views/', formData)
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

  const handleFlavorChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setFlavors(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  function getOptions() {
    api.get('/api/screens/').then(res => {
        setOptions(res.data as [])
    })
    api.get('/api/flavors/').then(res => {
      setFlavorOptions(res.data as [])
  })
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create ScreenView
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create ScreenView</DialogTitle>
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
            name="screen"
            onChange={handleChange}
            label="Screen"
            type="text"
            fullWidth
            variant="standard"
            required={true}
          > 
            {options.map((row: Screen) => (
                    <MenuItem value={row.id}>
                      {row.name}
                    </MenuItem>
                  ))}
          </Select>
          <Select 
            autoFocus
            margin="dense"
            name="flavors"
            value={flavors}
            onChange={handleFlavorChange}
            label="Flavors"
            type="text"
            fullWidth
            multiple
            variant="standard"
            required={true}
          > 
            {flavorOptions.map((row: Flavor) => (
                    <MenuItem value={row.id}>
                      {row.name}
                    </MenuItem>
                  ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createScreenView}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
