import { BrowserRouter,Routes, Route } from 'react-router-dom'


// pages and components
import Home from './pages/Home.js'
import Navbar from './components/Navbar.js';
import PlayGame from './pages/PlayGame.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';

// need this extra layer to update category 
function App() {
  // starts game 
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
            element={<PlayGame/>}>
          </Route>
          <Route 
            path = "/login"
            element={<Login/>}>
          </Route>
          <Route 
            path = "/signup"
            element={<Signup/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
