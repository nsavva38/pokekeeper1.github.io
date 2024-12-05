import { Routes, Route } from "react-router-dom"

import NationalDex from "./components/NationalDex.jsx"


const App = () => {



//------------------------------------RETURN-----------------------------------//
 return (
  <>
    <h1>PokeKeeper</h1>
    <Routes>
      <Route path="/NationalDex" element={<NationalDex />}/>
    </Routes>
  </>
 )
}

export default App
