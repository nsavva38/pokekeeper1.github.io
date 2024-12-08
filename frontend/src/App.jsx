import { Routes, Route, Link } from "react-router-dom"
import { useState } from "react"

import NationalDex from "./components/NationalDex.jsx"
import SelectedPokemon from "./components/SelectedPokemon.jsx"
import Account from "./components/Account.jsx"

const App = () => {
// might have to move teamName, setTeamName, teams, and setTeams here so it can be passed to SelectedPokemon
const [teamName, setTeamName] = useState(""); // Team name input
const [teams, setTeams] = useState({}); // Object holding all teams


//------------------------------------RETURN-----------------------------------//
 return (
  <>

    <section id="navigation-and-title">

      <nav>
        <Link to={`/Account`}>Account</Link>
        <Link to={"/NationalDex"}>National Dex</Link>
      </nav>


      <h1>Practice PokeKeeper</h1>
    </section>

    <Routes>
      <Route path="/Account" element={<Account 
        teamName={teamName} setTeamName={setTeamName}
        teams={teams} setTeams={setTeams}/>}
      />
      <Route path="/NationalDex" element={<NationalDex />}/>
      <Route path="/NationalDex/:id" element={<SelectedPokemon 
        teams={teams} setTeams={setTeams}/>}
      />
    </Routes>
  </>
 )
}

export default App
