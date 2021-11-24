import { React, useState } from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import { useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/system'
import MoreMenu from '../MoreMenu'
import { TextField } from '@mui/material'
import Divider from '../Divider'
import SaveIcon from '@mui/icons-material/Save';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import { useParams } from 'react-router-dom'
import assignmentAPI from '../../../APIs/assignmentAPI'
import '../index.scss'


export default function ItemAssignment({ isManager, assignment, toggleChangeItem }) {
    const navigate = useNavigate()
    const params = useParams()
    const [anchorEl, setAnchorEl] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [value, setValue] = useState({ name:'', maxPoint:'' })

    const getDeadlineTime = datetime => {
        const datetime_data = datetime.slice(5, 16).split('T')
        const time = datetime_data[1]
        const date = datetime_data[0].split('-').join('/')
        
        return {time: time, date: date}
    }

    const handleChangeValue = name => event => {
        setValue({...value, [name]: event.target.value})
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const removeAssignment = async () => {
        const response = await assignmentAPI.remove(params.classroomId, assignment.id)
        toggleChangeItem()
    }

    const handleCloseMenu = event => {
        setAnchorEl(null);
        switch(event.target.dataset.action) {
            case 'update':
                setUpdating(true)
                break
            case 'remove':
                break
            default: 
                break
        }
    };

    const saveUpdateAssignment = async () => {
        // console.log(value)
        const classroomId = params.classroomId
        const response = await assignmentAPI.update(classroomId, assignment.id, value)
        setUpdating(false)
        // console.log(response)
    }

    const deadline = getDeadlineTime(assignment.end_time)

    return (
        <ListItem
        className='item' 
        secondaryAction={
            isManager &&
            <Box>
                <IconButton onClick={handleMenu} edge="end" aria-label="more">
                    <MoreVertIcon />
                </IconButton>
                <MoreMenu anchorEl={anchorEl} handleCloseMenu={handleCloseMenu} handleConfirm={removeAssignment} />
            </Box>
        } 
        disablePadding
        >
            <ListItemButton onClick={() => !updating && navigate(`${assignment.id}`, { replace: false })}>
                <ListItemIcon>
                    <AssignmentIcon sx={{ fontSize: 40, color: 'rgba(0, 95, 95)' }} />
                </ListItemIcon>
                <TextField
                type='text'
                defaultValue={assignment.name} 
                variant="standard" 
                disabled={!updating}
                className='item__item-button__item-text item-text--title'
                InputProps={{ disableUnderline: !updating }}
                onChange={handleChangeValue('name')}
                />
                <TextField
                type='number'
                defaultValue={assignment.maxPoint}
                variant="standard" 
                disabled={!updating}
                className='item__item-button__item-text item-text--point'
                InputProps={{ disableUnderline: !updating }}
                onChange={handleChangeValue('maxPoint')}
                />
                {updating ? 
                <Box className='update-button-group'>
                    <IconButton onClick={() => setUpdating(false)}>
                        <CancelPresentationTwoToneIcon fontSize='large' className='update-button update-button--cancel' />
                    </IconButton>   
                    <IconButton onClick={saveUpdateAssignment}>
                        <SaveIcon fontSize='large' className='update-button update-button--save' />
                    </IconButton>
                </Box>
                :
                <ListItemText primary={`Deadline: ${deadline.time}, ${deadline.date}`} className='item__item-button__item-text item-text--deadline' />
                }
            </ListItemButton>
            <Divider />
        </ListItem>
    )
}