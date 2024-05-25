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
        <div className="login-signup-container">
            <div className="login-signup-col1"></div>
            <div className="login-signup-col2">
                <form className="login" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div>
                        <label>Username:</label>
                        <input className="form-input"
                            type="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />                
                    </div>
                    <div>
                        <label>Password:</label>
                        <input className="form-input"
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
            </div>
        </div>
    )

}

export default Login