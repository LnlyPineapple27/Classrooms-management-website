import { Stack, TextField, Button, Box } from '@mui/material'
import { React, useState } from 'react'


export default function ChangePasswordForm({ setAlert, vCode }) {
    const [formData, setFormData] = useState({pwd: "", cPwd: ""})

    const handleTFChange = name => e => setFormData({...formData, [name]: e.target.value})

    const handleChangePassword = () => {
        if(formData['pwd'] !== formData['cPwd'])
            return setAlert && setAlert({ severity:"error", content: "Password and Confirm Password are not the same", status: true })

        
    }

    return (
        <Stack spacing={2} direction={'column'}>
            <TextField
                value={formData['pwd']}
                label='New Password' 
                placeholder='Enter new password ...' 
                name='newPassword' 
                variant='outlined'
                type='password'
                margin='normal'
                onChange={handleTFChange('pwd')}
                fullWidth
            />
            <TextField
                value={formData['cPwd']}
                label='Confirm Password' 
                placeholder='Confirm password ...' 
                name='confirmPassword' 
                variant='outlined' 
                type='password' 
                margin='normal'
                onChange={handleTFChange('cPwd')}
                fullWidth
            />
            <Box width={1} display={"flex"} justifyContent={"flex-end"}>
                <Button variant='contained' color='primary' onClick={handleChangePassword}>
                    Change
                </Button>
            </Box>
        </Stack>
    )
}