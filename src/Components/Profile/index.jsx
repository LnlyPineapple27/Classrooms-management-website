import { React, useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import accountAPI from '../../APIs/accountAPI'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import RestoreIcon from '@mui/icons-material/Restore'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { NavbarElContext } from '../../Context/GlobalContext'
import userAPI from '../../APIs/userAPI'
import './index.scss'
import { useParams } from 'react-router-dom'
import { Stack } from '@mui/material'
import * as sIdAPI from '../../APIs/sidAPI'


export default function Profile() {
    const profileInfoKeys = ['name', 'sex', 'dob', 'email', 'role',]
    const visibleDataKeys = [...profileInfoKeys,'SID']
    const codeToRole = ["Admin", "Lecturer", "Student"]
    const roleToCode = codeToRole.reduce((acc, curr, index) => ({...acc, [curr]:index}), {})
    const [,setNavbarEl] = useContext(NavbarElContext)
    const [profileInfo, setProfileInfo] = useState({})
    const [visibleInfo, setVisibleInfo] = useState({'name':'', 'sex':'', 'dob':'', 'email':'', 'role':'','SID':''})
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
            let originData = {...profileInfoResult, ...{
                role: codeToRole[profileInfoResult.role],
                dob:profileInfoResult.dob.split('T')[0]},
                SID: profileInfoResult.SID ?? "Not mapped yet."
            }
            setIsOwner(profileInfoResult.isOwner)
            setProfileInfo(originData)
            setVisibleInfo(visibleDataKeys.reduce((acc, curr) => ({...acc, [curr]: originData[curr]}), {}))
            // console.log(visibleDataKeys.reduce((acc, curr) => ({...acc, [curr]: originData[curr]}), {}))

            setNavbarEl({})
        }
        fetchData()
        return () => setIsSaved(false)
    },[isSaved, setNavbarEl])

    useEffect(() => {
        
        setIsInfoChanged(profileInfoKeys.map(key => visibleInfo[key] !== profileInfo[key]).some(checker => checker))

    }, [visibleInfo, profileInfo])

    useEffect(() => {
        setIsLoading(false)
    }, [profileInfo])

    const handleResetInfo = () => {
        setVisibleInfo(visibleDataKeys.reduce((acc, curr) => ({...acc, [curr]: profileInfo[curr]}), {}))
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
        const date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2)
        return [date.getFullYear(), mnth, day].join("-")
    }

    const handleChange = name => event => {
        setVisibleInfo({ ...visibleInfo, [name]: event.target.value })
    }
    
    const handleChangeDate = date => {
        setVisibleInfo({ ...visibleInfo, dob: convertDate(date) })
    }

    const handleChangeSex = event => {
        setVisibleInfo({ ...visibleInfo, sex: event.target.value })
    }

    const handleMapSID = async event => {
        setIsLoading(true)
        let result = await sIdAPI.updateOrCreateIfNotExist(visibleInfo.SID, profileInfo.id, profileInfo.name)
        setError(result.ok ? null : `Error ${result.status}: ${result.statusText}`)
        setSuccess(!!result.ok)
        setIsSaved(true)
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
                <h1 className='page-title'>{`${profileInfo.role} Information`}</h1>
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
                {roleToCode[profileInfo.role] === 2 && (
                <Stack direction="row" sx={{ display:"flex", width:1, ".MuiTextField-root": {m:0} }} space={2}>
                    <TextField
                        id="tf_sid"
                        value={visibleInfo.SID}
                        label="STUDENT ID"
                        margin="normal"
                        onChange={handleChange("SID")}
                        disabled={!isOwner}
                        sx={{ flex:1, }}
                    />
                    {isOwner && (<Button 
                            sx={{ml: 1}} 
                            variant="contained" 
                            color="info"
                            disabled={profileInfo.SID === visibleInfo.SID}
                            onClick={handleMapSID}
                        >
                            Map
                        </Button>
                    )}
                </Stack>)}
                {Object.keys(visibleInfo).map((key, index) => {
                    switch(key) {
                        default:
                            return (
                                <TextField
                                    key={index}
                                    id={`tf_${key}`}
                                    value={visibleInfo[key]}
                                    label={key.slice().toUpperCase()}
                                    margin="normal"
                                    className='info-container__element'
                                    onChange={handleChange(key)}
                                    disabled={!isOwner}
                                    mt={1}
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
                                                mt={1}
                                                disabled={!isOwner}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                )
                            case 'sex':
                                return (
                                    <FormControl mt={1}  key={index} className='info-container__element'>
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
                            case 'email':
                            case 'SID': 
                            case 'role':
                                break

                    }})
                }
                <Stack direction="row" sx={{ display:"flex", width:1, ".MuiTextField-root": {m:0} }} space={2}>
                        <TextField
                            id={`tf_email`}
                            value={visibleInfo['email']}
                            label={'Email'}
                            margin="normal"
                            className='info-container__element'
                            onChange={handleChange('email')}
                            disabled={!isOwner}
                            type='email'
                            sx={{
                                flexGrow:1,
                            }}
                        />
                        <Button 
                            sx={{ml: 1}} 
                            variant="contained" 
                            color="info"
                            disabled={!isOwner && profileInfo['validate']}
                        >
                            Verify 
                        </Button>
                </Stack>
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
