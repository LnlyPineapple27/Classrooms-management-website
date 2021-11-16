import ClassroomsList from '../Classroom/ClassroomsList';
import TopNavBar from '../TopNavBar'
import { useState, useEffect } from 'react';
import useReloadItems from '../../Hook/useReloadItems';
import LoginForm from '../Login_Register/LoginForm';
import RegisterForm from '../Login_Register/RegisterForm';

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import ClassroomDetail from '../Classroom/ClassroomDetail';
import useLoginStatus from '../../Hook/useLoginStatus';

export default function App() {
    const {isReload, toggle} = useReloadItems();
    const {isLogin, toggleLoginStatus} = useLoginStatus()
    const [auth, setAuth] = useState(!!localStorage.getItem('token'))
    useEffect(() => {
        setAuth(!!localStorage.getItem('token'))
    },[isLogin])
        return (
            <div className='App'>
                <BrowserRouter >
                    <div>
                        <TopNavBar
                            brandName="My Classrooms" 
                            handleLogin={toggleLoginStatus} 
                            handleReload={toggle} isLogin={isLogin}
                        />
                        <Routes> 
                            <Route path='/login' element={<LoginForm handleLogin={toggleLoginStatus}/>} />
                            <Route path='/classrooms/:classroomId' element={<ClassroomDetail />} />
                            <Route path='/classrooms' element={<ClassroomsList isReload={isReload} />} />
                            <Route path='/register' element={<RegisterForm />} />
                            {!auth ? 
                            (<Route path='/' element={<LoginForm handleLogin={toggleLoginStatus}/>} />) : 
                            (<Route path='/' element={<ClassroomsList isReload={isReload} />} />)}
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        );
}