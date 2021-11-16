import { React, useState, useEffect } from 'react'
import ClassroomsList from '../Classroom/ClassroomsList';
import TopNavBar from '../TopNavBar'
import classroomAPI from '../../APIs/classroomAPI';
import useReloadItems from '../../Hook/useReloadItems';
import LoginForm from '../Login_Register/LoginForm';
import RegisterForm from '../Login_Register/RegisterForm';

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import ClassroomDetail from '../Classroom/ClassroomDetail';

export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const {isReload, toggle} = useReloadItems();

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
    }, [isReload])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='App'>
                <TopNavBar brandName="My Classrooms" handleReload={toggle}/>
                <BrowserRouter >
                    <div>
                        <Routes>
                            <Route path='/classrooms/:classroomId' element={<ClassroomDetail />} />
                            <Route path='/classrooms' element={<ClassroomsList items={items} />} />
                            <Route path='/register' element={<RegisterForm />} />
                            <Route path='/login' element={<LoginForm />} />
                            <Route path='/' element={<LoginForm />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}