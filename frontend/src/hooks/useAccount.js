import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAccount = () => {
    // states
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null) // true when starting request, useful for buttons
    const { dispatch } = useAuthContext()

    const signup = async (username, password) => {
        setIsLoading(true)
        setError(null) // resets error if user fixes mistake
        const response = await fetch('/api/Users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // saves use to local storage/browser
            localStorage.setItem('user', JSON.stringify(json)) // stores username and storage, check usercontroller
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null) // resets error if user fixes mistake
        const response = await fetch('/api/Users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // saves use to local storage/browser
            localStorage.setItem('user', JSON.stringify(json)) // stores username and storage, check usercontroller
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }

    const logout = () => {
        // remove token from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: "LOGOUT"})
    }

    return { login, logout, signup, isLoading, error}
}