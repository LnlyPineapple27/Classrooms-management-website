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

export { AuthContext, AuthProvider }