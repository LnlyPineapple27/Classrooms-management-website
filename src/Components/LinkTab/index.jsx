import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

export default function LinkTab(props) {
    const navigate = useNavigate()
    return (
        <Tab
        component="a"
        onClick={(event) => {
            event.preventDefault();
            navigate(props.href, {replace: true})
        }}
        {...props}
        />
    );
}
