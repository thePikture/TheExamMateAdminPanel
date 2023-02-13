import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

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
import axios from 'axios';
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
  { id: 'stateName', label: 'State Name', alignRight: false },
  { id: 'boardName', label: 'Board Name', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  { id: '' },
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
    return filter(array, (_user) => _user.boardName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ExamBoard() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const [allField, setAllField] = useState('');
  const [token, setToken] = useState('');
  const [allStates, setAllStates] = useState([]);
  const [stateId, setStateId] = useState('');
  const [boardName, setBoardName] = useState('');
  const [allBoard, setAllBoard] = useState([]);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [stateDd, setStateDd] = useState('');
  const [stateUpdate, setStateUpdate] = useState('');
  const [boardNameUpdate, setBoardNameUpdate] = useState('');
  const [boardId, setBoardId] = useState("")

  const state = false;
  const district = false;
  const taluk = false;
  const school = false;
  const board = false;
  const grade = false;
  const search = false;
  const add = true;

  useEffect(() => {
    const tok = sessionStorage.getItem('token');
    if (tok !== null || tok !== undefined) {
      setToken(tok);
      getAllState(tok);
      getAllBoards(tok);
    }
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allBoard.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allBoard.length) : 0;

  const filteredUsers = applySortFilter(allBoard, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

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

  const addingBoard = async (e) => {
    e.preventDefault();
    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const d = {
      StateId: stateId,
      BoardName: boardName,
    };
    if (stateId === '' || boardName === ' ') {
      setAllField('Please fill all required fields');
    } else {
      setAllField('');
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN_NAME}edu/Save-Board`, d, { headers: h });
        console.log(data);
        if (data.result === 'Success') {
          setOpenModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAllBoards = async (token) => {
    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}edu/get-Board-all`, { headers: h });
      console.log(data);
      setAllBoard(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditModal = async (id) => {
    console.log({ id });
    setBoardId(id)
    setOpenModalUpdate(true);

    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}Edu/get-Board-details/${id}`, {
        headers: h,
      });
      console.log({ data });
      setBoardData(data);
      allStates.forEach((state) => {
        console.log(state.id)
        if (state.id === data.stateId) {
          setStateDd(state.id);
        }
      });
      setBoardNameUpdate(data.boardName);
    } catch (error) {
      console.log({ error });
    }
  };

  const updateBoard = async (e) => {
    e.preventDefault();
    console.log({ stateDd })

    const h = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const d = {
      "id": boardId,
      "stateId": stateDd,
      "boardName": boardNameUpdate,
    };
    if (boardNameUpdate !== "") {
      setAllField("")
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN_NAME}edu/Save-Board`, d, {
          headers: h,
        });
        console.log({ data });
        if (data.result === "Success") {
          setOpenModalUpdate(false)
          getAllBoards(token)
        }
      } catch (error) {
        console.log({ error });
      }
    } else {
      setAllField("Please fill all required fields")

    }

  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Board
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
          />
          {/* Add Modal */}
          <div>
            <Dialog fullWidth open={openModal} onClose={() => setOpenModal(false)}>
              <form onSubmit={addingBoard}>
                <DialogTitle>Board</DialogTitle>
                <DialogContent>
                  <Box sx={{ margin: '12px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">State</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="State"
                        onChange={(e) => setStateId(e.target.value)}
                      >
                        {allStates.map((state, index) => {
                          // console.log({ state });
                          return (
                            <MenuItem key={index} value={state.id}>
                              {' '}
                              {state.stateName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ margin: '12px' }}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Board"
                      variant="outlined"
                      onChange={(e) => setBoardName(e.target.value)}
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
          {/* Update Modal */}
          <div>
            <Dialog fullWidth open={openModalUpdate} onClose={() => setOpenModal(false)}>
              {console.log({ boardData })}
              <form onSubmit={updateBoard}>
                <DialogTitle>Board</DialogTitle>
                <DialogContent>
                  <Box sx={{ margin: '12px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">State</InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="State"
                        value={stateDd}
                        onChange={(e) => {
                          setStateDd(e.target.value);
                        }}
                      >
                        {allStates.map((state, index) => {
                          // console.log({ state });
                          // console.log(boardData?.stateId === state.id, state.stateId, boardData?.stateId, state.id);

                          return (
                            <MenuItem key={state?.id} value={state.id}>
                              {' '}
                              {state.stateName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ margin: '12px' }}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      // label="Board"
                      variant="outlined"
                      value={boardNameUpdate}
                      onChange={(e) => setBoardNameUpdate(e.target.value)}
                    />
                  </Box>
                  {allField.length > 0 && (
                    <Typography sx={{ color: 'red' }} variant="p" gutterBottom>
                      {allField}
                    </Typography>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenModalUpdate(false)}>Cancel</Button>
                  <Button type="submit">Update</Button>
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
                  rowCount={allBoard.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { id, stateId, stateName, boardName } = row;
                    const isItemSelected = selected.indexOf(state) !== -1;
                    return (
                      <TableRow
                        hover
                        key={index}
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
                        <TableCell align="left">{stateName}</TableCell>
                        <TableCell align="left">{boardName}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleEditModal(id)}
                            size="small"
                            sx={{ background: '#6c757d', marginRight: '4px' }}
                            variant="contained"
                          >
                            <EditIcon />{' '}
                          </Button>
                        </TableCell>
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
            count={allBoard.length}
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
