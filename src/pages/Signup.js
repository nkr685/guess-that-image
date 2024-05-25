import { useState } from "react"
import { useAccount } from "../hooks/useAccount"

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signup, error, isLoading} = useAccount()
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username, password)
    }

    return (
        <div className="login-signup-container">
            <div className="login-signup-col1"></div>
            <div className="login-signup-col2">
                <form className="signup" onSubmit={handleSubmit}>
                    <h2>Signup</h2>
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
                        <button disabled={isLoading}>Signup</button>
                        {error && <div className="error">{error}</div>}                
                    </div>

                </form>                
            </div>

        </div>

    )

}

export default Signup