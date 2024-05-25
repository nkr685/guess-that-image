import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'
import { Link, useParams } from 'react-router-dom'
import { useAccount } from '../hooks/useAccount.js'
import { useGet } from '../hooks/useGet.js'
import "../css/pages/Profile.css"


const Profile = () => {
    const { id } = useParams()
    const { getUser } = useGet()
    const [isDeleting, setIsDeleting] = useState(false)
    const { user } = useAuthContext()
    const [ profileUser, setProfileUser] = useState({})
    const { deleteAccount } = useAccount()

    useEffect(() => {
        const fetchUser = async(tempID) => {
            if (tempID) {
                const tempUser = await getUser(tempID)
                if (tempUser) {
                    setProfileUser(tempUser)
                } else {
                    setProfileUser(user)
                }                
            }
        }
        fetchUser(id)

    }, [id])

    const handleDeleteAccount = () => {
        console.log(user)
        deleteAccount(user)
    }

    return (
        <div className="profile-container">
            <div className="profile-form">
                <div className='profile-pic-container'>
                    <img className='profile-pic' src={profileUser.profilePic ? user.profilePic : "https://cdn.pixabay.com/photo/2021/06/07/13/45/user-6318003_960_720.png"} ></img>
                    <div className='profile_column'> 
                        <h1>{user.username}</h1>
                        <h3>Member since: {new Date(user.accountCreationDate).toLocaleString('default', { month: 'long' })} 2024</h3>
                        <h3>{user.bio}</h3>
                    </div>
                    <div className='profile_column'>
                        <div className='profile_row'>
                            <div className='profile_column2'> 
                                <h3>Quizzes Played</h3>
                                <label>0</label>
                            </div>
                            <div className='profile_column2'> 
                                <h3>Quizzes Created</h3>
                                <label>0</label>
                            </div>                                
                        </div>
                        <div className='profile_column2'> 
                                <h3>Accuracy</h3>
                                <label>0</label>
                        </div>    
                    </div>

                </div>
                <hr></hr>
                <h2>Achievements</h2>
                <div className='achievements'>
                    {<label className='center-box'>No Achievements Yet!</label>}
                </div>
                <h2>Quiz History</h2>
                <div className='quiz-history'>
                    {<label className='center-box'>Play some games!</label>}
                </div>
                {id ? <></> : <div className='column_center'>
                    <Link to="/account">
                        <button className='account-change-password-btn'>Modify Account</button>
                    </Link>
                    <button className="account-delete-account-btn" onClick={handleDeleteAccount} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </button>                    
                </div>}

            </div>
        </div>

    )
}

export default Profile
