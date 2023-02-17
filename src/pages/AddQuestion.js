import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    OutlinedInput,
    InputAdornment,
    Stack,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    TextareaAutosize,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
    const [token, setToken] = useState("")
    const [boardId, setBoardId] = useState("")
    const [mediumId, setMediumId] = useState("")
    const [gradeId, setGradeId] = useState("")
    const [subject, setSubject] = useState("")
    const [chapter, setChapter] = useState("")
    const [questionType, setQuestionType] = useState("")
    const [displayType, setDisplayType] = useState("")
    const [question, setQuestion] = useState("")
    const [questionImageWeb, setQuestionImageWeb] = useState("")
    const [questionImageTab, setQuestionImageTab] = useState("")
    const [questionImageMobile, setQuestionImageMobile] = useState("")
    const [answerA, setAnswerA] = useState("")
    const [answerB, setAnswerB] = useState("")
    const [answerC, setAnswerC] = useState("")
    const [answerD, setAnswerD] = useState("")
    const [questionCategory, setQuestionCategory] = useState("")
    const [answerType, setAnswerType] = useState("")
    const [answer, setAnswer] = useState("")
    const [notes, setNotes] = useState("")
    const [displayTypeTextShow, setDisplayTypeTextShow] = useState(false)
    const [displayTypeImageShow, setDisplayTypeImageShow] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const location = useLocation()

    useEffect(() => {
        const tok = sessionStorage.getItem('token');
        if (tok !== null || tok !== undefined) {
            setToken(tok);
        }
        if (location !== null || location !== undefined) {
            setBoardId(location.state.boardId)
            setMediumId(location.state.mediumId)
            setGradeId(location.state.mediumId)
            setSubject(location.state.subject)
            setChapter(location.state.chapter)
        }
    }, []);

    const onChangeDisplayType = (e) => {
        setDisplayType(e.target.value)
        if (e.target.value === "text") {
            setDisplayTypeTextShow(true)
            setDisplayTypeImageShow(false)
        } else {
            setDisplayTypeTextShow(false)
            setDisplayTypeImageShow(true)
        }
    }


    const addingQuestion = async (e) => {
        e.preventDefault()
        const h = {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        const formData1 = new FormData()
        formData1.append("file", questionImageWeb)
        const formData2 = new FormData()
        formData2.append("file", questionImageTab)
        const formData3 = new FormData()
        formData3.append("file", questionImageMobile)
        const d = {
            BoardId: boardId,
            MediumId: mediumId,
            GradeId: gradeId,
            SubjectId: subject,
            ChapterId: chapter,
            QuestionType: questionType,
            DisplayType: displayType,
            Question: question,
            QuestionImageWeb: questionImageWeb,
            QuestionImageTab: questionImageTab,
            QuestionImageMobile: questionImageMobile,
            AnswerA: answerA,
            AnswerB: answerB,
            AnswerC: answerC,
            AnswerD: answerD,
            QuestionCategory: questionCategory,
            AnswerType: answerType
        }
        try {
            console.log()
            const { data } = await axios.post(`${process.env.REACT_APP_EXAM_DOMAIN_NAME}TEMExam/Save-Questions`, d, { headers: h })
            console.log(data)
            addingAnswer(data.result.id)
            console.log(data.errorMsgs[0])
            setError(data.errorMsgs[0])
        } catch (error) {
            console.log(error)
        }
    }

    const addingAnswer = async (id) => {
        console.log(id)
        const h = {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        const d = {
            QuestionId: id,
            Answer: answer,
            Notes: notes
        }
        console.log(d)
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_EXAM_DOMAIN_NAME}TEMExam/Save-Question-Answer`, d, { headers: h })
            console.log(data)
            setError(data.errorMsgs[0])
            if (data.result === "Success") {
                navigate("/dashboard/question-bank")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Box sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
                <Typography variant='h4' sx={{ paddingBottom: "15px" }}>
                    Adding Question</Typography>
                <Box sx={{ background: "white", borderRadius: "10px", padding: "15px" }}>
                    <form onSubmit={addingQuestion}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={6} sx={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">Question Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        label="Question Type"
                                        required
                                        onChange={(e) => setQuestionType(e.target.value)}
                                    >
                                        <MenuItem value="opetion">Option</MenuItem>
                                        <MenuItem value="multiple">Multiple</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">Display Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        label="Display Type"
                                        required
                                        onChange={onChangeDisplayType}
                                    >
                                        <MenuItem value="text">Text</MenuItem>
                                        <MenuItem value="image">Image</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {displayTypeTextShow && <Grid item xs={12} sx={12}>
                                <InputLabel id="demo-simple-select-label1">Question</InputLabel>
                                <TextareaAutosize
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    required
                                    minRows={6}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Grid>}
                            {displayTypeImageShow && (<> <Grid item xs={6} sm={4} md={4}>
                                <InputLabel>Question Image Web</InputLabel>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    required
                                    type="file"
                                    onChange={(e) =>
                                        setQuestionImageWeb(e.target.value)
                                    }
                                />
                            </Grid>
                                <Grid item xs={6} sm={4} md={4}>
                                    <InputLabel>Question Image Tab</InputLabel>
                                    <TextField
                                        fullWidth
                                        autoComplete="text"
                                        type="file"
                                        required
                                        onChange={(e) => setQuestionImageTab(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={4} md={4}>
                                    <InputLabel>Question Image Mobile</InputLabel>
                                    <TextField
                                        fullWidth
                                        autoComplete="text"
                                        type="file"
                                        required
                                        onChange={(e) => setQuestionImageMobile(e.target.value)}
                                    />
                                </Grid></>)}

                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    required
                                    label='Answer A'
                                    onChange={(e) => setAnswerA(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    required
                                    type="text"
                                    label='Answer B'
                                    onChange={(e) => setAnswerB(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    required
                                    onChange={(e) => setAnswerC(e.target.value)}
                                    label='Answer C'
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    required
                                    onChange={(e) => setAnswerD(e.target.value)}
                                    label='Answer D'
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">Question Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        label="Question Category"
                                        onChange={(e) => setQuestionCategory(e.target.value)}
                                        required
                                    >
                                        <MenuItem value="Fill the blanks">Fill the blanks </MenuItem>
                                        <MenuItem value="Choose the best answer">Choose the best answer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">Answer Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        label="Question Type"
                                        required
                                        onChange={(e) => setAnswerType(e.target.value)}
                                    >
                                        <MenuItem value="Fixed">Fixed</MenuItem>
                                        <MenuItem value="Dynamic">Dynamic</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={12}>
                                <hr />
                            </Grid>
                            <Grid item xs={12} sx={12}>
                                {/* <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">Answer</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        label="Question Type"
                                        onChange={(e) => setAnswer(e.target.value)}
                                    >
                                        <MenuItem value="">Fixed</MenuItem>
                                        <MenuItem>Dynamic</MenuItem>
                                    </Select>
                                </FormControl> */}
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    onChange={(e) => setAnswer(e.target.value)}
                                    label='Answer'
                                />
                            </Grid>
                            <Grid item xs={12} sx={12}>
                                <InputLabel id="demo-simple-select-label1">Notes</InputLabel>
                                <TextareaAutosize
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    minRows={5}
                                    onChange={(e) => setNotes(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                            {console.log(error)}
                            {error?.length > 0 && (<Grid item xs={12} sx={12}>
                                <Box sx={{ color: "red" }}>{error}</Box>
                            </Grid>)}
                            <Grid item xs={12} sx={12}>
                                <Button fullWidth variant="contained" type='submit'>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default AddQuestion;