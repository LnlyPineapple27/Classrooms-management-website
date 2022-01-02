import { React, useState, useEffect, useContext } from 'react'
import ClassroomCard from '../ClassroomCard'
import classroomAPI from '../../../APIs/classroomAPI';
import '../index.scss'
import { NewClassroomAddedContext } from '../../../Context/NewClassroomAddedContext';
import { NavbarElContext } from '../../../Context/GlobalContext';
import NavbarAddButton from '../../NavbarAddButton';
import FormModal from '../FormModal';

export default function ClassroomsList () {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [add,] = useContext(NewClassroomAddedContext)
    const [,setNavbarEl] = useContext(NavbarElContext)
    const [openAddModal, setOpenAddModal] = useState(false)

    useEffect(() => {
        const cookData = raw => {
            return raw.map(item => ({...item, createdAt: item.createdAt.split("T")[0]}))
        }

        async function fetchData() {
            let userId = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')).userID : null
            let result = await classroomAPI.getAllClassrooms(userId)
            setIsLoaded(true)
            let raw = result.data.classrooms
            let cooked = cookData(raw)    
            console.log(cooked)
            if (result.isOk)
                setItems(cooked)
            else
                setError(result)
        }
        setNavbarEl({addButton: (<NavbarAddButton ariaLabel='Add Classroom' onClick={() => setOpenAddModal(true)} />)})
        fetchData()
        
    }, [add, setNavbarEl])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div 
                className='classrooms-list' 
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    marginLeft: '-10px',
                    padding: '1rem 0'
                }}
            >
                <FormModal 
                    header="Add Class"
                    openStatus={openAddModal}
                    handleClose={() => setOpenAddModal(false)}
                />
                {items.map((item, index) => (
                    <ClassroomCard
                        id={item.id}
                        key={item.id}
                        header={item.section}
                        title={item.name}
                        subTitle={item.description}
                        createdAt={item.createdAt}
                        creator={item.creator}
                        actionTitle='Detail'
                        imgHref={`https://picsum.photos/id/${index}/100/200`}
                    />
                ))}
            </div>)
    }
}