import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'
import { Link } from 'react-router-dom'


const Profile = () => {
    const [password, setPassword] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const { user } = useAuthContext()
    const [error, setError] = useState("")
    const [errorList, setErrorList] = useState([])

    console.log(user)

    const handleChangePassword = () => {
        console.log('change passwoerd')
    }

    const handleDeleteAccount = () => {
        console.log('delete account')
    }

    const handleTextChange = (e) => {
        console.log(e.target.value)
    }

    return (
        <div className="upload-container">
            <div className="upload-form">
                <div className='profile-pic-container'>
                    <img className='profile-pic' src={user.profilePic ? user.profilePic : "https://cdn.pixabay.com/photo/2021/06/07/13/45/user-6318003_960_720.png"} ></img>
                    <div className='profile_column'> 
                        <h1>{user.username}</h1>
                        <h3>Member since: {new Date(user.accountCreationDate).toLocaleString('default', { month: 'long' })} 2024</h3>
                        <h3>I'm a new player!</h3>
                    </div>
                    <div className='profile_column'> 
                        <h3>Quizzes Played</h3>
                        <label style={{alignItems: 'center'}}>0</label>
                    </div>
                    <div className='profile_column'> 
                        <h3>Quizzes Created</h3>
                        <label>0</label>
                    </div>
                </div>

                <div className='column_center'>
                    {/* <button className="account-change-password-btn" onClick={handleChangePassword}>
                        Change Password
                    </button> */}
                    <Link to="/account">
                        <button className='account-change-password-btn'>Modify Account</button>
                    </Link>
                    {/* <button className="account-delete-account-btn" onClick={handleDeleteAccount} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </button>                     */}
                </div>

            </div>
        </div>

    )
}

export default Profile
