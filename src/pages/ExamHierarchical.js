import React, { useState } from 'react';
import Box from '@mui/material/Box';
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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

const ExamHierarchical = () => {
    const [openBoard, setOpenBoard] = useState(false);
    const [openMedium, setOpenMedium] = useState(false);
    const [openGrade, setOpenGrade] = useState(false);
    const [openSubjectGroup, setOpenSubjectGroup] = useState(false);
    const [openSubject, setOpenSubject] = useState(false);

    return (
        <>
            <Box sx={{ paddingLeft: '24px', paddingRight: '24px' }}>
                <Typography variant="h5" sx={{ paddingBottom: '15px' }}>
                    Exam Hierarchical
                </Typography>
                <Box sx={{ background: 'white', borderRadius: '13px', padding: '15px' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={7} sx={12}>
                            <ButtonGroup sx={{ width: '100%' }} variant="contained" aria-label="outlined primary button group">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Board</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Board">
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="outlined" onClick={() => setOpenBoard(true)}>
                                    Add
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <div>
                            <Dialog fullWidth open={openBoard} onClose={() => setOpenBoard(false)}>
                                <DialogTitle>Board</DialogTitle>
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
                                        <TextField fullWidth id="outlined-basic" label="Board" variant="outlined" />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpenBoard(false)}>Cancel</Button>
                                    <Button onClick={() => setOpenBoard(false)}>Add</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <Grid item xs={7} sx={12}>
                            <ButtonGroup sx={{ width: '100%' }} variant="contained" aria-label="outlined primary button group">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Medium</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Medium">
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="outlined" onClick={() => setOpenMedium(true)}>
                                    Add
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <div>
                            <Dialog fullWidth open={openMedium} onClose={() => setOpenMedium(false)}>
                                <DialogTitle>Medium</DialogTitle>
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
                                        <TextField fullWidth id="outlined-basic" label="Medium" variant="outlined" />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpenMedium(false)}>Cancel</Button>
                                    <Button onClick={() => setOpenMedium(false)}>Add</Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                        <Grid item xs={7} sx={12}>
                            <ButtonGroup sx={{ width: '100%' }} variant="contained" aria-label="outlined primary button group">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Grade">
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="outlined" onClick={() => setOpenGrade(true)}>
                                    Add
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <div>
                            <Dialog fullWidth open={openGrade} onClose={() => setOpenGrade(false)}>
                                <DialogTitle>Grade</DialogTitle>
                                <DialogContent>
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

                        <Grid item xs={7} sx={12}>
                            <ButtonGroup sx={{ width: '100%' }} variant="contained" aria-label="outlined primary button group">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Subject Group</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Subject Group">
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="outlined" onClick={() => setOpenSubjectGroup(true)}>
                                    Add
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <div>
                            <Dialog fullWidth open={openSubjectGroup} onClose={() => setOpenSubjectGroup(false)}>
                                <DialogTitle>Subject Group</DialogTitle>
                                <DialogContent>
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
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Grade">
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ margin: '12px' }}>
                                        <TextField fullWidth id="outlined-basic" label="Subject Group" variant="outlined" />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setOpenSubjectGroup(false)}>Cancel</Button>
                                    <Button onClick={() => setOpenSubjectGroup(false)}>Add</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <Grid item xs={7} sx={12}>
                            <ButtonGroup sx={{ width: '100%' }} variant="contained" aria-label="outlined primary button group">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Subject">
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="outlined" onClick={() => setOpenSubject(true)}>
                                    Add
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <div>
                            <Dialog fullWidth open={openSubject} onClose={() => setOpenSubject(false)}>
                                <DialogTitle>Subject</DialogTitle>
                                <DialogContent>
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
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Grade">
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ margin: '12px' }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Subject Group</InputLabel>
                                            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Suject Group">
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
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
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default ExamHierarchical;