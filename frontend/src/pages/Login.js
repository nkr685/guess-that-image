import { useState } from "react"
import { useAccount } from "../hooks/useAccount"
import "../css/pages/Login.css"
import { Link } from "react-router-dom"
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
            <div className="login-signup-col1">
                Test your trivia <br/> knowledge against players <br/> across the world!
            </div>
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
                        <Link to={"/signup"} className="signup-link">Don't have an account? Sign Up!</Link>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )

}

export default Login