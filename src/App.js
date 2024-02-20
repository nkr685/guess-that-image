import GameContainer from "./GameContainer";
import GameContextProvider from './context/GameContext';

function App() {

  // starts game and provides each component access to global vars
  return (
    <div className="App">
      <header className="App-header">
        <GameContextProvider>
          <GameContainer/>
        </GameContextProvider>
      </header>
    </div>
  );
}

export default App;
