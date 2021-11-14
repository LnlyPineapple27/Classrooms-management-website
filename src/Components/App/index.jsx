import { React, useState, useEffect } from 'react'
import ClassroomsList from '../Classroom/ClassroomsList';
import TopNavBar from '../TopNavBar'

const API_URL = process.env.REACT_APP_API_URL


export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(API_URL)
          .then(res => { 
            console.log(res)
            return res.json()})
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
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