import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'
import InputField from '../components/InputField'

const Profile = () => {
    const [password, setPassword] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const { user } = useAuthContext()

    console.log(user)

    // Function to format account creation date
    const formatAccountCreationDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    }

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
                    <img className='profile-pic'src="https://cdn.pixabay.com/photo/2021/06/07/13/45/user-6318003_960_720.png" ></img>
                    <InputField label={"text"} text="Profile Pic Url:" name="categoryName" onChange={handleTextChange}/>
                </div>
                <h2>{user.username}</h2>
                <label>{new Date(user.accountCreationDate).toLocaleString('default', { month: 'long' })} 2024</label>
                <InputField label={"text"} text="Bio:" name="categoryName" onChange={handleTextChange}/>

                <button className="account-change-password-btn" onClick={handleChangePassword}>
                    Change Password
                    </button>
                    <button
                    className="account-delete-account-btn"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    >
                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </button>
            </div>
        </div>

    )
}

export default Profile
