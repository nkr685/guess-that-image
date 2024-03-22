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
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Signup</h3>
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
                <button disabled={isLoading}>Signup</button>
                {error && <div className="error">{error}</div>}                
            </div>

        </form>
    )

}

export default Signup