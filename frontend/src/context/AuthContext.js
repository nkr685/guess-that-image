import { createContext, useReducer } from 'react'

export const AuthConext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('AuthContext state: ', state)

    return (
        <AuthConext.Provider value={{...state, dispatch}}>
            { children }
        </AuthConext.Provider>
    )
}