import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from './Tabs'
import classroomAPI from '../../../../APIs/classroomAPI';


export default function FormDialog({ open, handleClose }) {
    const [importData, setImportData] = React.useState({ 
        option:"Student",
        data: [], 
        classroomId: null,
        assignmentId: null
    })
    const actionApiMap = {
        "Student": classroomAPI.importStudents,
        "Point": classroomAPI.importScores,
    }
    const optionCheckerMap = {
        "Student": x => !x.classroomId,
        "Point": x => !x.classroomId && !x.assignmentId
    }
    const handleImport = async () => {
        if(importData.option === "") {
            setSeverity("error")
            setMessage("Unexpected Error.")
            return
        }
        if(optionCheckerMap[importData.option](importData)) {
            setSeverity("error")
            setMessage("Please select all of fields to import.")
            return
        }
        if(!importData.data[0]) {
            setSeverity("error")
            setMessage("Please upload file to import.")
            return
        }
        console.log(importData.data)
        const response = await actionApiMap[importData.option](importData)
        console.log(response)
        if(!response.ok) {
            setSeverity("error")
            setMessage(`Error ${response.status}: Unexpected Error.`)
            return
        }
        handleClose()
    }
        
    const [severity, setSeverity] = React.useState(null);
    const [message, setMessage] = React.useState(null);
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Import</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To import data by file please select file and click on button import below.
                </DialogContentText>
                <Tabs handleFileImportChange={setImportData} message={message} severity={severity} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleImport}>Import</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}