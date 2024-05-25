import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext.js';
import { useContext } from 'react';
import { GameContext } from './context/GameContext';

// pages and components
import Home from './pages/Home.js'
import Navbar from './components/Navbar.js';
import PlayGame from './pages/PlayGame.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Upload from './pages/Upload.js';
import Leaderboard from './pages/Leaderboard.js';
import Account from './pages/Account.js';
import Profile from './pages/Profile.js';
import "./css/pages/App.css"

function App() {
  const { user } = useAuthContext()
  const {quiz} = useContext(GameContext)
  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar/>
      <div className='app-pages'>
        <Routes>
          <Route 
            path = "/"
            element={<Home/>}>
          </Route>
          <Route 
            path = "/game/:quizID"
            element={quiz ? <PlayGame/> : <Navigate to="/"/>}>
          </Route>
          <Route 
            path = "/game/"
            element={<PlayGame/>}>
          </Route>
          <Route 
            path = "/login"
            element={!user ? <Login/> : <Navigate to="/"/>}>
          </Route>
          <Route 
            path = "/signup"
            element={!user ? <Signup/> : <Navigate to="/"/>}>
          </Route>
          <Route 
            path = "/leaderboard"
            element={<Leaderboard/>}>
          </Route>
          <Route 
            path = "/upload"
            element={user ? <Upload/> : <Navigate to="/"/>}>
          </Route>
          <Route 
            path = "/profile"
            element={user ? <Profile/> : <Navigate to="/"/>}>
          </Route>
          <Route 
            path = "/profile/:id"
            element={<Profile/>}>
          </Route>
          <Route 
            path = "/account"
            element={user ? <Account/> : <Navigate to="/"/>}>
          </Route>
        </Routes>        
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
