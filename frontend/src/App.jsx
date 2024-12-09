
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import NationalDex from "./components/NationalDex.jsx";
import SelectedPokemon from "./components/SelectedPokemon.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Home from "./components/Home.jsx";
import Account from "./components/Account.jsx";

const App = () => {
  // State variables for teamName and teams
  const [teamName, setTeamName] = useState(""); // Team name input
  const [teams, setTeams] = useState({}); // Object holding all teams

  return (
    <Router>
      <h1>PokeKeeper</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/NationalDex" element={<NationalDex />} />
        <Route path="/NationalDex/:id" element={<SelectedPokemon teams={teams} setTeams={setTeams} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> {/* Protect this route if needed */}
        <Route path="/Account" element={<Account teamName={teamName} setTeamName={setTeamName} teams={teams} setTeams={setTeams} />} />
      </Routes>
    </Router>
  );
};


export default App;
