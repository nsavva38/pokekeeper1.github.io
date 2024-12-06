import { useState } from "react";

const Account = ({teams,setTeams,teamName,setTeamName}) => {


  // Form submit handler
  const makeTeam = (event) => {
    event.preventDefault();
    if (teamName.trim()) {
      setTeams((previous) => ({
        ...previous, [teamName]: [] // Create a new array with the input name
      }));
      setTeamName(""); // Clear input field after creation
    }
  };

  return (
    <>
      <h2>Hello User</h2>
      <p>Make a New Team</p>
      <form onSubmit={makeTeam}>
        <input
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
          placeholder="Team Name"
        />
        <button type="submit">Make Team</button>
      </form>

      <h3>My Teams</h3>
      <ol>
        {Object.keys(teams).map((team) => (
          <li key={team}>
            <strong>{team}</strong>: {JSON.stringify(teams[team])}
            {team}
          </li>
        ))}
      </ol>

      {console.log("teamName:", teamName)}
      {console.log("teams:", teams)}
    </>
  );
};

export default Account;
