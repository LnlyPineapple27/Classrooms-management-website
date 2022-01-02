import { React, useState } from 'react'
import LinkTab from '../LinkTab'
import AccountsTable from '../AccountsTable'
import ClassroomsTable from '../ClassroomsTable'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{width: "100%"}}
            {...other}
        >
        {value === index && (
            <Box>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}
    
function a11yProps(index) {
    return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    }
}

export default function Dashboard() {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
  
    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100%", p: 1 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Accounts" {...a11yProps(0)} />
                <Tab label="Admins" {...a11yProps(1)} />
                <Tab label="Classrooms" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AccountsTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AccountsTable role={1} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ClassroomsTable />
            </TabPanel>
        </Box>
    )
}