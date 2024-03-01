import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
            <ul className="container">
                <li>
                    <Link to="/">
                        <h2>GUESS THAT IMAGE</h2>
                    </Link>
                </li>
                <li>
                    <Link to="/game">
                        <h2>Play</h2>
                    </Link>                    
                </li>
                <li style= {{float: 'right'}}>
                    <Link to="/login">
                        <h2>Login</h2>
                    </Link>                    
                </li>
                <li style= {{float: 'right'}}>
                    <Link to="/signup">
                        <h2>Signup</h2>
                    </Link>                    
                </li>
            </ul>
    )
}

export default Navbar