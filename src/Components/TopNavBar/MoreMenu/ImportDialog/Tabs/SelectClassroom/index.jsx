import { React } from "react"
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectClassroom({ classrooms, value, onChange }) {
    return (
        <div className="tab-panel__content__select-control">
            <span className="tab-panel__content__select-control__label">Classroom:</span>
            <FormControl className="tab-panel__content__select-control__select">
                <Select
                value={value}
                onChange={onChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={-1}>None</MenuItem>
                    {classrooms.map(classroom => <MenuItem key={`classroom_${classroom.id}`} value={classroom.id}>{classroom.name}</MenuItem>)}
                </Select>
                <FormHelperText>Select Classroom</FormHelperText>
            </FormControl>
        </div>
    )
}