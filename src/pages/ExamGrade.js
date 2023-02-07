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
];
function createData(state, board, medium, grade) {
    return { state, board, medium, grade };
}
const rows = [
    createData('India', 'IN', '', ''),
    createData('China', 'CN', '', ''),
    createData('Italy', 'IT', '', ''),
    createData('United States', 'US', '', ''),
    createData('Canada', 'CA', '', ''),
    createData('Australia', 'AU', '', ''),
    createData('Germany', 'DE', '', ''),
    createData('Ireland', 'IE', '', ''),
    createData('Mexico', 'MX', '', ''),
    createData('Japan', 'JP', '', ''),
    createData('France', 'FR', '', ''),
    createData('United Kingdom', 'GB', '', ''),
    createData('Russia', 'RU', '', ''),
    createData('Nigeria', 'NG', '', ''),
    createData('Brazil', 'BR', '', ''),
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

export default function ExamGrade() {
    const theme = useTheme();
    const [stateName, setStateName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setStateName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    const [openGrade, setOpenGrade] = useState(false);
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
                Grade{' '}
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
                            <InputLabel id="demo-multiple-name-label">Board</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={stateName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Board" />}
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
                            <InputLabel id="demo-multiple-name-label">Medium</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={stateName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Medium" />}
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
                    <Box>
                        <Button sx={{ padding: '15px', marginTop: '10px' }} variant="outlined" onClick={() => setOpenGrade(true)}>
                            Add
                        </Button>
                    </Box>
                </Box>
                <div>
                    <Dialog fullWidth open={openGrade} onClose={() => setOpenGrade(false)}>
                        <DialogTitle>Grade</DialogTitle>
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
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Board</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Board">
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ margin: '12px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Medium</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Medium">
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ margin: '12px' }}>
                                <TextField fullWidth id="outlined-basic" label="Grade" variant="outlined" />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenGrade(false)}>Cancel</Button>
                            <Button onClick={() => setOpenGrade(false)}>Add</Button>
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