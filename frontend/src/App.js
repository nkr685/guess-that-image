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

// need this extra layer to update category 
function App() {
  const { user } = useAuthContext()
  const {category} = useContext(GameContext)
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
            element={category ? <PlayGame/> : <Navigate to="/"/>}>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
