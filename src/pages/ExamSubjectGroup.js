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
  { id: 'boardName', label: 'Board Name', alignRight: false },
  { id: 'mediumName', label: 'Medium Name', alignRight: false },
  { id: 'grade', label: 'Grade', alignRight: false },
  { id: 'subjectGroup', label: 'Subject Group', alignRight: false },
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
    return filter(array, (_user) => _user.subjectGroup.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ExamSubjectGroup() {
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
  const [allGrades, setAllGrades] = useState([]);
  const [allSubjectGroups, setAllSubjectGroups] = useState([]);
  const [boardId, setBoardId] = useState("")
  const [mediumId, setMediumId] = useState("")
  const [gradeId, setGradeId] = useState("")
  const [subjectGroup, setSubjectGroups] = useState("")
  const [allField, setAllField] = useState("")

  const state = false;
  const district = false;
  const taluk = false;
  const school = false;
  const board = true;
  const medium = true;
  const grade = true;
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
      const newSelecteds = allGrades.map((n) => n.subjectGroup);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allGrades.length) : 0;

  const filteredUsers = applySortFilter(allSubjectGroups, getComparator(order, orderBy), filterName);

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
    const h = {
      Authorization: `Bearer ${token}`,
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

  const handleGetGrade = async (mediumId) => {
    console.log({ mediumId });
    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}edu/get-grade-bymediumId/${mediumId}`, {
        headers: h,
      });
      console.log(data);
      setAllGrades(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleGetSubjectGroup = async (gradeId) => {
    console.log({ gradeId });
    const h = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN_NAME}edu/get-SubjectGroup-bygradeId/${gradeId}`,
        {
          headers: h,
        }
      );
      console.log(data);
      setAllSubjectGroups(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const addingSubjectGroup = async (e) => {
    e.preventDefault()
    const h = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    const d = {
      BoardId: boardId,
      MediumId: mediumId,
      GradeId: gradeId,
      SubjectGroup: subjectGroup
    }
    if (boardId === "" || mediumId === "" || gradeId === "" || subjectGroup === "") {
      setAllField("Please fill all required fields")
    } else {
      setAllField("")
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN_NAME}edu/Save-SubjectGroup`, d, { headers: h })
        console.log(data)
        if (data.result === "Success") {
          setOpenModal(false)
          handleGetSubjectGroup(gradeId)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Subject Group
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
            medium={medium}
            board={board}
            grade={grade}
            search={search}
            add={add}
            openModal={openModal}
            handleModal={handleModal}
            allStates={allStates}
            handleBoards={handleBoards}
            allBoards={allBoards}
            allMediums={allMediums}
            handleGetGrade={handleGetGrade}
            allGrades={allGrades}
            handleGetSubjectGroup={handleGetSubjectGroup}
          />

          <div>
            <Dialog fullWidth open={openModal} onClose={() => setOpenModal(false)}>
              <form onSubmit={addingSubjectGroup}>
                <DialogTitle>Grade</DialogTitle>
                <DialogContent>
                  <Box sx={{ margin: '12px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Board</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" label="State"
                        onChange={(e) => {
                          setBoardId(e.target.value)
                          handleBoards(e.target.value)
                        }}
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Medium</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" label="State"
                        onChange={(e) => {
                          setMediumId(e.target.value)
                          handleGetGrade(e.target.value)
                        }}
                      >
                        {allMediums.map((medium, index) => {
                          return (
                            <MenuItem key={index} value={medium.id}>
                              {medium.mediumName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ margin: '12px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" label="State"
                        onChange={(e) => setGradeId(e.target.value)}
                      >
                        {allGrades.map((grade, index) => {
                          return (
                            <MenuItem key={index} value={grade.id}>
                              {grade.grade}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ margin: '12px' }}>
                    <TextField fullWidth id="outlined-basic" label="Subject Group" variant="outlined"
                      onChange={(e) => setSubjectGroups(e.target.value)}
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

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={allSubjectGroups.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    console.log({ row });
                    const { id, boardName, mediumName, grade, subjectGroup } = row;
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
                        <TableCell align="left">{boardName}</TableCell>
                        <TableCell align="left">{mediumName}</TableCell>
                        <TableCell align="left">{grade}</TableCell>
                        <TableCell align="left">{subjectGroup}</TableCell>
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
            count={allSubjectGroups.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page >
  );
}
