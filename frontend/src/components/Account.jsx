import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Account = ({ teamName, setTeamName, setIsAuthenticated }) => {
  const [user, setUser] = useState(null); // State for storing user data
  const [teams, setTeams] = useState({}); // Set default value for teams
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('User Data:', response.data); // Log the user data
          setUser(response.data); // Set user data
          setTeams(response.data.teams || {}); // Ensure teams is an object
        } catch (error) {
          console.error('Error fetching user data:', error);
          if (error.response?.status === 401) {
            // Handle unauthorized access, possibly by redirecting to login
            setIsAuthenticated(false);
            navigate('/login');
          }
        }
      }
    };

    fetchUserData();
  }, [setIsAuthenticated, navigate]);

  // Form submit handler
  const makeTeam = (event) => {
    event.preventDefault();
    if (teamName.trim()) {
      setTeams((previous) => ({
        ...previous, [teamName]: [] // Create a new array with the input name
      }));
      setTeamName(''); // Clear input field after creation
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsAuthenticated(false); // Update authentication state
    navigate('/login'); // Redirect to the login page
  };

  if (!user) {
    return <p>Loading...</p>; // Display loading message while fetching user data
  }

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
      <h2>Hello, {user.username}</h2>
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

      {console.log('teamName:', teamName)}
      {console.log('teams:', teams)}
      {console.log('user:', user)} // Log the user object
    </>
  );
};

export default Account;
