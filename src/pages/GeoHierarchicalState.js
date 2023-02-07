import Paper from '@mui/material/Paper';
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
import React, { useState } from 'react';
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

const columns = [{ id: 'state', label: 'State', minWidth: 170 }];

function createData(state, board, population, size) {
    const density = population / size;
    return { state, board, population, size, density };
}

const rows = [
    createData('India'),
    createData('China'),
    createData('Italy'),
    createData('United States'),
    createData('Canada'),
    createData('Australia'),
    createData('Germany'),
    createData('Ireland'),
    createData('Mexico'),
    createData('Japan'),
    createData('France'),
    createData('United Kingdom'),
    createData('Russia'),
    createData('Nigeria'),
    createData('Brazil'),
];

export default function GeoHierarchicalState() {
    const [openState, setOpenState] = useState(false);
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
        <>
            <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <Typography variant="h5" sx={{ paddingBottom: '15px' }}>
                    State{' '}
                </Typography>
                <Container>
                    <Box sx={{ background: 'white', borderRadius: '13px', padding: '15px' }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    marginLeft: '20px',
                                    marginTop: '20px',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Box sx={{ marginTop: '10px', marginRight: '20px' }}>
                                    <Button
                                        sx={{ padding: '15px', marginTop: '10px' }}
                                        variant="outlined"
                                        onClick={() => setOpenState(true)}
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </Box>
                            <div>
                                <Dialog fullWidth open={openState} onClose={() => setOpenState(false)}>
                                    <DialogTitle>State</DialogTitle>
                                    <DialogContent>
                                        <Box sx={{ margin: '12px' }}>
                                            <TextField fullWidth id="outlined-basic" label="State" variant="outlined" />
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenState(false)}>Cancel</Button>
                                        <Button onClick={() => setOpenState(false)}>Add</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </Grid>
                        <Box sx={{ margin: '20px' }}>
                            {' '}
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                        </Box>{' '}
                    </Box>
                </Container>
            </Box>
        </>
    );
}