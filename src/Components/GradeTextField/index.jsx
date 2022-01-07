
import TextField from '@mui/material/TextField'
import { useState } from 'react'

export function GradeTextField(props) {
    const { type, max, min, handleUpdateGrade, ...remainProps } = props
    const [value, setValue] = useState(0)

    const handleChange = (e) => {
        let newValue = Number(e.target.value)

        if(max !== null && newValue > max) newValue = max
        else if(min !== null && newValue < min) newValue = min

        setValue(newValue)
    }

    return (
        <TextField 
            value={value} 
            type="number" 
            {...remainProps} 
            onChange={handleChange}
            onBlur={e => {
                const capture = value
                setValue(0)
                handleUpdateGrade(capture)(e)
            }}
        />
    )
}