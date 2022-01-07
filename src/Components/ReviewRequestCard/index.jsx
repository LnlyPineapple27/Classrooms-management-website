
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { InputBase, Stack, Tooltip, } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import Collapse from '@mui/material/Collapse'
import ReviewRequestComment from '../ReviewRequestComment'
import Box from '@mui/material/Box'
import { GradeTextField } from '../GradeTextField'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SendIcon from '@mui/icons-material/Send'
import classroomAPI from '../../APIs/classroomAPI'
import assignmentAPI from '../../APIs/assignmentAPI'
import { useParams } from 'react-router-dom'


const mockComments = [
    {
        authorName:"authorName",
        content: "content sieu toa",
        createdAt: "CreatedAt"
    },    {
        authorName:"authorName",
        content: "content sieu toa",
        createdAt: "CreatedAt"
    },    {
        authorName:"authorName",
        content: "content sieu toa",
        createdAt: "CreatedAt"
    },    {
        authorName:"authorName",
        content: "content sieu toa",
        createdAt: "CreatedAt"
    },
]


export default function ReviewRequestCard({ refreshToggle, reviewReq, comments, snackbar }) {
    const [showComment, setShowComment] = useState(false)
    const params = useParams();

    const handleUpdateGrade = value => async e => {
        snackbar.loading()
        const account = JSON.parse(localStorage.getItem("account"))
        const response = await assignmentAPI.update(
            params.classroomId, 
            reviewReq.assignmentID, {
                userId: account.userID,
                classroomId: params.classroomId, 
                assignmentId: reviewReq.assignmentID,
                score: value
            }
        )
        
        if(response.ok) {
            snackbar.success()
            refreshToggle()
        }
        else snackbar.error()
    }

    const toggleShowComment = () => {
        setShowComment(!showComment)
    }

    return (
        <Card elevation={5}>
            <CardHeader
                avatar={
                    <Tooltip placement='top' title={reviewReq.authorName ?? "NaN"}> 
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {reviewReq.authorName ? reviewReq.authorName[0] : "NaN"}
                        </Avatar>
                    </Tooltip>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={(
                    <Typography variant="overline">
                        Grade review request of <strong>'{reviewReq.assignmentName}'</strong> by '{reviewReq.authorName}'
                    </Typography>
                )}
                subheader={reviewReq.createdAt.split("T")[0]}
            /> 
            <CardContent>
                <Typography sx={{color: "black"}} variant="body" color="text.secondary">
                    {reviewReq.explaination}
                </Typography>
                
                <Stack sx={{mt:3}} spacing={3} direction="row">
                    <Typography  variant="overline" color="text.secondary">
                        Expect Grade: <strong>{reviewReq.expectGrade}</strong>
                    </Typography>
                    <Typography  variant="overline" color="text.secondary">
                        Real Grade: <strong>{reviewReq.score}/{reviewReq.maxPoint}</strong>
                    </Typography>
                </Stack>
                
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <GradeTextField handleUpdateGrade={handleUpdateGrade} id={reviewReq.id} min={0} max={reviewReq.maxPoint} />
                </Box>
            </CardContent>
            <CardActions>
                {/* <Tooltip title="Finalize" placement='top'>
                    <Checkbox
                        icon={<FactCheckOutlinedIcon fontSize='medium' />}
                        checkedIcon={<FactCheckIcon fontSize='medium' />}
                        onClick={() => {}}
                    />
                </Tooltip> */}
                <Stack direction={"row"} spacing={0} alignItems={"center"}>
                    <IconButton aria-label="share" onClick={toggleShowComment}>
                        <ChatBubbleOutlineIcon />
                    </IconButton> 
                    <Typography>{mockComments.length}</Typography>
                </Stack>
            </CardActions>
            <Collapse in={showComment} timeout="auto" sx={{ p:3 }} unmountOnExit>
                <Stack direction="column">
                    <Box>
                        <Typography fontSize={20} variant="button" display="block" gutterBottom>
                            Give comment
                        </Typography>
                        <TextField
                            multiline
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <SendIcon color="primary"/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                            variant="outlined"
                        />
                    </Box>
                    <Typography margin="2.5rem 0 1rem 0" fontSize={20} variant="button" display="block" gutterBottom>
                        Comments
                    </Typography>
                    <Stack direction={"column"} spacing={1}>
                        {mockComments.map(item => <ReviewRequestComment comment={item} />)}
                    </Stack>
                </Stack>
            </Collapse>
        </Card>
    )
}