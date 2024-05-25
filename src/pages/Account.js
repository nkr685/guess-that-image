import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'
import InputField from '../components/InputField.js'
import { useSend } from '../hooks/useSend.js'
import { useAccount } from '../hooks/useAccount.js'

const Account = () => {
    const { user } = useAuthContext()
    const { modifyUserState } = useAccount()
    const { modifyUser } = useSend()

    const [ userData, setUserData] = useState({
        username: user.username,
        profilePic: user.profilePic ? user.profilePic : "https://cdn.pixabay.com/photo/2021/06/07/13/45/user-6318003_960_720.png",
        bio: user.bio ? user.bio : "I'm a new player!"
    })
    const [error, setError] = useState("")
    const [errorList, setErrorList] = useState([])

    const handleUpdateUser = async () => {
        console.log(user)
        modifyUserState(await modifyUser(user._id, userData))
    }

    const handleTextChange = (e) => {
        setUserData({...userData, [e.target.name]:e.target.value})
    }

    return (
        <div className="upload-container">
            <div className="upload-form">
                <h1 className='upload-heading'>Account Page</h1>
                <div className='column_center'>
                    <img className='profile-pic' src={userData.profilePic} ></img>
                </div>
                <InputField label={"text"} text="Change Username:" name="username" defaultValue={userData.username} onChange={handleTextChange} error={error} errorList={errorList}/>
                <InputField label={"text"} text="Profile Picture URL:" name="profilePic" defaultValue={userData.profilePic} onChange={handleTextChange} error={error} errorList={errorList}/>
                <InputField label={"text"} text="Bio:" name="bio" defaultValue={userData.bio} onChange={handleTextChange} error={error} errorList={errorList}/>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>
                        <Link to="/profile">    
                            <button className="account-set-pic-btn" onClick={handleUpdateUser}>
                                Save Changes
                            </button>  
                            <button className="account-delete-account-btn">
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
