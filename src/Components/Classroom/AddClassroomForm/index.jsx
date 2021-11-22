import { React, useState, useContext } from 'react'
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import classroomAPI from '../../../APIs/classroomAPI';
import { AddClassroomModalContext } from '../../../Context/AddClassroomModalContext';
import { NewClassroomAddedContext } from '../../../Context/NewClassroomAddedContext';

const formTextFields = [
    {
      name: 'Name'
    },
    {
      name: 'Description'
    },
    {
      name: 'Section'
    }
]

export default function AddClassroomForm () {
    const [formData, setFormData] = useState({
        name: '',
        section: '',
        description: '',
    });
    const [addingStatus, setAddingStatus] = useState(null);

    const [, setOpen] = useContext(AddClassroomModalContext)

    const [add, setAdd] = useContext(NewClassroomAddedContext)

    const handleChange = name => event => {
        setFormData({ ...formData, [name]: event.target.value });
    };
    
    const handleAdd = async () => {
        setAddingStatus(true)
        await classroomAPI.addClassroom(formData)
        setAdd(!add)
        setAddingStatus(false)
        setOpen(false)
    }

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
            
                <LoadingButton
                sx={{
                    width: "100px",
                    margin: "2rem 0 0 auto"
                }} 
                endIcon={<SendIcon />}
                loading={addingStatus}
                loadingPosition="end"
                variant="contained"
                onClick={ handleAdd }
            >
                Send
            </LoadingButton>

        </FormControl>
    )
} 
