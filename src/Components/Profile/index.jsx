import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import accountAPI from '../../APIs/accountAPI';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import './index.scss'

export default function Profile() {
    const [profileInfo, setProfileInfo] = useState({})
    const [visibleInfo, setVisibleInfo] = useState({'name':'', 'sex':'', 'dob':'', 'email':''})
    const [isInfoChanged, setIsInfoChanged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            let result = await accountAPI.userProfile()
            let profileInfoResult = result.data ?? {}
            setProfileInfo(profileInfoResult)
            setVisibleInfo({
                name:profileInfoResult.name,
                sex:profileInfoResult.sex,
                dob:profileInfoResult.dob,
                email:profileInfoResult.email
            })
        }
        fetchData()
    },[])
    useEffect(() => {
        setIsInfoChanged(!checkChangeInfo())
    }, [visibleInfo])

    const checkChangeInfo = () => {
        let trigger = true
        for(let prop in visibleInfo) {
            trigger = visibleInfo[prop] === profileInfo[prop]
            if(!trigger) break
        }
        return trigger
    }

    const handleResetInfo = () => {
        setVisibleInfo({
            name:profileInfo.name,
            sex:profileInfo.sex,
            dob:profileInfo.dob,
            email:profileInfo.email
        })
    }

    const handleSaveInfo = () => {
        console.log(visibleInfo)
    }

    const convertDate = (str) => {
        const date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const handleChange = name => event => {
        setVisibleInfo({ ...visibleInfo, [name]: event.target.value });
    }
    
    const handleChangeDate = date => {
        setVisibleInfo({ ...visibleInfo, dob: convertDate(date) });
    }

    const handleChangeSex = event => {
        setVisibleInfo({ ...visibleInfo, sex: event.target.value });
    }
    return (
        <Box
        className='page-container'
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <div className='info-container'>
            <h1 className='page-title'>Personal Information</h1>

                {Object.keys(visibleInfo).map((key, index) => {
                    switch(key) {
                        default:
                            return (
                                <TextField
                                key={index}
                                id={`tf_${key}`}
                                value={visibleInfo[key]}
                                label={key.slice().toUpperCase()}
                                margin="dense"
                                className='info-container__element'
                                onChange={handleChange(key)}
                                />
                            )
                            case 'dob':
                                return <LocalizationProvider className='info-container__element' dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        key={index}
                                        label="Date of birth"
                                        type="date"   
                                        value={visibleInfo[key]}
                                        inputFormat="MM/dd/yyyy"
                                        onChange={handleChangeDate}
                                        renderInput={(params) => <TextField
                                                                    className='info-container__element'
                                                                    label="Date of birth"
                                                                    id="tf_dob"
                                                                    {...params} />}
                                    />
                                </LocalizationProvider>;
                            case 'sex':
                                return (
                                    <FormControl className='info-container__element'>
                                        <InputLabel >SEX</InputLabel>
                                        <Select className='info-container__element'
                                                        id="sl_sex"
                                                        value={visibleInfo[key]}
                                                        label={key.slice().toUpperCase()}
                                                        key={index}
                                                        onChange={handleChangeSex}>
                                                    <MenuItem value={2}>Others</MenuItem>
                                                    <MenuItem value={1}>Female</MenuItem>
                                                    <MenuItem value={0}>Male</MenuItem>
                                                </Select>
                                    </FormControl>
                                )
                    }

                })}
                <div className="info-container__element button-group">
                    <Button
                    className='info-container__element button-group__button'
                    variant="contained" 
                    color="primary" 
                    endIcon={<RestoreIcon />}
                    onClick={handleResetInfo}
                    >
                        Restore
                    </Button>
                    <LoadingButton
                    className='info-container__element button-group__button'
                    variant="contained" 
                    color="success" 
                    disabled={!isInfoChanged}
                    endIcon={<SaveIcon />}
                    onClick={handleSaveInfo}
                    loading={isLoading}
                    loadingPosition="end"
                    >
                        Save
                    </LoadingButton>
                </div>
            </div>
        </Box>
    )
}