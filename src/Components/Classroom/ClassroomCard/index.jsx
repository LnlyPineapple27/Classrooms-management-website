import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import '../index.scss'

export default function ClassroomCard({id, header, title, subTitle, content, actionTitle, actionCallback}) {
  return (
    <Box 
      className='classroom-card-box'
    >
      <Card className='classroom-card' variant="outlined" sx={{height:1, width:1}}>
        <React.Fragment>
          <CardActionArea component={Link} to={`/classrooms/${id}`}>
            <CardMedia
              height="100"
              component="img"
              image="https://picsum.photos/100/200"
            />
          </CardActionArea>
            <CardContent className='classroom-card__content'>
                <Typography className='one-line-text' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {header}
                </Typography>
                <Typography className='two-line-text classroom-card__content__title' variant="h5" component="div">
                  <Link to={`/classrooms/${id}`}>{title}</Link>
                </Typography>
                <Typography className='classroom-card__content__subtitle' sx={{ mb: 1.5 }} color="text.secondary">
                  {subTitle}
                </Typography>
                <Typography variant="body2">
                  {content}
                </Typography>
              </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}