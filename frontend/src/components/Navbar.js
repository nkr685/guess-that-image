import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { useAccount } from '../hooks/useAccount';
import '../css/components/Navbar.css';

const Navbar = () => {
    const { logout } = useAccount()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }
    return (
        <div className="navbar">
            <div className='navbar-links'>
                <Link to="/">
                    <h2 style={{marginLeft: 20, fontSize: 30}}>GUESS THAT IMAGE</h2>
                </Link>
                <Link to="/leaderboard">
                    <h2>Leaderboard</h2>
                </Link>
                <Link to="/game" onClick={()=>{if (window.location.pathname === "/game") {window.location.reload();}}}>
                    <h2>Random</h2>
                </Link>
                {user && (
                        <Link to="/upload">
                            <h2>Upload</h2>
                        </Link>     
                    )
                }
            </div>
            {user ? 
                <div className='navbar-links'>
                    <Link to="/profile">
                        <h2>{user.username}</h2>
                    </Link>
                    <Link to="/" style={{marginRight: 20}} onClick={handleClick}>
                        <h2 style={{border: "1px solid red", padding: 2, borderRadius: 8, backgroundColor: 'red'}}>Logout</h2>
                    </Link>
                </div>                
                :
                <div className="navbar-links">
                    <Link to="/login">
                        <h2>Login</h2>
                    </Link>
                    <Link to="/signup">
                        <h2 style={{marginRight: 20}}>Signup</h2>
                    </Link>
                </div>                
            }
        </div>
      );
}

export default Navbar