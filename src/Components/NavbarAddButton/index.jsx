import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

export default function AddClassroomButton({ onClick, ariaLabel }) {
    return (
        <IconButton
        size="large"
        aria-label={ariaLabel}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={onClick}
        >
            <AddIcon />
        </IconButton>
    )
}