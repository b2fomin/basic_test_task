import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';


export default function CreateDialog({model}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Create" onClick={handleClickOpen}>
          <IconButton>
            <AddIcon/>
          </IconButton>
        </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            await axios.post(`${(new URL(window.location.href)).origin}/api/v1/${model}`, {
                name: formJson.create_name, 
                operation_id: formJson.create_operation_id})
            .then((res) => (res.status === 200 ? 
            window.location.href = `${(new URL(window.location.href)).origin}/${model}` 
            : Promise.reject(res)))
          }}}>
      
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to create an item?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="create_name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          {model === 'sub_operations' ? <TextField
            autoFocus
            required
            margin="dense"
            name="create_operation_id"
            label="Operation ID"
            type="text"
            fullWidth
            variant="standard"
          /> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button type="submit">Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}