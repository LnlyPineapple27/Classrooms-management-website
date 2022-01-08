
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'


export default function ReviewRequestComment({ comment }) {
    return (
        <Card elevation={1} sx={{ width: 1}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {comment.authorName ? comment.authorName[0] : "NaN"}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={comment.authorName}
                subheader={`${comment.createdAt.split("T")[0]} at ${comment.createdAt.split("T")[1].substring(0, 8)}`}
            /> 
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {comment.content}
                </Typography>
            </CardContent>
        </Card>
    )
}