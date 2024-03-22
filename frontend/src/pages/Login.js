import { useState } from "react"
import { useAccount } from "../hooks/useAccount"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {login, error, isLoading} = useAccount()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username,password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div>
                <label>Username:</label>
                <input
                    type="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />                
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />                
            </div>

            <div>
                <button disabled={isLoading}>Login</button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default Login