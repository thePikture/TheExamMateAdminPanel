import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  TextField,
  FormControl,
  Input,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';

// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'stateId', label: 'State Id', alignRight: false },
  { id: 'stateCode', label: 'State Code', alignRight: false },
  { id: 'stateName', label: 'State Name', alignRight: false },
  { id: 'districtCode', label: 'District Code', alignRight: false },
  { id: 'districtName', label: 'District Name', alignRight: false },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Student() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);

  const state = true;
  const district = false;
  const taluk = false;
  const school = false;
  const board = false;
  const grade = false;
  const search = true;
  const add = true;

  function createData(stateId, stateCode, stateName, districtCode, districtName) {
    return { stateId, stateCode, stateName, districtCode, districtName };
  }
  const rows = [
    createData('1', 'IN', 'India', 'IN', 'India'),
    createData('1', 'CN', 'China', 'IN', 'India'),
    createData('1', 'IT', 'Italy', 'IN', 'India'),
    createData('1', 'US', 'United States', 'IN', 'India'),
    createData('1', 'CA', 'Canada', 'IN', 'India'),
    createData('1', 'AU', 'Australia', 'IN', 'India'),
    createData('1', 'DE', 'Germany', 'IN', 'India'),
    createData('1', 'IE', 'Ireland', 'IN', 'India'),
    createData('1', 'MX', 'Mexico', 'IN', 'India'),
    createData('1', 'JP', 'Japan', 'IN', 'India'),
    createData('1', 'FR', 'France', 'IN', 'India'),
    createData('1', 'GB', 'United Kingdom', 'IN', 'India'),
    createData('1', 'RU', 'Russia', 'IN', 'India'),
    createData('1', 'NG', 'Nigeria', 'IN', 'India'),
    createData('1', 'BR', 'Brazil', 'IN', 'India'),
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const filteredUsers = applySortFilter(rows, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Districts
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            state={state}
            district={district}
            taluk={taluk}
            school={school}
            board={board}
            grade={grade}
            search={search}
            add={add}
            openModal={openModal}
            handleModal={handleModal}
          />

          <div>
            <Dialog fullWidth open={openModal} onClose={() => setOpenModal(false)}>
              <DialogTitle>District</DialogTitle>
              <DialogContent>
                <Box sx={{ margin: '12px' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="State">
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ margin: '12px' }}>
                  <TextField fullWidth id="outlined-basic" label="District Code" variant="outlined" />
                </Box>
                <Box sx={{ margin: '12px' }}>
                  <TextField fullWidth id="outlined-basic" label="District Name" variant="outlined" />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                <Button onClick={() => setOpenModal(false)}>Add</Button>
              </DialogActions>
            </Dialog>
          </div>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { stateId, stateCode, stateName, districtCode, districtName } = row;
                    const isItemSelected = selected.indexOf(state) !== -1;
                    return (
                      <TableRow
                        hover
                        key={stateId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} /> */}
                        </TableCell>
                        {/* <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {id}
                            </Typography>
                          </Stack>
                        </TableCell> */}
                        <TableCell align="left">{stateId}</TableCell>
                        <TableCell align="left">{stateCode}</TableCell>
                        <TableCell align="left">{stateName}</TableCell>
                        <TableCell align="left">{districtCode}</TableCell>
                        <TableCell align="left">{districtName}</TableCell>
                        {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
