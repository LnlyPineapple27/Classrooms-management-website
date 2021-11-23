import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

export default function AddClassroomButton(props) {
    return (
        <IconButton
        size="large"
        aria-label="add classroom"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={props.handleOpen}
        >
            <AddIcon />
        </IconButton>
    )
}