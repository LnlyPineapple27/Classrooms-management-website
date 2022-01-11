                    
import { Stack, TextField, Typography, Button, Box, Paper, Alert, Collapse } from '@mui/material'
import { React, useState } from 'react'
import ChangePasswordForm from './ChangePasswordForm'
import VerifyEmailForm from './VerifyEmailForm'


export default function ForgotPasswordPage() {
    const [alert, setAlert] = useState({ status: false, severity: "error", content: "Sample content."})
    const [verified, setVerified] = useState(false)
    const [vCode, setVCode] = useState("")

    return (
        <Box flexGrow={1} p={5}>
            <Paper
                sx={{
                    p:5,
                    width:500,
                    transform: "translateX(-50%)",
                    position: "relative",
                    left: "50%"
                }} 
                elevation={5}
            >
                <Stack spacing={2} flexGrow={1}  direction={'column'}>
                    <Typography variant='button' fontWeight={1000} fontSize={20} textAlign={"center"}>
                        Forgot Password Form
                    </Typography>
                    <Collapse in={alert.status}>
                        <Alert 
                            variant="outlined"
                            severity={alert.severity} 
                            onClose={() => setAlert({...alert, status: false})}
                        >
                            {alert.content}
                        </Alert>
                    </Collapse>
                    <Collapse in={!verified}>
                        <VerifyEmailForm setAlert={setAlert} setVerified={setVerified} setVCode={setVCode}/>
                    </Collapse>
                    <Collapse in={verified}>
                        <ChangePasswordForm setAlert={setAlert} vCode={vCode}/>
                    </Collapse>
                </Stack>
            </Paper>
        </Box>
    )
}