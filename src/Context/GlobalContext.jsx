import { React, useState, createContext } from 'react'

const AuthContext = createContext([!!localStorage.getItem('token'), () => {}])

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(!!localStorage.getItem('token'))

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const NavbarElContext = createContext([{
    classroomTabs: null,
    addButton: null,
}, () => {}])

const NavbarElProvider = ({children}) => {
    const [navbarEl, setNavbarEl] = useState({
        classroomTabs: null,
        addButton: null,
    })

    return <NavbarElContext.Provider value={[navbarEl, setNavbarEl]}>
        {children}
    </NavbarElContext.Provider>
}

export { AuthContext, AuthProvider, NavbarElContext, NavbarElProvider }