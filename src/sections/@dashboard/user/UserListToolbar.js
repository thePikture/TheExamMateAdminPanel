import PropTypes from 'prop-types';
// material
import {
  Stack,
  Select,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  // height: 130,
  display: 'flex',
  flexWrap: 'wrap',
  // justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  state,
  district,
  taluk,
  school,
  board,
  grade,
  search,
  medium,
  subjectGroup,
  add,
  openModal,
  handleModal,
  allStates,
  selectedState,
  setSelectedState,
  handleSearch,
  allDistricts,
  handleSearchTaluk,
  allBoards,
  handleBoards,
  allMediums,
  handleGetGrade,
  allGrades,
  handleGetSubjectGroup,
  allSubjectGroups,
  handleGetSubjects,
  dropdownBoardId,
  dropdownMediumId,
  dropdownGradeId,
}) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          sx={{ margin: '7px' }}
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {state && (
            <Box sx={{ minWidth: 170, margin: '7px' }}>
              <FormControl fullWidth>
                <InputLabel id="category">State</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  label="State"
                  onChange={(e) => handleSearch(e.target.value)}
                >
                  {allStates.map((item) => {
                    return <MenuItem value={item.id}>{item.stateName}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {district && (
            <Box sx={{ minWidth: 170, margin: '7px' }}>
              <FormControl fullWidth>
                <InputLabel id="category">District </InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  label="District "
                  onChange={(e) => handleSearchTaluk(e.target.value)}
                >
                  {allDistricts.map((district) => (
                    <MenuItem value={district.id} key={district.id}>
                      {district.districtName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {taluk && (
            <Box sx={{ minWidth: 170, margin: '7px' }}>
              <FormControl fullWidth>
                <InputLabel id="category">Taluk</InputLabel>
                <Select labelId="category" id="demo-simple-select" label="Taluk">
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'1'}>2</MenuItem>
                  <MenuItem value={'1'}>3</MenuItem>
                  <MenuItem value={'1'}>4</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {school && (
            <Box sx={{ minWidth: 170, margin: '7px' }}>
              <FormControl fullWidth>
                <InputLabel id="category">School</InputLabel>
                <Select labelId="category" id="demo-simple-select" label="School">
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'1'}>2</MenuItem>
                  <MenuItem value={'1'}>3</MenuItem>
                  <MenuItem value={'1'}>4</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {board && (
            <Box sx={{ minWidth: 170, margin: '7px' }}>
              <FormControl fullWidth>
                <InputLabel id="category">Board</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  label="Board"
                  value={dropdownBoardId}
                  onChange={(e) => handleBoards(e.target.value)}
                >
                  {allBoards.map((board, index) => {
                    console.log({ board });
                    return (
                      <MenuItem key={index} value={board.id}>
                        {board.boardName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {medium && (
            <Box sx={{ minWidth: 170, margin: '7px' }}>
              <FormControl fullWidth>
                <InputLabel id="category">Medium</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  label="Board"
                  value={dropdownMediumId}
                  onChange={(e) => handleGetGrade(e.target.value)}
                >
                  {allMediums.map((medium, index) => {
                    console.log({ medium });
                    return (
                      <MenuItem key={index} value={medium.id}>
                        {medium.mediumName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {grade && (
            <Box sx={{ minWidth: 170, margin: '7px' }}>
              <FormControl fullWidth>
                <InputLabel id="category">Grade</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  label="Grade"
                  value={dropdownGradeId}
                  onChange={(e) => {
                    handleGetSubjectGroup(e.target.value);
                  }}
                >
                  {allGrades.map((grade, index) => {
                    console.log({ grade });
                    return (
                      <MenuItem key={index} value={grade.id}>
                        {grade.grade}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {subjectGroup && (
            <Box sx={{ minWidth: 170, margin: '7px' }}>
              <FormControl fullWidth>
                <InputLabel id="category">Subject Group</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  label="Grade"
                  onChange={(e) => {
                    handleGetSubjects(e.target.value);
                  }}
                >
                  {allSubjectGroups.map((subjectGroup, index) => {
                    console.log({ grade });
                    return (
                      <MenuItem key={index} value={subjectGroup.id}>
                        {subjectGroup.subjectGroup}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          )}
        </>
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {search && (
            <Box sx={{ minWidth: 170, margin: '7px' }}>
              <Button type="submit" variant="contained" size="large" onClick={handleSearch}>
                Search
              </Button>
            </Box>
          )}
        </>
      )}

      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ minWidth: 170, margin: '7px' }}>
          {add && (
            <Button type="submit" variant="contained" size="large" onClick={handleModal}>
              Add
            </Button>
          )}
        </Box>
      )}
    </RootStyle>
  );
}
