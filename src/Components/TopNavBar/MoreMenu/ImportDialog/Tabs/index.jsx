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
          <Typography>{children}</Typography>
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ariaLabel = { 'aria-label': 'description' };
  return (
        <Box
        sx={{bgcolor: 'background.paper', display: 'flex', height: 300, marginTop:5 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
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
                    <div className="tab-panel__content__select-control">
                        <span className="tab-panel__content__select-control__label">Classroom:</span>
                        <FormControl className="tab-panel__content__select-control__select">
                            <Select
                            value={0}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Select Classroom</FormHelperText>
                        </FormControl>
                    </div>
                </div>
                <div className="tab-panel__action">
                    <Button
                    variant="contained"
                    component="label"
                    className="tab-panel__action__button"
                    color="secondary"
                    >
                        <DownloadIcon />
                        Template
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                    <Button
                    variant="contained"
                    component="label"
                    className="tab-panel__action__button"
                    >   
                        <UploadIcon />
                        Upload
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {message && severity && (<Alert className="tab-panel__alert" severity={severity}>{message}</Alert>)}
                <div className="tab-panel__content">
                    <div className="tab-panel__content__select-control">
                        <span className="tab-panel__content__select-control__label">Classroom:</span>
                        <FormControl className="tab-panel__content__select-control__select">
                            <Select
                            value={0}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Select Classroom</FormHelperText>
                        </FormControl>
                    </div>
                    <div className="tab-panel__content__select-control">
                        <span className="tab-panel__content__select-control__label">Assignment:</span>
                        <FormControl className="tab-panel__content__select-control__select">
                            <Select
                            value={0}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Select Assignment</FormHelperText>
                        </FormControl>
                    </div>
                </div>
                <div className="tab-panel__action">
                    <Button
                    variant="contained"
                    component="label"
                    className="tab-panel__action__button"
                    color="secondary"
                    >
                        <DownloadIcon />
                        Template
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                    <Button
                    variant="contained"
                    component="label"
                    className="tab-panel__action__button"
                    >   
                        <UploadIcon />
                        Upload
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                </div>
            </TabPanel>
        </Box>
    );
}