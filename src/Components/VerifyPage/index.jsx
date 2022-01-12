import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import userAPI from '../../APIs/userAPI'

export default function VerifyPage() {
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const [error, setError] = useState("")
    const [content, setContent] = useState("Verifying ...")

    useEffect(() => {
        const email = query.get('email')
        const vCode = query.get('code')
        const requestVerify = async () => {
            const response = await userAPI.verifyEmail({ email: email, vCode: vCode })
            setContent("")
            if(!response.ok) return setError(`Error ${response.status}: ${response.statusText}.`)
            console.log()
            const responseData = await response.json()
            setContent(responseData.msg)
        }
        requestVerify()
    }, [])

    return (
        <Box>
            <Typography>
                {error}
            </Typography>
            <Typography>
                {content}
            </Typography>
        </Box>
    )
}