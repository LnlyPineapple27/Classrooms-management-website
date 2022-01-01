import { React } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'

const label = { inputProps: { 'aria-label': 'Checkbox' } };

export default function TableRowDashboard({ data, checkedList, setCheckedList }) {
    
    const handleTextBoxChange = id => event => {
        setCheckedList({...checkedList, [`${id}`]: event.target.checked})
    }

    const createCell = (header, field) => {
        return <TableCell key={`${header}_${data.id}`} align="left">{field[header]}</TableCell>
    }

    const createCheckboxCell = data => {
        return (
            <TableCell align="center" key={`checkbox_${data.id}`} >
                <Checkbox onChange={handleTextBoxChange(data.id)} {...label} checked={checkedList[data.id]} />
            </TableCell>
        )
    }

    const createCellList = data => {
        return [createCheckboxCell(data)].concat(Object.keys(data).map(key => createCell(key, data)))
    }

    return <TableRow>{createCellList(data)}</TableRow>
}