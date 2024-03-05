import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }
    return (
        <div className="navbar">
            <div className='navbar'>
                <Link to="/" style={{fontSize: 20}}>
                    <h2>GUESS THAT IMAGE</h2>
                </Link>
                <Link to="/leaderboard">
                    <h2>Leaderboard</h2>
                </Link>
                {user && (
                        <Link to="/upload">
                            <h2>Upload</h2>
                        </Link>     
                    )
                }
            </div>

            {user  && (
                <div className='nav-links'>
                    <Link to="/account">

                        <h2>{user.username}</h2>
                    </Link>
                    <button onClick={handleClick}>Log Out</button>
                </div>                
            )}
            {!user && (
            <div className="nav-links">
                <Link to="/login">
                    <h2>Login</h2>
                </Link>
                <Link to="/signup">
                    <h2>Signup</h2>
                </Link>
            </div>                
            )}

        </div>
      );
}

export default Navbar