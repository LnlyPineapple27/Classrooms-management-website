import { React, useState, useEffect } from 'react'
import ClassroomsList from '../Classroom/ClassroomsList';
import TopNavBar from '../TopNavBar'
import classroomAPI from '../../APIs/classroomAPI';

export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
          let result = await classroomAPI.getAllClassrooms()
          setIsLoaded(true)
  
          if (result.isOk)
            setItems(result.data)
          else
            setError(result)
        }
        fetchData()
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <TopNavBar brandName="My Classrooms" />
                <ClassroomsList items={items}/>
            </div>
        );
    }
}