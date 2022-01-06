import { Box, TextField } from '@mui/material'

export default function ReviewRequestForm({ formData, setFormData }) {

    const handleFormDataChange = name => e => {
        setFormData({...formData, [name]: e.target.value})
    }

    return (
        <Box component="div">
            <TextField
                name='expect'
                id='tf_expect'
                margin='normal'
                type='number'
                variant='outlined'
                value={formData['expect']}
                onChange={handleFormDataChange('expect')}
                label='Expect'
                fullWidth
            />
            <TextField
                name='content'
                id='tf_content'
                margin='normal'
                type='text'
                variant='outlined'
                value={formData['content']}
                onChange={handleFormDataChange('content')}
                label='Explain'
                fullWidth
            />
        </Box>
    )
}