import { React, useState, useEffect, useContext } from 'react'
import ClassroomCard from '../ClassroomCard'
import classroomAPI from '../../../APIs/classroomAPI';
import '../index.scss'
import { NewClassroomAddedContext } from '../../../Context/NewClassroomAddedContext';
import { NavbarElContext } from '../../../Context/GlobalContext';

export default function ClassroomsList () {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [add,] = useContext(NewClassroomAddedContext)
    const [,setNavbarEl] = useContext(NavbarElContext)

    useEffect(() => {
        async function fetchData() {
          let result = await classroomAPI.getAllClassrooms()
          setIsLoaded(true)
          console.log(result)
            
          if (result.isOk)
            setItems(result.data.classrooms)
          else
            setError(result)
        }
        setNavbarEl({addClassroom: true})
        fetchData()
        
    }, [add])


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
                {items.map((item, index) => (
                    <ClassroomCard
                        id={item.id}
                        key={item.id}
                        header={item.description}
                        title={item.name}
                        subTitle={item.section}
                        actionTitle='Detail'
                        imgHref={`https://picsum.photos/id/${index}/100/200`}
                    />
                ))}
            </div>)
    }
}