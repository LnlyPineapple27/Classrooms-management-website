import {React, useState} from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

export default function AddClassroomForm ({formTextFields}) {
    const [formData, setFormData] = useState({
        name: '',
        theme: '',
        part: '',
    });
    const [addingStatus, setAddingStatus] = useState(null);

    const handleChange = name => event => {
        setFormData({ ...formData, [name]: event.target.value });
    };

    const addBtn = addingStatus ? (
        <LoadingButton
            sx={{
                width: "100px",
                margin: "2rem 0 0 auto"
            }} 
            endIcon={<SendIcon />}
            loading={addingStatus}
            loadingPosition="end"
            variant="contained"
        >
            Send
        </LoadingButton>
    ) : (
        <Button 
            sx={{
                width: "100px",
                margin: "2rem 0 0 auto"
            }} 
            variant="contained" endIcon={<SendIcon />}
            onClick={ async () => {
                setAddingStatus(true)

                const response = await fetch(process.env.REACT_APP_API_URL, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData) // body data type must match "Content-Type" header
                });
                
                window.location.reload()
            }}
        >
            Send
        </Button>
    )
    
    return (
        <FormControl sx={{width: "100%", mt: "2rem"}}>
            {formTextFields.map(field => (
                <TextField
                    key={field.name}
                    id={`input_${field.name.toLowerCase()}`}
                    label={field.name}
                    type="Text"
                    autoComplete={`Enter ${field.name.toLowerCase()}`}
                    className='modal__form__text-field'
                    onChange={handleChange(field.name.toLowerCase())}
                />
            ))}
            
            {addBtn}
        </FormControl>
    )
} 
