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

// need this extra layer to update category 
function App() {
  const { user } = useAuthContext()
  const {quiz} = useContext(GameContext)
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route 
            path = "/"
            element={<Home/>}>
          </Route>
          <Route 
            path = "/game"
            element={quiz? <PlayGame/> : <Navigate to="/"/>}>
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
            element={<Upload/>}>
          </Route>
          <Route 
            path = "/account"
            element={user ? <Account/> : <Navigate to="/"/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
