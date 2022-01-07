import { Box, TextField, Typography } from '@mui/material'

export default function ReviewRequestForm({ max, formData, setFormData }) {

    const handleFormDataChange = name => e => {
        let value = e.target.value
        if(name === 'expectGrade') {
            if(Number(value) > max)
                value = max
            if(Number(value) < 0)
                value = 0
        } 
        setFormData({...formData, [name]: value})
    }

    return (
        <Box component="div">
            <TextField
                InputProps={{
                    endAdornment: (
                        <Typography variant='button' sx={{ ml: 1}}>/{max}</Typography>
                    ),
                }}
                name='expectGrade'
                id='tf_expect'
                margin='normal'
                type='number'
                variant='outlined'
                value={formData['expectGrade']}
                onChange={handleFormDataChange('expectGrade')}
                label='Expect'
                fullWidth
            />
            <TextField
                name='explaination'
                id='tf_content'
                margin='normal'
                type='text'
                variant='outlined'
                value={formData['explaination']}
                onChange={handleFormDataChange('explaination')}
                label='Explain'
                fullWidth
            />
        </Box>
    )
}