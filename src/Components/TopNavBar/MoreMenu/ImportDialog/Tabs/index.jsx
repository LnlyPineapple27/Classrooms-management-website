import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import Alert from '@mui/material/Alert';
import './index.scss'
import classroomAPI from '../../../../../APIs/classroomAPI';
import SelectClassroom from './SelectClassroom';
import assignmentAPI from '../../../../../APIs/assignmentAPI';
import * as XLSX from 'xlsx';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const [severity, setSeverity] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [classrooms, setClassrooms] = React.useState([])
  const [assignments, setAssignments] = React.useState([])
  const [slClassroom, setSlClassroom] = React.useState(-1)
  const [slAssignment, setSlAssignment] = React.useState(-1)
  const [selectedFile, setSelectedFile] = React.useState("None")
  const [fileData, setFileData] = React.useState([])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClassroomSelected = e => {
      setSlClassroom(e.target.value)
  }

  const handleAssignmentSelected = e => {
      setSlAssignment(e.target.value)
  }
  
  const templateMap = {
      Student: "Template_Import_Student.xlsx",
      Point: "Template_Import_Point.xlsx",
  }
  const handleDownloadTemplate = e => { 
    window.open(`${window.location.origin}/template/${templateMap[e.target.dataset.template]}`)
  }
  const handleSelectImportFile = e => {
    let f = e.target.files[0]
    setSelectedFile(f.name)
    const reader = new FileReader();
    reader.onload = (evt) => { // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        let headers = {};
        let data = [];

        for(let z in ws) {
            if(z[0] === '!') continue;
            //parse out the column, row, and value
            let col = z.substring(0,1);
            let row = parseInt(z.substring(1));
            let value = ws[z].v;
            //store header names
            if(row == 1) {
                headers[col] = value === "Student ID" ? "sid" : value.toLowerCase();
                continue;
            }

            if(!data[row]) data[row]={};
            data[row][headers[col]] = value;
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();
            /* Update state */
            setFileData(Array.from(data))
    };
    reader.readAsBinaryString(f);
  }

  const ariaLabel = { 'aria-label': 'description' };
  
  React.useEffect(() => {
      const fetchData = async () => {
        const userId = JSON.parse(localStorage.getItem('account')).userID
        const response = await classroomAPI.getClassroomsThatUserHasRoleTeacher(userId)
        if (response.ok) {
            const data = await response.json()
            setClassrooms(data)
        }
      }
      fetchData()
  },[])
  
  React.useEffect(() => {
    const fetchData = async () => {
        const response = await assignmentAPI.getAllAssignments(slClassroom)
        if (response.ok) {
            const data = await response.json()
            setAssignments(data)
        }
      }
      
      if(slClassroom !== -1) fetchData()

  }, [slClassroom])

  return (
        <Box
        sx={{bgcolor: 'background.paper', display: 'flex', height: 300, marginTop:5 }}
        >
            <Tabs
                orientation="vertical"
                letiant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Import Students" {...a11yProps(0)} />
                <Tab label="Import Scores" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                {message && severity && (<Alert className="tab-panel__alert" severity={severity}>{message}</Alert>)}
                <div className="tab-panel__content">
                    <SelectClassroom classrooms={classrooms} onChange={handleClassroomSelected} value={slClassroom} />
                </div>
                <div className="tab-panel__filename">
                    <p className="tab-panel__filename__text">
                        File: {selectedFile}
                    </p>
                </div>
                <div className="tab-panel__action">
                    <Button
                    letiant="contained"
                    component="label"
                    className="tab-panel__action__button"
                    color="secondary"
                    onClick={handleDownloadTemplate}
                    data-template="Student"
                    >
                        <DownloadIcon />
                        Template
                    </Button>
                    <Button
                    letiant="contained"
                    component="label"
                    className="tab-panel__action__button"
                    >   
                        <UploadIcon />
                        Upload
                        <input
                            type="file"
                            hidden
                            onChange={handleSelectImportFile}
                            data-template="Student"
                        />
                    </Button>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {message && severity && (<Alert className="tab-panel__alert" severity={severity}>{message}</Alert>)}
                <div className="tab-panel__content">
                    <div className="tab-panel__content__select-control">
                        <SelectClassroom classrooms={classrooms} onChange={handleClassroomSelected} value={slClassroom} />
                    </div>
                    <div className="tab-panel__content__select-control">
                        <span className="tab-panel__content__select-control__label">Assignment:</span>
                        <FormControl className="tab-panel__content__select-control__select">
                            <Select
                            value={slAssignment}
                            onChange={handleAssignmentSelected}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >   
                                <MenuItem value={-1}>None</MenuItem>
                                {assignments.map(assignment => <MenuItem key={`assignment_${assignment.id}`} value={assignment.id}>{assignment.name}</MenuItem>)}
                            </Select>
                            <FormHelperText>Select Assignment</FormHelperText>
                        </FormControl>
                    </div>
                </div>
                <div className="tab-panel__filename">
                    <p className="tab-panel__filename__text">
                        File: {selectedFile}
                    </p>
                </div>
                <div className="tab-panel__action">
                    <Button
                    letiant="contained"
                    component="label"
                    className="tab-panel__action__button"
                    color="secondary"
                    onClick={handleDownloadTemplate}
                    data-template="Point"
                    >
                        <DownloadIcon />
                        Template
                    </Button>
                    <Button
                    letiant="contained"
                    component="label"
                    className="tab-panel__action__button"
                    >   
                        <UploadIcon />
                        Upload
                        <input
                            type="file"
                            hidden
                            onChange={handleSelectImportFile}
                            data-template="Point"
                        />
                    </Button>
                </div>
            </TabPanel>
        </Box>
    );
}