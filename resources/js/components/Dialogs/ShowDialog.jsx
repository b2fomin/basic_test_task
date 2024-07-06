import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import { loadData } from '../Table';

export default function ShowDialog({model, op_or_subop}) {
    const [open, setOpen] = React.useState(false);
    const [sub_operations_names, setSubOperationsNames] = React.useState([]);
    const [operation_name, setOperationName] = React.useState("");
    const func = React.useCallback(async () => {
        let operation_name, sub_operations_names;
        if(model === 'operations') {
            operation_name = await op_or_subop.name;
            let sub_operations = await loadData(10, 1, 'sub_operations', JSON.stringify({operation_id: op_or_subop.id}));
            sub_operations_names = await sub_operations.map((sub_operation) => (sub_operation.name));
        }
        else {
            let operation = await loadData(1, 1, 'operations', JSON.stringify({id: op_or_subop.operation_id}));
            operation_name = await operation.name;
            let sub_operations = await loadData(10, 1, 'sub_operations', JSON.stringify({operation_id: operation.id}));
            sub_operations_names = await sub_operations.map((sub_operation) => (sub_operation.name));
        }
        setOperationName(operation_name);
        setSubOperationsNames(sub_operations_names);
    }, [op_or_subop]);
    const handleClickOpen = (event) => {
      setOpen(true);
      func();
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
        <Tooltip title="Show" onClick={handleClickOpen}>
            <IconButton>
              <VisibilityIcon/>
            </IconButton>
          </Tooltip>
          <Dialog
          autoFocus
          open={open}
          onClose={handleClose}
          PaperProps={{
          component: 'form',
          }}>
              <Card sx={{ minWidth: 275 }}>
              <CardContent>
                  <Typography>
                      Operation: {operation_name}<br/>
                      SubOperations:
                  </Typography>
                  <ul>
                  {sub_operations_names.map((name) => <><li>{name}</li></>)}
                  </ul>
              </CardContent>
              </Card>
          </Dialog>
       </React.Fragment>
    );
}
  