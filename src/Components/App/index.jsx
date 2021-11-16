import ClassroomsList from '../Classroom/ClassroomsList';
import TopNavBar from '../TopNavBar'

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
    const {isReload, toggle} = useReloadItems();
        return (
            <div className='App'>
                <BrowserRouter >
                    <div>
                        <TopNavBar brandName="My Classrooms" handleReload={toggle}/>
                        <Routes> 
                            <Route path='/login' element={<LoginForm />} />
                            <Route path='/classrooms/:classroomId' element={<ClassroomDetail />} />
                            <Route path='/classrooms' element={<ClassroomsList isReload={isReload} />} />
                            <Route path='/register' element={<RegisterForm />} />
                            <Route path='/' element={<LoginForm />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        );
}