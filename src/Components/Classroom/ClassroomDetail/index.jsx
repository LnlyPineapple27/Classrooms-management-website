import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import classroomAPI from "../../../APIs/classroomAPI";
import { Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../index.scss'


export default function ClassroomDetail() {
    const columns = ['Name', 'Role', 'Dob', 'Email']
    const codeToRole = ['Teacher', 'Teacher', 'Student']
    const [detail, setDetail] = useState({
        name: '',
        section:'',
        description:''
    })
    const [rows, setRows] = useState([])
    let params = useParams()
    useEffect(() => {
        let fetchData = async () => {
            let result = await classroomAPI.getClassroomDetail(params.classroomId)
            console.log(result)
            setDetail(result.data.classroomDetail)
            setRows(result.data.userList)
        }
        fetchData()
    },[])


    return (
        <div className="page-container">
            <div className="page-container__classroom-detail d-flex flex-column align-center">
                <h1 className="page-title">Classroom Detail</h1>
                <div className="classroom-detail">
                    <p className="classroom-detail__element classroom-name">
                        <span className="classroom-detail__element__label">Name: </span>
                        <span className="classroom-detail__element__content">{detail.name}</span>
                    </p>
                    <p className="classroom-detail__element classroom-section">
                        <span className="classroom-detail__element__label">Section: </span>
                        <span className="classroom-detail__element__content">{detail.section}</span>
                    </p>
                    <p className="classroom-detail__element classroom-description">
                        <span className="classroom-detail__element__label">Description: </span>
                        <span className="classroom-detail__element__content">{detail.description}</span>
                    </p>
                </div>
            </div>
            <div className="page-container__button-group">
                <Button className="page-container__button-group__button bg-primary">Invite by Email</Button>
                <Button className="page-container__button-group__button bg-primary">Create Invite Link</Button>
            </div>
            <div className="page-container__users-list">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                {columns.map(item => <TableCell align="right">{item}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell >{index}</TableCell>
                            <TableCell component="th" scope="row" align="right"><strong>{row.Users.name}    </strong></TableCell>
                            <TableCell align="right">{codeToRole[row.Users.UserClassroom.role]}</TableCell>
                            <TableCell align="right">{row.Users.dob}</TableCell>
                            <TableCell align="right">{row.Users.email}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>    
        </div> 
    )    
}