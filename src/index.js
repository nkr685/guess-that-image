import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/pages/index.css';
import App from './App';
import GameContextProvider from './context/GameContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GameContextProvider>
        <App />      
      </GameContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);