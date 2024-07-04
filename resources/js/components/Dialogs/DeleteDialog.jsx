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


export default function DeleteDialog({model, data}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (event, force_delete) => {
      event.preventDefault();      
      data.forEach(async (row) => {
        await axios.delete(`${(new URL(window.location.href)).origin}/api/v1/${model}`, {data: {id: row, force_delete: force_delete}})
        .then((res) => (res.status === 200 ? 
          window.location.href = `${(new URL(window.location.href)).origin}/${model}` 
          : Promise.reject(res)))
        })
  };
  return (
    <React.Fragment>
      <Tooltip title="Delete" onClick={handleClickOpen}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: {onSubmit}
          }}>
      
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How do you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={(event) => onSubmit(event, false)}>Soft Delete</Button>
          <Button type="submit" onClick={(event) => onSubmit(event, true)}>Force Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}