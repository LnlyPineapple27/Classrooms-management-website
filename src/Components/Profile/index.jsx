import { React, useState, useEffect, useContext } from 'react'
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { NavbarElContext } from '../../Context/GlobalContext';
import userAPI from '../../APIs/userAPI';
import './index.scss'
import { useParams } from 'react-router-dom';

export default function Profile() {
    const [,setNavbarEl] = useContext(NavbarElContext)
    const [profileInfo, setProfileInfo] = useState({'name':'', 'sex':'', 'dob':'', 'email':''})
    const [visibleInfo, setVisibleInfo] = useState({'name':'', 'sex':'', 'dob':'', 'email':''})
    const [isInfoChanged, setIsInfoChanged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            let id = params.id
            let response = await userAPI.userProfile(id)
            let profileInfoResult = await response.json()
            setIsOwner(profileInfoResult.isOwner)
            setProfileInfo({...profileInfoResult, dob: profileInfoResult.dob.split('T')[0]})
            setVisibleInfo({
                name:profileInfoResult.name,
                sex:profileInfoResult.sex,
                dob:profileInfoResult.dob.split('T')[0],
                email:profileInfoResult.email
            })
            setNavbarEl({})
        }
        fetchData()
        return () => setIsSaved(false)
    },[isSaved, setNavbarEl])

    useEffect(() => {
        const checkChangeInfo = () => {
            let trigger = true
            for(let prop in visibleInfo) {
                trigger = visibleInfo[prop] === profileInfo[prop]
                if(!trigger) break
            }
            return trigger
        }
        
        setIsInfoChanged(!checkChangeInfo())

    }, [visibleInfo, profileInfo])

    useEffect(() => {
        setIsLoading(false)
    }, [profileInfo])

    const handleResetInfo = () => {
        setVisibleInfo({
            name:profileInfo.name,
            sex:profileInfo.sex,
            dob:profileInfo.dob,
            email:profileInfo.email
        })
    }

    const handleSaveInfo = async () => {
        setIsLoading(true)
        let result = await accountAPI.updateProfile(visibleInfo)
        console.log(result)
        setError(result.isOk ? null : result.message)
        setSuccess(!!result.isOk)
        setIsSaved(true)
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
                {error && 
                <Alert 
                    className='info-container__element info-container__element--alert' 
                    severity="error"
                >
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>}
                {success && 
                <Alert 
                    className='info-container__element info-container__element--alert' 
                    severity="success"
                >
                    <AlertTitle>Update Information Successfully</AlertTitle>
                    {success}
                </Alert>}
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
                                    disabled={!isOwner}
                                />
                            )
                            case 'dob':
                                return (
                                <LocalizationProvider 
                                    className='info-container__element' 
                                    dateAdapter={AdapterDateFns}
                                    key={index}
                                >
                                    <DesktopDatePicker
                                        label="Date of birth"
                                        type="date"   
                                        value={visibleInfo[key]}
                                        format="yyyy-MM-dd"
                                        disabled={!isOwner}
                                        onChange={handleChangeDate}
                                        renderInput={(params) => (
                                            <TextField
                                                className='info-container__element'
                                                label="Date of birth"
                                                id="tf_dob"
                                                onChange={handleChangeDate}
                                                {...params} 
                                                disabled={!isOwner}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                )
                            case 'sex':
                                return (
                                    <FormControl key={index} className='info-container__element'>
                                        <InputLabel >SEX</InputLabel>
                                        <Select 
                                            className='info-container__element'
                                            id="sl_sex"
                                            value={visibleInfo[key]}
                                            label={key.slice().toUpperCase()}
                                            onChange={handleChangeSex}
                                            disabled={!isOwner}
                                        >
                                            <MenuItem value={2}>Others</MenuItem>
                                            <MenuItem value={1}>Female</MenuItem>
                                            <MenuItem value={0}>Male</MenuItem>
                                        </Select>
                                    </FormControl>
                                )
                    }})
                }
                {isOwner && (<div className="info-container__element button-group">
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
                </div>)}
            </div>
        </Box>
    )
}
