import { Stack, TextField, Button, Box } from '@mui/material'
import { React, useState } from 'react'
import accountAPI from '../../../APIs/accountAPI'


export default function ChangePasswordForm({ setAlert, vCode, email }) {
    const [formData, setFormData] = useState({pwd: "", cPwd: ""})

    const handleTFChange = name => e => setFormData({...formData, [name]: e.target.value})

    const handleChangePassword = async () => {
        if(formData['pwd'] !== formData['cPwd'])
            return setAlert && setAlert({ severity:"error", content: "Password and Confirm Password are not the same", status: true })

        const response = await accountAPI.changePasswordByEmail(email, vCode, formData['pwd'])

        if(!response.ok)
            return setAlert && setAlert({ severity:"error", content: `Error ${response.status}: ${response.statusText}`, status: true })
    
        setAlert && setAlert({ severity:"success", content: "change password okla.", status: true })
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