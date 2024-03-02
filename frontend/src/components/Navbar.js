import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/">
                <h2>GUESS THAT IMAGE</h2>
            </Link>
            <div className="nav-links">
                <Link to="/login">
                    <h2>Login</h2>
                </Link>
                <Link to="/signup">
                    <h2>Signup</h2>
                </Link>
            </div>
        </div>
      );
}

export default Navbar