import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
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

const AddSchool = () => {
    const [allStates, setAllStates] = useState([])
    const [allDistricts, setAllDistricts] = useState([])
    const [allBoard, setAllBoard] = useState([])
    const [allTaluk, setAllTaluk] = useState([])
    const [token, setToken] = useState("")
    const [schoolRegNo, setSchoolRegNo] = useState("")
    const [schoolName, setSchoolName] = useState("")
    const [state, setState] = useState("")
    const [district, setDistrict] = useState("")
    const [taluk, setTaluk] = useState("")
    const [board, setBoard] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [contactPerson, setContactPerson] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [altContactNo, setAltContactNo] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const tok = sessionStorage.getItem('token');
        if (tok !== null || tok !== undefined) {
            setToken(tok);
            getAllBoards(tok)
            getAllState(tok)
        }
    }, []);

    const getAllBoards = async (token) => {
        const h = {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}edu/get-Board-all`, { headers: h });
            console.log(data);
            setAllBoard(data)
        } catch (error) {
            console.log(error);
        }
    }

    const getAllState = async (token) => {
        const h = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        }
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}Geo/get-State-all`, { headers: h })
            console.log(data)
            setAllStates(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllDistrict = async (stateId) => {
        const h = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json',
        }
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}Geo/get-District-bystateId/${stateId}`, { headers: h })
            console.log(data)
            setAllDistricts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTaluk = async (districtId) => {
        const h = {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_DOMAIN_NAME}Geo/get-taluk-bydistrictId/${districtId}`, { headers: h })
            console.log(data)
            setAllTaluk(data)
        } catch (error) {
            console.log(error)
        }
    };

    const addingSchool = async (e) => {
        e.preventDefault()
        const h = {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        const d = {
            SchoolRegNo: schoolRegNo,
            SchoolName: schoolName,
            Board: board,
            TalukId: taluk,
            DistrictId: district,
            StateId: state,
            Address: address,
            City: city,
            PinCode: pinCode,
            ContactNo: contactNo,
            ContactPerson: contactPerson,
            EmailId: email,
            Website: website,
            AltContactNo: altContactNo
        }
        if (schoolRegNo === "" || schoolName === "" || board === "" || taluk === "" || district === "" || state === "" || address === "" || contactNo === "") {
            setError("Please fill all required fields")
        } else {
            setError("")
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_DOMAIN_NAME}student/Save-School`, d, { headers: h })
                console.log(data)
                setError(data.errorMsgs)
                if (data.result === "Success") {
                    navigate('/dashboard/school')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Box sx={{ paddingLeft: "24px", paddingRight: "24px" }}>
                <Typography variant='h4' sx={{ paddingBottom: "15px" }}>
                    Add School</Typography>
                <Box sx={{ background: "white", borderRadius: "10px", padding: "15px" }}>
                    <form onSubmit={addingSchool}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    required
                                    label="School RegNo."
                                    onChange={(e) => setSchoolRegNo(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    required
                                    label="School Name"
                                    onChange={(e) => setSchoolName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        required
                                        label="State"
                                        onChange={(e) => {
                                            setState(e.target.value)
                                            getAllDistrict(e.target.value)
                                        }}
                                    >{allStates?.map((item, index) => {
                                        return <MenuItem key={index} value={item.id}>{item.stateName}</MenuItem>;
                                    })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">District</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        label="District"
                                        required
                                        onChange={(e) => {
                                            setDistrict(e.target.value)
                                            getAllTaluk(e.target.value)
                                        }}
                                    >{allDistricts?.map((item, index) => {
                                        return <MenuItem key={index} value={item.id}>{item.districtName}</MenuItem>;
                                    })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">Taluk</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        label="Taluk"
                                        required
                                        onChange={(e) => setTaluk(e.target.value)}
                                    >{allTaluk?.map((item, index) => {
                                        return <MenuItem key={index} value={item.id}>{item.blockName}</MenuItem>;
                                    })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label1">Board</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select1"
                                        label="Board"
                                        required
                                        onChange={(e) => setBoard(e.target.value)}
                                    >{allBoard?.map((item, index) => {
                                        return <MenuItem key={index} value={item.boardName}>{item.boardName}</MenuItem>;
                                    })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    required
                                    label="Address"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    label="City"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    label="PinCode"
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    required
                                    label="Contact No"
                                    onChange={(e) => setContactNo(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    label="Contact Person"
                                    onChange={(e) => setContactPerson(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email"
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    onChange={(e) => setWebsite(e.target.value)}
                                    label="Website"
                                />
                            </Grid>
                            <Grid item xs={6} sx={12}>
                                <TextField
                                    fullWidth
                                    autoComplete="text"
                                    type="text"
                                    onChange={(e) => setAltContactNo(e.target.value)}
                                    label="Alt Contact No."
                                />
                            </Grid>

                            {error.length > 0 && (<Grid item xs={12} sx={12}>
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

export default AddSchool;