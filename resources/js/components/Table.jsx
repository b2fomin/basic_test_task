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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Async } from 'react-async';
import { Pagination, PaginationItem } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import { Link } from 'react-router-dom';
import DeleteDialog from './Dialogs/DeleteDialog';
import UpdateDialog from './Dialogs/UpdateDialog';
import FilterDialog from './Dialogs/FilterDialog';
import CreateDialog from './Dialogs/CreateDialog';
import ShowDialog from './Dialogs/ShowDialog';
function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, data } =
    props;
    const col_names = Object.keys(data.length ? data[0] : {});

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
        return <TableCell
        align="center"
        padding="none"
        >
            {col_name}
        </TableCell>
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, model, data, query, setQuery } = props;

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
      <CreateDialog model={model}/>
      {numSelected > 0 ? (
            
            <DeleteDialog model="operations" data={data}/>
      ) : (
          <FilterDialog model={model} extQuery={query} setExtQuery={setQuery}/>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export const loadData = (perPage, page, model, query_string) => {
    let query = JSON.parse(query_string);
    query.page = page;
    query.per_page = perPage;
    query = Object.fromEntries(Object.entries(query).filter(([_, v]) => v !== "" && v!==null && v!==undefined));
    return axios.get(`/api/v1/${model}`, {params: query})
    .then(res => { 
        return res.status === 200 ? res.data.data : Promise.reject(res)})
};

export default function DataTable({perPage, page, model}) {
    let [selected, setSelected] = React.useState([]);
    const [query, setQuery] = React.useState({});
    let query_string = JSON.stringify(query);
    let query_string_memo = React.useMemo(() => JSON.stringify(query), [query]);
    let loadDataMemo = React.useMemo(() => 
      loadData(perPage, page, model, query_string_memo), [perPage, page, model, query_string_memo]);
    
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
    
  return <Async promiseFn={() => loadDataMemo}>
        {
            ({data, error, isLoading}) => {
                if (isLoading) return 'Loading...';
                if (error) return `Something went wrong: ${error.message}`;
                if (data) {
                    const pages_num = data.length ? data[0].pages_num : 0;
                    data.map((elem) => delete elem.pages_num);
                  
                    return (
                      <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                          <EnhancedTableToolbar numSelected={selected.length} model={model} data={selected} query={query} setQuery={setQuery} />
                          <TableContainer>
                            <Table
                              sx={{ minWidth: 750 }}
                              aria-labelledby="tableTitle"
                              size="medium"
                            >
                              {}
                              <EnhancedTableHead
                                numSelected={selected.length}
                                onSelectAllClick={(event) => handleSelectAllClick(event, data)}
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
                                      <TableCell><UpdateDialog data={row} model={model}/></TableCell>
                                      <TableCell><ShowDialog model={model} op_or_subop={row}/></TableCell>
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