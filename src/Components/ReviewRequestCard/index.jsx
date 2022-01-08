
import { useState, useEffect } from 'react'
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
import SendNotification from '../../APIs/SendNotification'


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


export default function ReviewRequestCard({ refreshToggle, reviewReq, snackbar }) {
    const [showComment, setShowComment] = useState(false)
    const [comments, setComments] = useState([])
    const [giveCommentValue, setGiveCommentValue] = useState("")
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            snackbar.loading()
            const submitData = {
                classroomID: params.classroomId,
                requestID: reviewReq.id
            }
            console.log(submitData)
            const response = await classroomAPI.getComments(submitData)
            if(response.ok) {
                snackbar.success()
                const responseData = await response.json()
                setComments(responseData)
                console.log(responseData)
            }
            else {
                snackbar.error(response)
            }
        }
        fetchData()
    }, [])
    const sendGradeUpdateNoti = async (receiver_list, grade, assignment_name) => {

        //When a teacher finalizes a grade composition,
        //create notifications to all students in the class
        const title = `Your grade for assignment '${assignment_name}' has been updated!`;
        const content = `Final grade: ${grade}`;
        const receivers = receiver_list.map(item => ({external_id: item.toString()}));

        //console.log(receivers);
        const response = await SendNotification.sendNotification(title, content, receivers)
        
        //console.log("Notification APi response:", response)
        if(response.status === 201) {
          console.log("Notification sent successfully")
        }
        else {
          console.log("Notification failed", response)
        }
    }
    const handleUpdateGrade = value => async e => {
        snackbar.loading()
        const account = JSON.parse(localStorage.getItem("account"))
        //console.log('reviewReq', reviewReq);
        let _classroomId = params.classroomId
        // Find a way to get userID. The userID create that review request i mean.
        let _studentId = reviewReq.authorID
        let _senderSID = reviewReq.senderSID
        let _assignmentId = reviewReq.assignmentID
        let _score = value
        //console.log(_score)

        const response = await classroomAPI.updateScore(_classroomId, _assignmentId, _score, _studentId);
        
        if(response.ok) {
            snackbar.success()
            refreshToggle()
            sendGradeUpdateNoti([_studentId], _score, reviewReq.assignmentName)
            //console.log("reviewReq", reviewReq);
        }
        else snackbar.error()
    }

    const fetchComments = async () => {
        snackbar.loading()
        const submitData = {
            classroomID: params.classroomId,
            requestID: reviewReq.id
        }
        console.log(submitData)
        const response = await classroomAPI.getComments(submitData)
        if(response.ok) {
            snackbar.success()
            const responseData = await response.json()
            setComments(responseData)
            console.log(responseData)
        }
        else {
            snackbar.error(response)
        }
    }

    const toggleShowComment = () => {
        const currentToggle = !showComment
        setShowComment(currentToggle)
        currentToggle && fetchComments()
    }
    const sendReplyNoti = async (receiver_list, comment) => {

        //When a teacher finalizes a grade composition,
        //create notifications to all students in the class
        const title = "Your grade review has been replied!";
        const content = `A teacher has commented to your request: ${comment}`;
        const receivers = receiver_list.map(item => ({external_id: item.toString()}));

        //console.log(receivers);
        const response = await SendNotification.sendNotification(title, content, receivers)
        
        //console.log("Notification APi response:", response)
        if(response.status === 201) {
          console.log("Notification sent successfully")
        }
        else {
          console.log("Notification failed", response)
        }
    }
    const handleGiveComment = async () => {
        if(!giveCommentValue) return
        snackbar.loading()
        const currentAccount = JSON.parse(localStorage.getItem('account')) ?? {}
        const submitData = {
            author: currentAccount.userID,
            content: giveCommentValue,
            classroomID: params.classroomId,
            requestID: reviewReq.id
        }
        console.log("Submit data of comment: ", submitData)
        const response = await classroomAPI.giveComment(submitData)
        if(response.ok) {
            snackbar.success()
            fetchComments()
            sendReplyNoti([reviewReq.authorID], giveCommentValue);
        }
        else {
            snackbar.error(response)
        }
       
        setGiveCommentValue("")
    }

    const handleGiveCommentValueChange = e => {
        setGiveCommentValue(e.target.value)
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
                    <GradeTextField label="FINAL" variant="standard" handleUpdateGrade={handleUpdateGrade} min={0} max={reviewReq.maxPoint} />
                </Box>
            </CardContent>
            <CardActions>
                <Stack direction={"row"} spacing={0} alignItems={"center"}>
                    <IconButton aria-label="share" onClick={toggleShowComment}>
                        <ChatBubbleOutlineIcon />
                    </IconButton> 
                    <Typography>{comments.length}</Typography>
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
                                        <IconButton onClick={handleGiveComment}>
                                            <SendIcon color="primary"/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                            variant="outlined"
                            value={giveCommentValue}
                            onChange={handleGiveCommentValueChange}
                        />
                    </Box>
                    <Typography margin="2.5rem 0 1rem 0" fontSize={20} variant="button" display="block" gutterBottom>
                        Comments
                    </Typography>
                    <Stack direction={"column"} spacing={1} alignItems={"center"}>
                        {
                            comments.length > 0 ? 
                            comments.map(item => <ReviewRequestComment key={`cmt_${item.id}`} comment={item} />)
                            :
                            <Typography> No comments found. </Typography>
                        }
                    </Stack>
                </Stack>
            </Collapse>
        </Card>
    )
}