import { React } from 'react'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box } from '@mui/material'


const lecturesMock = ["Trieu Trinh Trinh, To Tien Dat, Tran Minh Loc"]


export default function ClassroomDetailCard(props) {
    return (
        <Box component="div">
            <Paper 
                elevation={3} 
                style={{ display:"flex", flexDirection:"column", justifyContent: "flex-end" }}
            >
                <Accordion TransitionProps={{ unmountOnExit: true }} expanded>
                    <AccordionSummary
                        expandIcon={<InfoOutlinedIcon fontSize='medium'/>}
                        aria-controls="panel1a-content"
                        id="classroomHeader"
                    >
                        <Typography 
                            variant="button" 
                            sx={{ flexShrink: 0 }} 
                            style={{ fontSize: 24 , marginRight: "5%"}}
                        >
                            {props.name}
                        </Typography>
                        <Typography 
                            sx={{ color: 'text.secondary' }} 
                            style={{ fontSize: 20, margin: "auto 0" }}
                        >
                            {props.section}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            {props.description}
                        </Typography>
                        <Typography variant="caption" display="block" style={{ fontSize: 18 }} gutterBottom>
                            {`Members: ${props.members ?? "UNK"}`}
                        </Typography>
                        <Typography variant="caption" display="block" style={{ fontSize: 18 }} gutterBottom>
                            {`Lecturers: ${(props.lecturers ?? ["UNK"]).reduce((prev, current, index) => `${prev}, ${current}`)}`}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Paper>
            {props.children}
        </Box>
    )
} 