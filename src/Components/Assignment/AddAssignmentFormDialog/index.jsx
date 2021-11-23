import { React, useState }  from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box } from '@mui/system';
import assignmentAPI from '../../../APIs/assignmentAPI';
import { useParams } from 'react-router';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export default function FormDialog({ handleAdded, status, handleClose }) {
    const params = useParams()
    const [error, setError] = useState(null)
    const [formData, setFromData] = useState({
        name: '',	
        maxPoint: '',
        description: '',	
        start_time: new Date(),
        end_time: new Date()
    })
    const [creating, setCreating] = useState(false)

    const handleTextfieldChange = fieldName => event => {
        setFromData({...formData, [fieldName]: event.target.value})
    }

    const handleDatetimePickerChange = fieldName => value => {
        setFromData({...formData, [fieldName]: value})
    }

    const createAssignment = async () => {
        setCreating(true)
        const classroomId = params.classroomId
        const cloneFormData = {...formData, 'classroomID': classroomId}
        const response = await assignmentAPI.createAssignment(cloneFormData)
        setCreating(false)

        if(response.ok) {
            handleAdded()
            handleClose()
        }
        else {
            const errorObj = await response.json()
            setError(`Error ${response.status}: ${errorObj.msg}`)
        }
    }

    return (
        <Dialog className='add-assignment-form' open={status} onClose={handleClose}>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To add an assignment please fill at least name, point, start time and end time.
            </DialogContentText>
            <Box sx={{maxHeight:1, mt: 1}}>
                <Collapse in={error ?? false}>
                    <Alert 
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setError(null);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    >
                        <strong>{error}</strong>
                    </Alert>
                </Collapse>
            </Box>
            
            <TextField
            className='add-assignment-form__element'
            autoFocus
            margin="dense"
            id="tf_name"
            label="Name"
            placeholder="Enter assignment's name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleTextfieldChange('name')}
            />
            <TextField
            autoFocus
            className='add-assignment-form__element'
            margin="dense"
            id="tf_point"
            placeholder="Enter assignment's max point"
            label="Max Point"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleTextfieldChange('maxPoint')}
            />
            <TextField
            className='add-assignment-form__element'
            id="tf_multiline_description"
            label="Description"
            rows='4'
            placeholder="Enter assignment's description"
            multiline
            fullWidth
            variant="standard"
            />
            <Box className='DateTime-picker-group add-assignment-form__element'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                    label="Start Time"
                    value={formData.start_time}
                    onChange={handleDatetimePickerChange('start_time')}
                    renderInput={(params) => (
                        <TextField 
                        className='add-assignment-form__element__datetime-picker' 
                        {...params} 
                        fullWidth 
                        variant="standard" />
                    )}
                    />
                    <DateTimePicker
                    label="End Time"
                    value={formData.end_time}
                    onChange={handleDatetimePickerChange('end_time')}
                    renderInput={(params) => (
                        <TextField 
                        className='add-assignment-form__element__datetime-picker' 
                        {...params} 
                        fullWidth 
                        variant="standard" />
                    )}
                    />
                </LocalizationProvider>
            </Box>
            </DialogContent>
            <DialogActions className='add-assignment-form__action'>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                loading={creating}
                onClick={createAssignment}
                loadingIndicator="Creating..."
                >
                    Create
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}