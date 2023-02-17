import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const columns = [
  { id: 'questionnumber', label: 'Q.No', minWidth: 80 },
  { id: 'questions', label: 'Questions', minWidth: 300 },
  { id: 'type', label: 'Type', minWidth: 100 },
  // { id: 'action', label: 'Action', minWidth: 100 },
];

function createData(questionnumber, questions, type, action) {
  return { questionnumber, questions, type, action };
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};


export default function QuestionsBank() {
  const navigate = useNavigate();

  const theme = useTheme();
  const [subjectName, setSubjectName] = React.useState([]);
  const [boardName, setBoardName] = React.useState([]);
  const [mediumName, setMediumName] = React.useState([]);
  const [gradeName, setGradeName] = React.useState([]);
  const [lessionName, setLessionName] = React.useState([]);
  const [token, setToken] = useState('');
  const [allBoards, setAllBoards] = useState([]);
  const [allMediums, setAllMediums] = useState([]);
  const [allGrades, setAllGrades] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allQuestion, setAllQuestion] = useState([])
  const [boardId, setBoardId] = useState("")
  const [mediumId, setMediumId] = useState("")
  const [gradeId, setGradeId] = useState("")
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")
  const [questionId, setQuestionId] = useState("")
  const [error, setError] = useState("")

  const handleBoardChange = (event) => {
    const {
      target: { value },
    } = event;
    setBoardName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleMediumChange = (event) => {
    const {
      target: { value },
    } = event;
    setMediumName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleGradeChange = (event) => {
    const {
      target: { value },
    } = event;
    setGradeName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleSubjectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSubjectName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleLessionChange = (event) => {
    const {
      target: { value },
    } = event;
    setLessionName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const tok = sessionStorage.getItem('token');
    if (tok !== null || tok !== undefined) {
      setToken(tok);
      getAllBoards(tok);
    }
  }, []);

  let no = 0;

  const getAllBoards = async (token) => {
    const h = {
      "Authorization": `Bearer ${token}`,
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

  const handleGetGrade = async (mediumId) => {
    console.log({ mediumId });
    const h = {
      "Authorization": `Bearer ${token}`,
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

  const handleGetSubjects = async (gId) => {
    const h = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN_NAME}edu/get-Subject-bygradeId/${gId}`,
        {
          headers: h,
        }
      );
      console.log(data);
      setAllSubjects(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getAllQuestion = async (chapId) => {
    const h = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const d = {
      BoardId: boardId,
      MediumId: mediumId,
      GradeId: gradeId,
      SubjectId: subject,
      ChapterId: chapId
    }
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_EXAM_DOMAIN_NAME}TEMExam/get-question-list`, d, { headers: h });
      console.log(data);
      setAllQuestion(data)
    } catch (error) {
      console.log(error);
    }
  }

  const questionsClick = () => {
    if (boardId === "" || mediumId === "" || gradeId === "" || subject === "" || chapter === "") {
      setError("Pleae Select required filed")
    } else {
      setError("")
      navigate('/dashboard/add-question', { state: { boardId, mediumId, gradeId, subject, chapter } });
    }
  };

  return (
    <>
      <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ paddingBottom: '15px' }}>
            Questions Bank{' '}
          </Typography>
          <Button variant="contained" onClick={questionsClick}>
            Add Question
          </Button>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ background: 'white', borderRadius: '13px', height: '100%', padding: '10px' }}>
              <FormControl sx={{ m: 1, width: 200, marginLeft: '15px', marginTop: '15px' }}>
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
              </FormControl>
              <FormControl sx={{ m: 1, width: 200, marginLeft: '15px', marginTop: '15px' }}>
                <InputLabel id="demo-simple-select-label">Medium</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Medium"
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
              <FormControl sx={{ m: 1, width: 200, marginLeft: '15px', marginTop: '15px' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="State"
                    onChange={(e) => {
                      setGradeId(e.target.value)
                      handleGetSubjects(e.target.value)
                    }}
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
              </FormControl>
              <FormControl sx={{ m: 1, width: 200, marginLeft: '15px', marginTop: '15px' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Subject </InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Subject "
                    onChange={(e) => {
                      setSubject(e.target.value)
                    }}
                  >
                    {allSubjects.map((subject, index) => {
                      console.log(subject)
                      return (
                        <MenuItem key={index} value={subject.id}>
                          {subject.subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </FormControl>
              <FormControl sx={{ m: 1, width: 200, marginLeft: '15px', marginTop: '15px' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Chapter </InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Chapter "
                    onChange={(e) => {
                      setChapter(e.target.value)
                      getAllQuestion(e.target.value)
                    }}
                  >
                    {allSubjects.map((subject, index) => {
                      return (
                        <MenuItem key={index} value={subject.id}>
                          {subject.subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </FormControl>
              {error.length > 0 && (
                <Typography sx={{ color: 'red' }} variant="p" gutterBottom>
                  {error}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <Box sx={{ background: 'white', borderRadius: '13px', height: '100%', padding: '10px' }}>
              <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '25px' }}>
                <TableContainer sx={{ maxHeight: 380 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allQuestion.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                        console.log(item)
                        no += 1;
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            <TableCell component="th" scope="row">
                              {no}
                            </TableCell>
                            <TableCell>{item.question}</TableCell>
                            <TableCell style={{ width: 160 }}>{item.answerType}</TableCell>
                            {/* <TableCell sx={{}}>
                              <Button sx={{ background: '#6c757d' }} variant="contained" onClick={questionsClick}>
                                <VisibilityIcon sx={{ marginRight: '5px' }} />
                                View{' '}
                              </Button>
                            </TableCell> */}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={allQuestion.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
