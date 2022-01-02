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



export default function TableDashboard({ enableBan, tableHeader, data, isCrud, isManager, sortProps }) {
    const headers = data ? data[0] ? Object.keys(data[0]) : [] : []
    const originData = data ?? []
    const [visibleData, setVisibleData] = useState(data ?? [])
    const [checkedList, setCheckedList] = useState(Object.fromEntries(data.map(row => [row.id, false])))
    const [dialogStatus, setDialogStatus] = useState(false)
    const [sortState, setSortSate] = useState(0)
    const [searchKeyword, setSearchKeyWord] = useState("")
    
    useEffect(() => {
        setVisibleData(data ?? [])
        setCheckedList(Object.fromEntries(data.map(row => [row.id, false])))
    }, [data])

    const handleCheckAllChange = event => {
        console.log(Object.fromEntries(data.map(row => [row.id, false])))
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
        console.log(sortProps)
        if(state === 0 || !sortProps) return data
        const sortFactor = state === 1 ? 1 : -1
        console.log(sortFactor)
        let compareFunc = (a, b) => sortFactor * (a - b)
        if(sortProps.type.toLowerCase() === "date")
            compareFunc = (a, b) => sortFactor * (Date.parse(a[sortProps.key]) - Date.parse(b[sortProps.key]))
        const newData = data.slice().sort(compareFunc)
        return newData
    }

    const filerData = (data, keyword) => {
        const filterFunc = item => {
            const lowercaseName = item.name ? item.name.toLowerCase() : ""
            const lowercaseEmail = item.email ? item.email.toLowerCase() :""
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
                fields={originData ?? {}}
            />
            <TableContainer component={Paper}>
                <Box style={{ display: "flex", flexGrow: 1, padding: 10, alignItems: "center"}}>
                    <Typography style={{ marginRight: "20px" }} variant="h4" component="div" gutterBottom>
                        {tableHeader}
                    </Typography>
                    <Manager 
                        style={{
                            marginLeft: "auto", 
                            flexGrow: 1,
                            display: "flex",
                            width: "100%",
                        }} 
                        checkedList={checkedList} 
                        handleClickCreate={() => setDialogStatus(true)}
                        handleClickUpdate={() => setDialogStatus(true)}
                        handleClickSort={handleSort}
                        sortBtnState={sortState}
                        handleSearch={handleSearch}
                        isCrud={isCrud}
                        isManager={isManager}
                        enableBan={enableBan}
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