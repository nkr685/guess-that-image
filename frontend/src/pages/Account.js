import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext.js';


const Account = () => {
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthContext()


  const handleChangePassword = () => {
    // Add logic to handle password change
    console.log('Changing password...');
  };

  const handleDeleteAccount = () => {
    // Add logic to handle account deletion
    console.log('Deleting account...');
  };

  return (
    <div className="account-container">
      <div className="account-user-info">
        <h2>{user.username}</h2>
      </div>

      <div className="account-button-container">
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
  );
};

export default Account;