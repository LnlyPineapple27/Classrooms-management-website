
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
import { Stack, Checkbox, Tooltip } from '@mui/material'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import Collapse from '@mui/material/Collapse'
import ReviewRequestComment from '../ReviewRequestComment'
import Box from '@mui/material/Box';
import { GradeTextField } from '../GradeTextField'


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


export default function ReviewRequestCard({ reviewReq, comments }) {
    const [showComment, setShowComment] = useState(false)

    const toggleShowComment = () => {
        setShowComment(!showComment)
    }

    return (
        <Card elevation={5}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {reviewReq.name ? reviewReq.name[0] : "NaN"}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography variant="overline">Grade review request of <strong>'{reviewReq.assignmentName}'</strong></Typography>}
                subheader={reviewReq.createdAt}
            /> 
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Explain: {reviewReq.explaination}
                </Typography>
                
                <Stack spacing={3} direction="row">
                    <Typography  variant="overline" color="text.secondary">
                        Expect Grade: <strong>{reviewReq.expectGrade}</strong>
                    </Typography>
                    <Typography  variant="overline" color="text.secondary">
                        Real Grade: <strong>{reviewReq.realGrade}/{reviewReq.maxGrade}</strong>
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
                    <GradeTextField min={0} max={reviewReq.maxGrade} />
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
                <Stack direction={"column"} spacing={1}>
                    {mockComments.map(item => <ReviewRequestComment comment={item} />)}
                </Stack>
            </Collapse>
        </Card>
    )
}