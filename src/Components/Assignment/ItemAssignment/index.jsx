import { React } from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import { useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import '../index.scss'


export default function ItemAssignment({ assignment }) {
    const navigate = useNavigate()
    const getDeadlineTime = datetime => {
        const datetime_data = datetime.slice(5, 16).split('T')
        const time = datetime_data[1]
        const date = datetime_data[0].split('-').join('/')
        
        return {time: time, date: date}
    }

    const deadline = getDeadlineTime(assignment.end_time)

    return (
        <ListItem
        className='item' 
        secondaryAction={
            <IconButton edge="end" aria-label="more">
                <MoreVertIcon />
            </IconButton>
        } 
        disablePadding
        >
            <ListItemButton onClick={() => navigate(`${assignment.id}`, { replace: false })}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={assignment.name} className='item__item-button__item-text item-text--title' />
                <ListItemText primary={`Deadline: ${deadline.time}, ${deadline.date}`} className='item__item-button__item-text item-text--deadline' />
            </ListItemButton>
        </ListItem>
    )
}