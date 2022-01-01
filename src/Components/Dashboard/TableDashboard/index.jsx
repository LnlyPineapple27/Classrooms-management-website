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
    "name": "Trinh Minh Dat",
    "createdDate": "2021-03-03",
    "email": "SuperIdol@spi.vn",
    "role": 1
}, {
    "id":2,
    "username": "student",
    "password": "student",
    "name": "To Dong Thanh",
    "createdDate": "2021-10-24",
    "email": "Cuutoivoi@cuu.toi.voi",
    "role": 2
}, {
    "id":3,
    "username": "admin",
    "password": "admin",
    "name": "Tran Phuoc Phat",
    "createdDate": "2021-03-12",
    "email": "TPP@abc.cc",
    "role": 0
}, {
    "id":4,
    "username": "cespino3",
    "password": "MFTIFbJP",
    "name": "Dau Buoi Tai Nhan",
    "createdDate": "2021-09-27",
    "email": "TaiNhanVippro@Vip.pro.vn",
    "role": 2
}, {
    "id":5,
    "username": "ejeandeau4",
    "password": "FcDrE7VMtU",
    "name": "Tieu Trinh Trinh",
    "createdDate": "2020-12-31",
    "email": "Onthidaihocvatly12@gmail.com",
    "role": 2
}, {
    "id":6,
    "username": "zkubik5",
    "password": "t4bRlmb",
    "name": "Meta Slave",
    "createdDate": "2021-02-05",
    "email": "GenshinGang@salve.meta.gang",
    "role": 2
}, {
    "id":7,
    "username": "gcrowne6",
    "password": "loOc5PpfB",
    "name": "Gachikoi Ni Nare",
    "createdDate": "2021-04-29",
    "email": "GachikoiGang@gang.sta.ww",
    "role": 2
}, {
    "id":8,
    "username": "fluna7",
    "password": "AnHHLoC",
    "name": "Moe Moe Kyun",
    "createdDate": "2021-01-06",
    "email": "MaidCafeInYourArea1@mcafe.com.jp",
    "role": 2
}, {
    "id":9,
    "username": "rnuzzetti8",
    "password": "0dwSUm0tACEG",
    "name": "Oishiku Nare",
    "createdDate": "2021-06-01",
    "email": "MaidCafeInYourArea2@mcafe.com.jp",
    "role": 2
}, {
    "id":10,
    "username": "fcheeseman9",
    "password": "VEnz8BmmYA",
    "name": "Haachama Chama",
    "createdDate": "2021-10-07",
    "email": "HaachaamaSekaiSaikoNoAidoru@gmail.com",
    "role": 2
}]

export default function BasicTable({ tableHeader }) {
    const [headers, setHeaders] = useState([])
    const [originData, setOriginData] = useState([])
    const [visibleData, setVisibleData] = useState([])
    const [checkedList, setCheckedList] = useState({})
    const [dialogStatus, setDialogStatus] = useState(false)
    const [sortState, setSortSate] = useState(0)
    const [searchKeyword, setSearchKeyWord] = useState("")

    useEffect(() => {
        setHeaders(getHeaders(sampleData))
        setOriginData(sampleData)
        setCheckedList(Object.fromEntries(sampleData.map(row => [row.id, false])))
        setVisibleData(sampleData)
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
        <TableCell key={`header_${header}`} align="left">
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

    const sortData = (data, state) => {
        if(state === 0) return data
        const sortFactor = state === 1 ? 1 : -1
        const compareFunc = (a, b) => sortFactor * (Date.parse(a.createdDate) - Date.parse(b.createdDate))
        const newData = data.slice().sort(compareFunc)
        
        return newData
    }

    const filerData = (data, keyword) => {
        const filterFunc = item => {
            const lowercaseName = item.name.toLowerCase()
            const lowercaseEmail = item.email.toLowerCase()
            const lowercaseKW = keyword.toLowerCase()
            return lowercaseName.includes(lowercaseKW) || lowercaseEmail.includes(lowercaseKW)
        }
        return data.slice().filter(filterFunc)
    }

    const handleSort = () => {
        const newSortState = (sortState + 1) % 3 
        setSortSate(newSortState)
        const filteredData = filerData(originData, searchKeyword)
        const newVData = sortData(filteredData, newSortState)
        setVisibleData(newVData)
    }

    const handleSearch = keyword => {
        setSearchKeyWord(keyword)
        const newVData = sortData(filerData(originData, keyword), sortState)
        setVisibleData(newVData)
    }

    return (
        <Box style={{ padding: 10 }}>
            <TableDashboardDialog 
                status={dialogStatus}
                handleClose={() => setDialogStatus(false)}
                handleSave={() => setDialogStatus(false)}
                title="Create"
                contentText="Enter all required fields to confirm."
                fields={originData[0] ?? {}}
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
                    handleClickSort={handleSort}
                    sortBtnState={sortState}
                    handleSearch={handleSearch}
                    />
                </Box>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {createHeaderCellList(headers)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {visibleData.map(row => (
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