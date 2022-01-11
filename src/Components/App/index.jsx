import ClassroomsList from '../Classroom/ClassroomsList'
import TopNavBar from '../TopNavBar'
import { useContext } from 'react'
import LoginForm from '../Login_Register/LoginForm'
import RegisterForm from '../Login_Register/RegisterForm'
import Profile from '../Profile'
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom"
import ClassroomDetail from '../Classroom/ClassroomDetail'
import GradeBoard from '../GradeBoard'
import { AuthProvider, AuthContext, NavbarElProvider } from '../../Context/GlobalContext'
import { NewClassroomAddedProvider} from '../../Context/NewClassroomAddedContext'
import { AddClassroomModalProvider } from '../../Context/AddClassroomModalContext'
import ListAssignment from '../Assignment/ListAssignment'
import Dashboard from '../Dashboard'
import InvitedPage from '../InvitedPage'
import ReviewRequestPage from '../ReviewRequestPage'
import ForgotPasswordPage from '../ForgotPasswordPage'
import VerifyPage from '../VerifyPage'

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
                                <Route path='/forgot/password' element={<ForgotPasswordPage />} />
                                <Route path='/verify/email' element={<VerifyPage />} />
                                <Route path='/admin/dashboard' element={<Dashboard />} />
                                <Route path='/classrooms/:classroomId/assignments' element={<ListAssignment />}/>
                                <Route path='/classrooms/:classroomId/scoreboard' element={<GradeBoard />}/>
                                <Route path='/classrooms/:classroomId/gradereviewrequest' element={<ReviewRequestPage />}/>
                                <Route path='/login' element={<LoginForm />} />
                                <Route path='/classrooms/:classroomId' element={<ClassroomDetail />} />
                                <Route path='/classrooms' element={<ClassroomsList />} />
                                <Route path='/register' element={<RegisterForm />} />
                                <Route path='/profile/:id' element={<Profile />} />
                                <Route path='/invite/:inviteCode' element={<InvitedPage />} />                            
                                <Route path='/' element={ auth ? <ClassroomsList /> : <LoginForm />} /> 
                            </Routes>
                        </NewClassroomAddedProvider>
                    </NavbarElProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}