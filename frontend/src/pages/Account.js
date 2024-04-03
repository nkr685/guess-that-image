import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'
import InputField from '../components/InputField.js'

const Account = () => {
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
                <h1 className='upload-heading'>Account Page</h1>
                <div className='column_center'>
                    <img className='profile-pic' src={user.profilePic ? user.profilePic : "https://cdn.pixabay.com/photo/2021/06/07/13/45/user-6318003_960_720.png"} ></img>
                </div>
                <InputField label={"text"} text="Change Username:" name="categoryName" defaultValue={user.username} onChange={handleTextChange} error={error} errorList={errorList}/>
                <InputField label={"text"} text="Profile Picture URL:" name="categoryName" defaultValue={user.profilePic} onChange={handleTextChange} error={error} errorList={errorList}/>
                <InputField label={"text"} text="Bio:" name="categoryName" defaultValue={"I'm a new player!"} onChange={handleTextChange} error={error} errorList={errorList}/>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>
                        <Link to="/profile">    
                            {/* <button className="account-set-pic-btn" onClick={handleChangePassword}>
                                Save Changes
                            </button>   */}
                            <button className="account-delete-account-btn" onClick={handleChangePassword}>
                                Cancel
                            </button>    
                        </Link>                    
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Account
