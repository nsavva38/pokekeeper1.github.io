import { Routes, Route } from "react-router-dom"

import NationalDex from "./components/NationalDex.jsx"
import SelectedPokemon from "./components/SelectedPokemon.jsx"

const App = () => {



//------------------------------------RETURN-----------------------------------//
 return (
  <>
    <h1>Practice PokeKeeper</h1>
    <Routes>
      <Route path="/NationalDex" element={<NationalDex />}/>
      <Route path="/NationalDex/:id" element={<SelectedPokemon />}/>
    </Routes>
  </>
 )
}

export default App
