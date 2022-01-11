import { Stack, TextField, Button, Box } from '@mui/material'
import { React, useState } from 'react'
import sendEmail from '../../sendEmail'

export default function VerifyEmailForm() {
    const [formData, setFormData] = useState({email:"", otp: ""})

    const handleTFChange = name => e => setFormData({...formData, [name]: e.target.value})
    
    const handleReSendOTP = () => {

    }

    const handleSendVerificationEmail = (submited_email, verification_code, purpose_type_string) => {

        console.log('Submitted email: ' + submited_email)
        let templatedEmail = {
            to_email: submited_email,
            verify_code: verification_code,
            purpose_type: purpose_type_string, //"Change Password"
        }
        sendEmail.verification(templatedEmail);
    }

    return (
        <Stack direction='column' spacing={2}>
            <TextField
                label='Email' 
                placeholder='Enter Email ...' 
                name='email' 
                variant='outlined'
                type='email'
                margin='normal'
                onChange={handleTFChange('email')}
                value={formData['email']}
                fullWidth
            />
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
                    <Button sx={{height: 1}} variant='contained' onClick={handleReSendOTP}>Re-Send</Button>
                </Box>
            </Stack>
        </Stack>
    )
}