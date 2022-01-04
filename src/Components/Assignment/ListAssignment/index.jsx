import { React, useEffect, useState, useContext, forwardRef } from 'react'
import ItemAssignment from '../ItemAssignment'
import assignmentAPI from '../../../APIs/assignmentAPI'
import { useParams } from 'react-router-dom'
import ErrorPage from '../../ErrorPage'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import '../index.scss'
import { NavbarElContext } from '../../../Context/GlobalContext'
import ClassroomTabs from '../../ClassroomTabs'
import NavbarAddButton from '../../NavbarAddButton'
import AddAssignmentFormDialog from '../AddAssignmentFormDialog'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import classroomAPI from '../../../APIs/classroomAPI'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function DraggableAssignmentItem({ handleFinalizeAssignment, assignment, toggleChangeItem, index, isManager }) {
    return (
        <Draggable key={`draggable_${assignment.id}`} draggableId={index.toString()} index={index}>
            {(provided) => {
                return (
                    <div           
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <ItemAssignment
                            handleFinalizeAssignment={handleFinalizeAssignment}
                            key={`assignment_${index}`} 
                            assignment={assignment} 
                            toggleChangeItem={toggleChangeItem}
                            isManager={isManager}
                        />
                    </div>
                    
                )
            }}
        </Draggable>
    )
}

function AssignmentList({ handleFinalizeAssignment, assignments, toggleChangeItem, isManager }) {
    return (
        assignments.map((item, index) => (
            <DraggableAssignmentItem
                key={`draggable_${index}`}
                assignment={item}
                toggleChangeItem={toggleChangeItem}
                index={index}
                isManager={isManager}
                handleFinalizeAssignment={handleFinalizeAssignment}
            />)
        )
    )
}

export default function DragDropListAssignment() {
    const [error, setError] = useState(null)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const [,setNavbarEl] = useContext(NavbarElContext)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [toggleAddNew, setToggleAddNew] = useState(false)
    const [role, setRole] = useState(2)
    const [snackBarPops, setSnackBarProps] = useState({
        severity: "None",
        content: "None",
        status: false
    })

    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1
            while (k--) {
                arr.push(undefined)
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
        return arr // for testing
    }

    async function handleOnDragEnd(result){
        // console.log(result)
        if (!result.destination) return
        if(result.destination.index === result.source.index) return
        // console.log('Before:\n',items)
        let items_list = items.slice() 
        items_list = array_move(items_list, result.source.index, result.destination.index)
        // console.log('After:\n',items_list)
        setItems(items_list)
        // console.log('After-items:\n', items)

        
        //Sending changed data to APIs
        setSnackBarProps({
            severity: "info",
            content: "Saving arrangement ...",
            status: true
        })
        const response = await assignmentAPI.rearrangeAssignments(params.classroomId, items_list)
        if (!response.ok) {
            console.log('Can not update assignments positions')
            setSnackBarProps({
                severity: "error",
                content: `Error ${response.status}: ${response.statusText}. Can not update assignments positions.`,
                status: true
            })
        }
        else {
            setSnackBarProps({
                severity: "success",
                content: "Saved",
                status: true
            })
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setSnackBarProps({...snackBarPops, status: false})
    }

    const handleFinalizeAssignment = id => async event => {
        let newItems = items.map(item => (item.id === id ? {...item, finalize: (item.finalize + 1) % 2} : {...item}))
        setItems(newItems)
        setSnackBarProps({
            content: "Updating ...",
            severity: "info",
            status:true
        })
        let response = await assignmentAPI.update(params.classroomId, id, newItems.find(item => item.id === id))
        if(response.ok) {
            setSnackBarProps({
                content: "Saved",
                severity: "success",
                status:true
            })
        }
        else {
            setSnackBarProps({
                severity: "error",
                content: `Error ${response.status}: ${response.statusText}. Can not update assignments positions.`,
                status: true
            })
            newItems = items.map(item => (item.id === id ? {...item, finalize: (item.finalize + 1) % 2} : {...item}))
            setItems(newItems)
        }
    }

    useEffect(() => {
        
        async function fetchData() {
            const response = await assignmentAPI.getAllAssignments(params.classroomId)
            if (!response.ok) {
                setError(response.status)
            }
            else {
                const response_data = await response.json()
                setItems(response_data)
                setLoading(false)
                const userId = JSON.parse(localStorage.getItem('account')) ? JSON.parse(localStorage.getItem('account')).userID : 'a'
                const fetchRole = await classroomAPI.getRole(params.classroomId, userId)
                if (fetchRole.ok) {
                    const userRole = await fetchRole.json()
                    setRole(userRole)
                    setNavbarEl({
                        classroomTabs: (<ClassroomTabs value={1} classroomId={params.classroomId} />),
                        addButton: userRole < 2 ? (<NavbarAddButton onClick={() => setOpenAddDialog(true)} />) : null,
                    })
                }
            }
        }
        fetchData()
    }, [params.classroomId, setNavbarEl, toggleAddNew, role])

    if (error)
        return <ErrorPage status={error}/>
    else if (loading)
        return <div>Loading...</div>
    else
        return (
            <Box className='container'>
                <Snackbar open={snackBarPops.status} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                    <Alert onClose={handleCloseSnackBar} severity={snackBarPops.severity}>
                        {snackBarPops.content}
                    </Alert>
                </Snackbar>
                <AddAssignmentFormDialog handleAdded={() => setToggleAddNew(!toggleAddNew)} status={openAddDialog} handleClose={() => setOpenAddDialog(false)} />
                <h1 className="container__page-title">Assignments</h1>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <List className='container__assignment-list'>
                                    <AssignmentList 
                                        assignments={items} 
                                        toggleChangeItem={() => setToggleAddNew(!toggleAddNew)} 
                                        isManager={role === 1}
                                        handleFinalizeAssignment={handleFinalizeAssignment}
                                    />
                                    {provided.placeholder}
                                </List>
                            </div>
                            
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        )
}
