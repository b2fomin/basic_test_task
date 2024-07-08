import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Outlet } from 'react-router-dom';


export default function UpdateDialog({model, row}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClose = (event) => {
    setOpen(false);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <React.Fragment>
      <Tooltip title="Update" onClick={handleClickOpen}>
          <IconButton>
            <EditIcon/>
          </IconButton>
        </Tooltip>
        <Outlet/>
      <Dialog
        autoFocus
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          }}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to update the item?
          </DialogContentText>
          <TextField
          autoFocus
            margin="dense"
            name="update_name"
            label="Name"
            id="update_name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={row.name}
          />
          {model === 'sub_operations' ? <TextField
            margin="dense"
            name="update_operation_id"
            label="Operation ID"
            id="update_operation_id"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={row.operation_id}
          /> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log(document.getElementById(toString(row.id)));
            let res = {};
            res.id = row.id;
            res.operation_id = document.getElementById('update_operation_id').value;                
            res.name = document.getElementById('update_name').value;
            
            await axios.patch(`${(new URL(window.location.href)).origin}/api/v1/${model}`, res)
            .then((res) => (res.status === 200 ? 
              setExtQuery(query)
              : Promise.reject(res)))
            }}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}