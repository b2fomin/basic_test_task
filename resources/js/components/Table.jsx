import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Async } from 'react-async';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import { Link } from 'react-router-dom';
import DeleteDialog from './Dialogs/DeleteDialog';
import UpdateDialog from './Dialogs/UpdateDialog';
import $ from 'jquery';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, onRequestSort, rowCount, data } =
    props;
    const col_names = Object.keys(data[0]);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {col_names.map((col_name) => {
        let row = data[0];
        return <TableCell
        key={row.id}
        align="center"
        padding="none"
        sortDirection={orderBy === row.id ? order : false}
        >
        <TableSortLabel
            active={orderBy === row.id}
            direction={orderBy === row.id ? order : 'asc'}
            onClick={createSortHandler(row.id)}
        >
            {col_name}
            {orderBy === row.id ? (
            <Box component="span">
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
            ) : null}
        </TableSortLabel>
        </TableCell>
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, model, data } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {model}
        </Typography>
      )}

      {numSelected > 0 ? (
            
            <DeleteDialog model="operations" data={data}/>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
const loadData = (perPage, page, model) => {
    return axios.get(`/api/v1/${model}?page=${page}&per_page=${perPage}`)
    .then(res => {        
        return res.status === 200 ? res : Promise.reject(res)})
};

export default function DataTable({perPage, page, model}) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    let [selected, setSelected] = React.useState([]);
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const handleSelectAllClick = (event, data) => {
        if (event.target.checked) {
        const newSelected = data.map((n) => n.id);
        setSelected(newSelected);
        event.stopPropagation();
        return;
        }
        setSelected([]);
        event.stopPropagation();
    };
    
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }
        setSelected(newSelected);
        event.stopPropagation();
    };
        
    const isSelected = (id) => selected.indexOf(id) !== -1;
    
    // Avoid a layout jump when reaching the last page with empty rows.
    
  return <Async promiseFn={() => loadData(perPage, page, model)}>
        {
            ({data, error, isLoading}) => {
                if (isLoading) return 'Loading...';
                if (error) return `Something went wrong: ${error.message}`;
                if (data) {
                    data = data.data.data;
                    const pages_num = data[0].pages_num;
                    data.map((elem) => delete elem.pages_num);
                  
                    return (
                      <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                          <EnhancedTableToolbar numSelected={selected.length} model={model} data={selected} />
                          <TableContainer>
                            <Table
                              sx={{ minWidth: 750 }}
                              aria-labelledby="tableTitle"
                              size="medium"
                            >
                              <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={(event) => handleSelectAllClick(event, data)}
                                onRequestSort={handleRequestSort}
                                rowCount={perPage}
                                data={data}
                              />
                              <TableBody>
                                {data.map((row, index) => {
                                  const isItemSelected = isSelected(row.id);
                                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                                  return (
                                    <TableRow
                                      hover
                                      id={toString(row.id)}
                                      onClick={(event) => handleClick(event, row.id)}
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.id}
                                      selected={isItemSelected}
                                      sx={{ cursor: 'pointer' }}
                                    >
                                      <TableCell padding="checkbox">
                                        <Checkbox
                                          color="primary"
                                          checked={isItemSelected}
                                          inputProps={{
                                            'aria-labelledby': labelId,
                                          }}
                                        />
                                      </TableCell>
                                      {Object.keys(row).map((key) => (<TableCell align="center">{row[key]}</TableCell>))} 
                                      <TableCell><UpdateDialog data={[row]} model={model}/></TableCell>
                                    </TableRow>
                                  );
                                })}
                                
                              </TableBody>
                              <TableFooter>
                                <TableCell></TableCell>
                              <Pagination
                                page={page}
                                count={pages_num}
                                renderItem={(item) => (
                                <PaginationItem
                                component={Link}
                                to={`${(new URL(window.location.href)).origin}/${model}?page=${item.page}&per_page=${perPage}`}
                                {...item}
                                />
                              )}/>
                              </TableFooter>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </Box>
                    );
                }
            }
        }       
    </Async>
}