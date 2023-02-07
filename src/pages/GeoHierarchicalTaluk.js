import axios from 'axios';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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
  { id: 'talukCode', label: 'Taluk Code', alignRight: false },
  { id: 'talukName', label: 'Taluk Name', alignRight: false },
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
    return filter(array, (_user) => _user.districtName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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
  const [token, setToken] = useState('');
  const [allStates, setAllStates] = useState([]);

  const [allDistricts, setAllDistricts] = useState([]);
  const [allField, setAllField] = useState('');
  const [stateId, setStateId] = useState('');
  const [districtCode, setDistrictsCode] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');

  const state = true;
  const district = true;
  const taluk = false;
  const school = false;
  const board = false;
  const grade = false;
  const search = false;
  const add = true;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allDistricts.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allDistricts.length) : 0;

  const filteredUsers = applySortFilter(allDistricts, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  useEffect(() => {
    const tok = sessionStorage.getItem('token');
    if (tok !== null || tok !== undefined) {
      setToken(tok);
      getAllState(tok);
    }
  }, []);

  const getAllState = async (token) => {
    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}Geo/get-State-all`, { headers: h });
      console.log(data);
      setAllStates(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (stateId) => {
    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}Geo/get-District-bystateId/${stateId}`, {
        headers: h,
      });
      console.log(data);
      // setAllStates(data)
      setAllDistricts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchTaluk = async (districtId) => {
    console.log(districtId);
  };

  const addingDistrict = async (e) => {
    e.preventDefault();
    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const d = {
      StateId: stateId,
      DistrictCode: districtCode,
      DistrictName: districtName,
    };
    if (stateId === '' || districtCode === '' || districtName === '') {
      setAllField('Please fill all required fields');
    } else {
      setAllField('');
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN_NAME}Geo/save-District`, d, { headers: h });
        console.log(data);
        if (data.result === 'Success') {
          setOpenModal(false);
          handleSearch(stateId);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Taluk
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
            allStates={allStates}
            handleSearch={handleSearch}
            allDistricts={allDistricts}
            handleSearchTaluk={handleSearchTaluk}
          />

          <div>
            <Dialog fullWidth open={openModal} onClose={() => setOpenModal(false)}>
              <form onSubmit={addingDistrict}>
                <DialogContent>
                  <DialogTitle>District</DialogTitle>
                  <Box sx={{ margin: '12px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">State</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="State"
                        onChange={(e) => setStateId(e.target.value)}
                      >
                        {allStates.map((item) => {
                          return <MenuItem value={item.stateId}>{item.stateName}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ margin: '12px' }}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="District Code"
                      variant="outlined"
                      onChange={(e) => setDistrictsCode(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ margin: '12px' }}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="District Name"
                      variant="outlined"
                      onChange={(e) => setDistrictName(e.target.value)}
                    />
                  </Box>
                  {allField.length > 0 && (
                    <Typography sx={{ color: 'red' }} variant="p" gutterBottom>
                      {allField}
                    </Typography>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                  <Button type="submit">Add</Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={allDistricts.length}
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
            count={allDistricts.length}
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
