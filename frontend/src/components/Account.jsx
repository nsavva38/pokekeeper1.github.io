import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';

const Account = ({ teams, setTeams, teamName, setTeamName, setIsAuthenticated }) => {
  const [user, setUser] = useState(null); // State for storing user data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
        console.log(response.data)
        setTeams(response.data.teams); // Assuming teams are part of the user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setTeams]);

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

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsAuthenticated(false); // Update authentication state
    navigate('/login'); // Redirect to the login page
  };

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/NationalDex">NationalDex</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <h2>Hello, {user?.username}</h2>
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

      <button onClick={handleLogout}>Logout</button>

      {console.log("teamName:", teamName)}
      {console.log("teams:", teams)}
    </>
  );
};

export default Account;
