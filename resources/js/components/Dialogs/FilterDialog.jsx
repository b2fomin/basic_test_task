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
import FilterListIcon from '@mui/icons-material/FilterList';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function FilterDialog({model, setExtQuery, extQuery}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState(extQuery);

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
      <Tooltip title="Filter" onClick={handleClickOpen}>
          <IconButton>
            <FilterListIcon/>
          </IconButton>
        </Tooltip>
      <Dialog
        autoFocus
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          }}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose filter
          </DialogContentText>
          <TextField
          autoFocus
            margin="dense"
            label="Name"
            id="filter_name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {setQuery({...extQuery, name: event.target.value})}}
            defaultValue={query.name}
          />
          <TextField
            margin="dense"
            label="Number"
            id="filter_number"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => {setQuery({...extQuery, number: Number(event.target.value)})}}
            defaultValue={query.number}

          />
          {model === 'sub_operations' ? <TextField
            label="Operation ID"
            id="filter_operation_id"
            variant="standard"
            defaultValue={query.operation_id}
            onChange={(event) => {setQuery({...extQuery, operation_id: event.target.value})}}
          /> : null}<br/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            id="filter_created_at_before"
            variant="standard"
            onChange={(event) => {setQuery({...extQuery, created_at_before: Date(event.$d)})}}
            defaultValue={query.created_at_before}
          /><br/>
          <DatePicker
          label="Created at after"
          id="filter_created_at_after"
          variant="standard"
          onChange={(event) => {setQuery({...extQuery, created_at_after: Date(event.$d)})}}
          defaultValue={query.created_at_after}
          /><br/>
        <DatePicker
            label="Updated at before"
            id="filter_updated_at_before"
            variant="standard"
            onChange={(event) => {setQuery({...extQuery, updated_at_before: Date(event.$d)})}}
            defaultValue={query.updated_at_before}
          /><br/>
          <DatePicker
            label="Updated at after"
            id="filter_updated_at_after"
            variant="standard"
            onChange={(event) => {setQuery({...extQuery, updated_at_after: Date(event.$d)})}}
            defaultValue={query.updated_at_after}
          /><br/>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setExtQuery(query);
          }}>Filter</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}