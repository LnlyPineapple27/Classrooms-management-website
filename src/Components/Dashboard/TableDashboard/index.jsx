import { React, useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import Manager from './Manager'
import TableRow from '@mui/material/TableRow'
import TableRowDashboard from './TableRowDashboard'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TableDashboardDialog from './TableDashboardDialog'

var sampleData = [{
    "id":1, 
    "username": "teacher",
    "password": "teacher",
    "userID": 1,
    "createdDate": "2021-03-03",
    "googleToken": "",
    "role": 1
}, {
    "id":2,
    "username": "student",
    "password": "student",
    "userID": 2,
    "createdDate": "2021-10-24",
    "googleToken": "",
    "role": 2
}, {
    "id":3,
    "username": "admin",
    "password": "admin",
    "userID": 3,
    "createdDate": "2021-03-12",
    "googleToken": "",
    "role": 0
}, {
    "id":4,
    "username": "cespino3",
    "password": "MFTIFbJP",
    "userID": 4,
    "createdDate": "2021-09-27",
    "googleToken": "",
    "role": 2
}, {
    "id":5,
    "username": "ejeandeau4",
    "password": "FcDrE7VMtU",
    "userID": 5,
    "createdDate": "2020-12-31",
    "googleToken": "",
    "role": 2
}, {
    "id":6,
    "username": "zkubik5",
    "password": "t4bRlmb",
    "userID": 6,
    "createdDate": "2021-02-05",
    "googleToken": "",
    "role": 2
}, {
    "id":7,
    "username": "gcrowne6",
    "password": "loOc5PpfB",
    "userID": 7,
    "createdDate": "2021-04-29",
    "googleToken": "",
    "role": 2
}, {
    "id":8,
    "username": "fluna7",
    "password": "AnHHLoC",
    "userID": 8,
    "createdDate": "2021-01-06",
    "googleToken": "",
    "role": 2
}, {
    "id":9,
    "username": "rnuzzetti8",
    "password": "0dwSUm0tACEG",
    "userID": 9,
    "createdDate": "2021-06-01",
    "googleToken": "",
    "role": 2
}, {
    "id":0,
    "username": "fcheeseman9",
    "password": "VEnz8BmmYA",
    "userID": 10,
    "createdDate": "2021-10-07",
    "googleToken": "",
    "role": 2
}]

export default function BasicTable({ tableHeader }) {
    const [headers, setHeaders] = useState([])
    const [data, setData] = useState([])
    const [checkedList, setCheckedList] = useState({})
    const [dialogStatus, setDialogStatus] = useState(false)

    useEffect(() => {
        setHeaders(getHeaders(sampleData))
        setData(sampleData)
        setCheckedList(Object.fromEntries(sampleData.map(row => [row.id, false])))
    }, [])

    const getHeaders = data => {
        if(!isValidData(data)) return []
        return Object.keys(data[0])
    }

    const isValidData = data => {
        return data && typeof(data) == typeof([]) && data.length > 0 && typeof(data[0]) == typeof({}) 
    }

    const handleCheckAllChange = event => {
        setCheckedList(Object.keys(checkedList).reduce(
            (accumulator, current) => {
                accumulator[current] = event.target.checked 
                return accumulator
            }, {})
        )
    }

    const createHeaderCell = header => (
        <TableCell key={`header_${header}`} align="right">
            {header}
        </TableCell>
    )

    const createCheckboxCell = () => (
        <TableCell key="checkbox_all" align='center' onChange={handleCheckAllChange}>
            <Checkbox />
        </TableCell>
    )
    const createHeaderCellList = headers => {
        return [createCheckboxCell()].concat(headers.map(header => createHeaderCell(header)))
    }

    return (
        <Box style={{ padding: 10 }}>
            <TableDashboardDialog 
                status={dialogStatus}
                handleClose={() => setDialogStatus(false)}
                handleSave={() => setDialogStatus(false)}
                title="Create"
                contentText="Enter all required fields to confirm."
                fields={data[0] ?? {}}
            />
            <TableContainer component={Paper}>
                <Box style={{ display: "flex", flexGrow: 1, padding: 10, alignItems: "center"}}>
                    <Typography variant="h4" component="div" gutterBottom>
                        {tableHeader}
                    </Typography>
                    <Manager 
                    style={{marginLeft: "auto"}} 
                    checkedList={checkedList} 
                    handleClickCreate={() => setDialogStatus(true)}
                    handleClickUpdate={() => setDialogStatus(true)}
                    handleClickSort={() => {}}
                    />
                </Box>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {createHeaderCellList(headers)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map(row => (
                        <TableRowDashboard
                        key={row.id}
                        data={row}
                        checkedList={checkedList}
                        setCheckedList={setCheckedList}
                        />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}