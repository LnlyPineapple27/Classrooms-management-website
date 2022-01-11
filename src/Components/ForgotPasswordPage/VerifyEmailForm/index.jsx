import { Stack, TextField, Button, Box } from '@mui/material'
import { React, useState } from 'react'
import userAPI from '../../../APIs/userAPI'
import { validateEmail } from '../../../APIs/validateInput'

export default function VerifyEmailForm({ setAlert, setVerified, setVCode}) {
    const [formData, setFormData] = useState({email:"", otp: ""})

    const handleTFChange = name => e => setFormData({...formData, [name]: e.target.value})
    
    const handleReSendOTP = async () => {
        const inputEmail = formData['email']

        if(!setAlert) return
        
        if(!validateEmail(inputEmail)) 
            return setAlert && setAlert({ severity: "error", status: true, content: "Invalid Email" })

        const response = await userAPI.sendOTP(inputEmail)

        if(!response.ok)
            return setAlert && setAlert({ severity: "error", status: true, content: `Error ${response.status}: ${response.statusText}` })
        
        setAlert && setAlert({ severity: "success", status: true, content: await response.json() })
    }

    const handleVerify = async () => {
        const inputEmail = formData['email']
        const inputOTP = formData['otp']

        if(!validateEmail(inputEmail)) 
            return setAlert && setAlert({ severity: "error", status: true, content: "Invalid Email" })

        const response = await userAPI.verifyEmail({ mail: inputEmail, vCode: inputOTP })

        if(!response.ok)
            return setAlert && setAlert({ severity: "error", status: true, content: `Error ${response.status}: ${response.statusText}` })

        setVCode && setVCode(formData['otp'])
        setVerified && setVerified(true)
        setAlert && setAlert({ severity: "success", status: true, content: await response.json() })
    }

    return (
        <Stack direction='column' spacing={2}>
            <Stack direction='row' spacing={2}>
                <TextField
                    label='Email' 
                    placeholder='Enter Email ...' 
                    name='email' 
                    variant='outlined'
                    type='email'
                    margin='normal'
                    onChange={handleTFChange('email')}
                    value={formData['email']}
                    sx={{
                        flex: 1
                    }}
                />
                <Box py={2}>
                    <Button sx={{height: 1, width:100}} variant='contained' onClick={handleReSendOTP}>Re-Send</Button>
                </Box>
            </Stack>
            <Stack direction='row' spacing={2}>
                <TextField
                    label='OTP' 
                    placeholder='Enter OTP ...' 
                    name='OTP' 
                    variant='outlined'
                    type='text'
                    margin='normal'
                    onChange={handleTFChange('otp')}
                    value={formData['otp']}
                    sx={{
                        flex: 1
                    }}
                />
                <Box py={2}>
                    <Button sx={{height: 1, width:100}} variant='contained' onClick={handleVerify}>Verify</Button>
                </Box>
            </Stack>
        </Stack>
    )
}