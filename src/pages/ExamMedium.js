import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import EditIcon from '@mui/icons-material/Edit';

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
  { id: 'boardId', label: 'Board Id', alignRight: false },
  { id: 'boardName', label: 'Board Name', alignRight: false },
  { id: 'mediumName', label: 'Medium Name', alignRight: false },
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
    return filter(array, (_user) => _user.mediumName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ExamMedium() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState('');
  const [allStates, setAllStates] = useState([]);
  const [allBoards, setAllBoards] = useState([]);
  const [allMediums, setAllMediums] = useState([]);
  const [boardId, setBoardId] = useState("")
  const [mediumName, setMediumName] = useState("")
  const [allField, setAllField] = useState("")
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [mediumId, setMediumId] = useState("")
  const [updateBoardId, setUpdateBoardId] = useState("")
  const [updateMediumName, setUpdateMediumName] = useState("")
  const [dropdownBoardId, setDropdownBoardId] = useState("")

  const state = false;
  const district = false;
  const taluk = false;
  const school = false;
  const board = true;
  const grade = false;
  const search = false;
  const add = true;

  useEffect(() => {
    const tok = sessionStorage.getItem('token');
    if (tok !== null || tok !== undefined) {
      setToken(tok);
      //   getAllState(tok);
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
      const newSelecteds = allMediums.map((n) => n.mediumName);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allMediums.length) : 0;

  const filteredUsers = applySortFilter(allMediums, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const getAllBoards = async (token) => {
    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}edu/get-Board-all`, { headers: h });
      console.log(data);
      setAllBoards(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBoards = async (boardId) => {
    console.log({ boardId });
    setDropdownBoardId(boardId)
    const h = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}edu/get-Medium-byboardId/${boardId}`, {
        headers: h,
      });
      console.log(data);
      setAllMediums(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const addingMedium = async (e) => {
    e.preventDefault()
    const h = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    const d = {
      BoardId: boardId,
      MediumName: mediumName
    }
    if (boardId === "" || mediumName === "") {
      setAllField("Please fill all required fields")
    } else {
      setAllField("")
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN_NAME}edu/Save-Medium`, d, { headers: h })
        console.log(data)
        if (data.result === "Success") {
          setOpenModal(false)
          handleBoards(boardId)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleEditModal = async (id) => {
    console.log({ id });
    setMediumId(id)
    setOpenModalUpdate(true);

    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}Edu/get-Medium-details/${id}`, {
        headers: h,
      });
      console.log({ data });
      setUpdateBoardId(data.boardId)
      setUpdateMediumName(data.mediumName)
    } catch (error) {
      console.log({ error });
    }
  };

  const handleUpdateMedium = async (e) => {
    e.preventDefault()
    const h = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const d = {
      "id": mediumId,
      'BoardId': updateBoardId,
      "MediumName": updateMediumName

    }
    if (updateMediumName !== "") {
      setAllField("")
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN_NAME}edu/Save-Medium`, d, {
          headers: h,
        });
        console.log({ data });
        if (data.result === "Success") {
          setOpenModalUpdate(false)
          handleBoards(updateBoardId)
        }

      } catch (error) {
        console.log({ error });
      }
    } else {
      setAllField("Please fill all required fields")

    }

  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Medium
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
            handleBoards={handleBoards}
            allBoards={allBoards}
            dropdownBoardId={dropdownBoardId}
          />

          <div>
            <Dialog fullWidth open={openModal}>
              <form onSubmit={addingMedium}>
                <DialogTitle>Medium</DialogTitle>
                <DialogContent>
                  <Box sx={{ margin: '12px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Board</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" label="State"
                        onChange={(e) => setBoardId(e.target.value)}
                      >
                        {allBoards.map((board, index) => {
                          return (
                            <MenuItem key={index} value={board.id}>
                              {board.boardName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ margin: '12px' }}>
                    <TextField fullWidth id="outlined-basic" label="Medium" variant="outlined"
                      onChange={(e) => setMediumName(e.target.value)}
                    />
                  </Box>
                  {allField.length > 0 && <Typography sx={{ color: 'red' }} variant="p" gutterBottom>
                    {allField}
                  </Typography>}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                  <Button type='submit'>Add</Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>

          {/* Update Modal */}
          <div>
            <Dialog fullWidth open={openModalUpdate} onClose={() => setOpenModal(false)}>

              <form onSubmit={handleUpdateMedium}>
                <DialogTitle>Board</DialogTitle>
                <DialogContent>
                  <Box sx={{ margin: '12px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Board</InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="State"
                        value={updateBoardId}
                        onChange={(e) => {
                          setUpdateBoardId(e.target.value);
                        }}
                      >
                        {allBoards.map((board, index) => {


                          return (
                            <MenuItem key={board?.id} value={board?.id}>
                              {' '}
                              {board?.boardName}
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
                      value={updateMediumName}
                      onChange={(e) => setUpdateMediumName(e.target.value)}
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
                  rowCount={allMediums.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    console.log({ row });
                    const { id, boardId, boardName, mediumName } = row;
                    const isItemSelected = selected.indexOf(state) !== -1;
                    return (
                      <TableRow
                        hover
                        key={id}
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
                        <TableCell align="left">{boardId}</TableCell>
                        <TableCell align="left">{boardName}</TableCell>
                        <TableCell align="left">{mediumName}</TableCell>
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
            count={allMediums.length}
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
