import { Stack, TextField, Button, Box } from '@mui/material'
import { React, useState } from 'react'


export default function ChangePasswordForm() {
    return (
        <Stack spacing={2} direction={'column'}>
            <TextField
                label='New Password' 
                placeholder='Enter new password ...' 
                name='newPassword' 
                variant='outlined'
                type='password'
                margin='normal'
                fullWidth
            />
            <TextField
                label='Confirm Password' 
                placeholder='Confirm password ...' 
                name='confirmPassword' 
                variant='outlined' 
                type='password' 
                margin='normal'
                fullWidth
            />
            <Box width={1} display={"flex"} justifyContent={"flex-end"}>
                <Button variant='contained' color='primary'>
                    Change
                </Button>
            </Box>
        </Stack>
    )
}