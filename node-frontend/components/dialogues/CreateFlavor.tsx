import * as React from 'react';
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

export default function FormDialog() {
  var name = '';
 

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createFlavor = () => {
    var data = {
      name: name
    }
    const api = axios.create({
      baseURL: 'http://localhost:5555',
      headers: { }
    })

    api.post('/flavors', JSON.stringify(data))
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log('error creating flavor',error)
    })
    
    handleClose();
  };

  const handleChange = (event: any) => {
      name = event.target.value;
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
            id="name"
            onChange={handleChange}
            label="Name"
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
