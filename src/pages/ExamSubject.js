import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
    { id: 'state', label: 'State', minWidth: 170 },
    { id: 'board', label: 'Board', minWidth: 100 },
    { id: 'medium', label: 'Medium', minWidth: 100 },
    { id: 'grade', label: 'Grade', minWidth: 100 },
    { id: 'subjectgroup', label: 'Subject Group', minWidth: 100 },
    { id: 'subject', label: 'Subject', minWidth: 100 },
];
function createData(state, board, medium, grade, subjectgroup, subject) {
    return { state, board, medium, grade, subjectgroup, subject };
}
const rows = [
    createData('India', 'IN', '', '', '', ''),
    createData('China', 'CN', '', '', '', ''),
    createData('Italy', 'IT', '', '', '', ''),
    createData('United States', 'US', '', '', '', ''),
    createData('Canada', 'CA', '', '', '', ''),
    createData('Australia', 'AU', '', '', '', ''),
    createData('Germany', 'DE', '', '', '', ''),
    createData('Ireland', 'IE', '', '', '', ''),
    createData('Mexico', 'MX', '', '', '', ''),
    createData('Japan', 'JP', '', '', '', ''),
    createData('France', 'FR', '', '', '', ''),
    createData('United Kingdom', 'GB', '', '', '', ''),
    createData('Russia', 'RU', '', '', '', ''),
    createData('Nigeria', 'NG', '', '', '', ''),
    createData('Brazil', 'BR', '', '', '', ''),
];

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

const state = [
    'Oliver ',
    'Van ',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const board = [
    'State',
    'Van ',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const medium = [
    'Tamil',
    'Van ',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const grade = [
    'A',
    'Van ',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const subjectgroup = [
    'Bio-Maths',
    'Computer Science',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

export default function ExamSubject() {
    const theme = useTheme();
    const [stateName, setStateName] = React.useState([]);
    const [boardName, setBoardName] = React.useState([]);
    const [mediumName, setMediumName] = React.useState([]);
    const [gradeName, setGradeName] = React.useState([]);
    const [subjectgroupName, setSubjectGroupName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setStateName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };
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
    const handleSubjectGroupChange = (event) => {
        const {
            target: { value },
        } = event;
        setSubjectGroupName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    const [openSubject, setOpenSubject] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Typography variant="h5" sx={{ paddingBottom: '15px', marginLeft: '20px' }}>
                Subject{' '}
            </Typography>
            <Container sx={{ background: 'white', borderRadius: '13px', padding: '15px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel id="demo-multiple-name-label">State</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={stateName}
                                onChange={handleChange}
                                input={<OutlinedInput label="State" />}
                                MenuProps={MenuProps}
                            >
                                {state.map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel id="demo-multiple-board-label">Board</InputLabel>
                            <Select
                                labelId="demo-multiple-board-label"
                                id="demo-multiple-board"
                                multiple
                                value={boardName}
                                onChange={handleBoardChange}
                                input={<OutlinedInput label="Board" />}
                                MenuProps={MenuProps}
                            >
                                {board.map((board) => (
                                    <MenuItem key={board} value={board}>
                                        {board}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel id="demo-multiple-medium-label">Medium</InputLabel>
                            <Select
                                labelId="demo-multiple-medium-label"
                                id="demo-multiple-medium"
                                multiple
                                value={mediumName}
                                onChange={handleMediumChange}
                                input={<OutlinedInput label="Medium" />}
                                MenuProps={MenuProps}
                            >
                                {medium.map((medium) => (
                                    <MenuItem key={medium} value={medium}>
                                        {medium}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel id="demo-multiple-grade-label">Grade</InputLabel>
                            <Select
                                labelId="demo-multiple-grade-label"
                                id="demo-multiple-grade"
                                multiple
                                value={gradeName}
                                onChange={handleGradeChange}
                                input={<OutlinedInput label="Grade" />}
                                MenuProps={MenuProps}
                            >
                                {grade.map((grade) => (
                                    <MenuItem key={grade} value={grade}>
                                        {grade}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 200 }}>
                            <InputLabel id="demo-multiple-name-label">Subject Group</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={subjectgroupName}
                                onChange={handleSubjectGroupChange}
                                input={<OutlinedInput label="Subject Group" />}
                                MenuProps={MenuProps}
                            >
                                {subjectgroup.map((subjectgroup) => (
                                    <MenuItem key={subjectgroup} value={subjectgroup}>
                                        {subjectgroup}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button sx={{ padding: '15px', marginTop: '10px' }} variant="outlined" onClick={() => setOpenSubject(true)}>
                            Add
                        </Button>
                    </Box>
                </Box>
                <div>
                    <Dialog fullWidth open={openSubject} onClose={() => setOpenSubject(false)}>
                        <DialogTitle>Subject</DialogTitle>
                        <DialogContent>
                            <Box sx={{ margin: '12px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">State</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={stateName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="State" />}
                                        MenuProps={MenuProps}
                                    >
                                        {state.map((state) => (
                                            <MenuItem key={state} value={state}>
                                                {state}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ margin: '12px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-board-label">Board</InputLabel>
                                    <Select
                                        labelId="demo-multiple-board-label"
                                        id="demo-multiple-board"
                                        multiple
                                        value={boardName}
                                        onChange={handleBoardChange}
                                        input={<OutlinedInput label="Board" />}
                                        MenuProps={MenuProps}
                                    >
                                        {board.map((board) => (
                                            <MenuItem key={board} value={board}>
                                                {board}
                                            </MenuItem>
                                        ))}
                                    </Select>{' '}
                                </FormControl>
                            </Box>
                            <Box sx={{ margin: '12px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-medium-label">Medium</InputLabel>
                                    <Select
                                        labelId="demo-multiple-medium-label"
                                        id="demo-multiple-medium"
                                        multiple
                                        value={mediumName}
                                        onChange={handleMediumChange}
                                        input={<OutlinedInput label="Medium" />}
                                        MenuProps={MenuProps}
                                    >
                                        {medium.map((medium) => (
                                            <MenuItem key={medium} value={medium}>
                                                {medium}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ margin: '12px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-grade-label">Grade</InputLabel>
                                    <Select
                                        labelId="demo-multiple-grade-label"
                                        id="demo-multiple-grade"
                                        multiple
                                        value={gradeName}
                                        onChange={handleGradeChange}
                                        input={<OutlinedInput label="Grade" />}
                                        MenuProps={MenuProps}
                                    >
                                        {grade.map((grade) => (
                                            <MenuItem key={grade} value={grade}>
                                                {grade}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ margin: '12px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-sujectgroup-label">Subject Group</InputLabel>
                                    <Select
                                        labelId="demo-multiple-subjectgroup-label"
                                        id="demo-multiple-subjectgroup"
                                        multiple
                                        value={subjectgroupName}
                                        onChange={handleSubjectGroupChange}
                                        input={<OutlinedInput label="Subject Group" />}
                                        MenuProps={MenuProps}
                                    >
                                        {subjectgroup.map((subjectgroup) => (
                                            <MenuItem key={subjectgroup} value={subjectgroup}>
                                                {subjectgroup}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ margin: '12px' }}>
                                <TextField fullWidth id="outlined-basic" label="Subject" variant="outlined" />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenSubject(false)}>Cancel</Button>
                            <Button onClick={() => setOpenSubject(false)}>Add</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '15px' }}>
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
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </div>
    );
}