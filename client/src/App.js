import './App.css';
import Home from './components/Home.jsx'
import GameDetails from './components/details/GameDetails'
import CreateGame from './components/createGames/CreateGame';
import LandingPage from './components/LandingPage';
import About from './components/about/About'


import { BrowserRouter, Route, Routes } from 'react-router-dom'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/videogame' element={<CreateGame />} />
          <Route path='/home' element={<Home />} />
          <Route path='/videogames/:id' element={<GameDetails />} />
          <Route path='/videogame/:id' element={<CreateGame />} />
          <Route path='*' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
