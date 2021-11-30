import ClassroomsList from '../Classroom/ClassroomsList';
import TopNavBar from '../TopNavBar'
import { useContext } from 'react';
import LoginForm from '../Login_Register/LoginForm';
import RegisterForm from '../Login_Register/RegisterForm';
import Profile from '../Profile';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import ClassroomDetail from '../Classroom/ClassroomDetail';
import ClassroomDetailCard from '../Classroom/ClassroomDetailCard';
import GradeBoard from '../GradeBoard';
import { AuthProvider, AuthContext, NavbarElProvider } from '../../Context/GlobalContext'
import { NewClassroomAddedProvider} from '../../Context/NewClassroomAddedContext';
import { AddClassroomModalProvider } from '../../Context/AddClassroomModalContext'
import ListAssignment from '../Assignment/ListAssignment'

export default function App() {
    const [auth,] = useContext(AuthContext)

    return (
        <div className='App'>
            <BrowserRouter >
                <AuthProvider>
                    <NavbarElProvider>
                        <NewClassroomAddedProvider>
                            <AddClassroomModalProvider>
                                <TopNavBar />
                            </AddClassroomModalProvider>
                            <Routes> 
                                <Route path='/classrooms/:classroomId/assignments' element={<ListAssignment />}/>
                                <Route path='/classrooms/:classroomId/scoreboard' element={<GradeBoard />}/>
                                <Route path='/login' element={<LoginForm />} />
                                <Route path='/classrooms/:classroomId' element={<ClassroomDetail />} />
                                <Route path='/classrooms' element={<ClassroomsList />} />
                                <Route path='/register' element={<RegisterForm />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/invite/:inviteCode' element={<ClassroomDetailCard />} />                            
                                <Route path='/' element={ auth ? <ClassroomsList /> : <LoginForm />} /> 
                            </Routes>
                        </NewClassroomAddedProvider>
                    </NavbarElProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}