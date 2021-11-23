import { React, useEffect, useState, useContext } from 'react'
import ItemAssignment from '../ItemAssignment'
import assignmentAPI from '../../../APIs/assignmentAPI'
import { useParams } from 'react-router-dom'
import ErrorPage from '../../ErrorPage'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import '../index.scss'
import { NavbarElContext } from '../../../Context/GlobalContext';
import ClassroomTabs from '../../ClassroomTabs'
import NavbarAddButton from '../../NavbarAddButton'
import AddAssignmentFormDialog from '../AddAssignmentFormDialog'

export default function ListAssignment() {
    const [error, setError] = useState(null)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const [,setNavbarEl] = useContext(NavbarElContext)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [toggleAddNew, setToggleAddNew] = useState(false)

    useEffect(() => {
        
        async function fetchData() {
            const response = await assignmentAPI.getAllAssignments(params.classroomId)
            
            if (!response.ok) {
                setError(response.status)
                setItems([])
            }
            else {
                const response_data = await response.json()
                console.log(response_data)
                setItems(response_data)
                setLoading(false)
            }
        }
        setNavbarEl({
            classroomTabs: (<ClassroomTabs value={1} classroomId={params.classroomId} />),
            addButton: (<NavbarAddButton onClick={() => setOpenAddDialog(true)} />)
        })
        fetchData()
    }, [params.classroomId, setNavbarEl, toggleAddNew])

    if (error)
        return <ErrorPage status={error}/>
    else if (loading)
        return <div>Loading...</div>
    else
        return (
            <Box className='container'>
                <AddAssignmentFormDialog handleAdded={() => setToggleAddNew(!toggleAddNew)} status={openAddDialog} handleClose={() => setOpenAddDialog(false)} />
                <h1 className="container__page-title">Assignments</h1>
                <List className='container__assignment-list'>{
                    items.map((item, index) => (<ItemAssignment key={index} assignment={item} />))
                }</List>
            </Box>
        )
}
