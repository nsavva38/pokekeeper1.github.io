import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Account.module.css';
import api from '../api';

const Account = ({ setIsAuthenticated, pokemon }) => {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [localTeamName, setLocalTeamName] = useState(''); 
  const navigate = useNavigate();
  const pokemon151 = pokemon;
  console.log(pokemon151);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/teams', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('API response:', response.data);
          setUser(response.data);
          setTeams(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          if (error.response?.status === 401) {
            setIsAuthenticated(false);
            navigate('/login');
          }
        }
      }
    };

    fetchUserData();
  }, [setIsAuthenticated, navigate]);

  const teamPost = async (localTeamName) => {
    try {
      await api.post('/teams', { name: localTeamName }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const teamFetch = async () => {
    try {
      const response = await api.get('/teams', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Fetched teams:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const teamDelete = async (team) => {
    try {
      await api.delete(`/teams/${team.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  const makeTeam = async (event) => {
    event.preventDefault();
    await teamPost(localTeamName);
    const teams = await teamFetch();
    setTeams(teams);
  };

  const removeFromTeam = async (team, index) => {
    const pokemonToRemove = team.pokemon[index];
  
    try {
      await api.delete(`/teams/${team.id}/pokemon/${pokemonToRemove.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
  
      setTeams((prevTeams) => prevTeams.map((t) =>
        t.id === team.id ? { ...t, pokemon: t.pokemon.filter((_, i) => i !== index) } : t
      ));
  
      alert(`${pokemonToRemove.name} has been removed from the team.`);
    } catch (error) {
      console.error("Error removing Pokémon from team:", error);
      alert("Failed to remove Pokémon from the team. Please try again.");
    }
  };

  const deleteTeam = async (team) => {
    await teamDelete(team);
    const teams = await teamFetch();
    setTeams(teams);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setTeams([]);
    navigate('/login');
  };

  const username = localStorage.getItem('username');
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.accountTitle}>Hello, {username || user.username}</h2>
      <p>Make a New Team</p>
      <form onSubmit={makeTeam} className={styles.form}>
        <input
          value={localTeamName}
          onChange={(event) => setLocalTeamName(event.target.value)}
          placeholder="Team Name"
        />
        <button type="submit">Make Team</button>
      </form>

      <h3 className={styles.h3AccountTeams}>My Teams</h3>
      <ul className={styles.teams}>
        {teams.map((team) => (
          <li key={team.id} className={styles.team}>
            <section id="teamName-and-deleteButton">
              <h3>{team.name}</h3>
              <button onClick={() => deleteTeam(team)}>Delete Team</button>
            </section>
            {team.pokemon && team.pokemon.length > 0 ? (
              <section id="team-members">
                {team.pokemon.map((pokemon, index) => {
                  const matchedPokemon = pokemon151.find(
                    (poke) => poke.name.toLowerCase() === pokemon.name.toLowerCase()
                  );

                  return (
                    <section id="member" key={index} className={styles.member}>
                      {console.log('Matched Pokémon:', matchedPokemon)}
                      <img 
                        src={matchedPokemon.sprite} 
                        onClick={() => navigate(`/NationalDex/${pokemon.name}`)} 
                        alt={pokemon.name} 
                      />
                      <p onClick={() => navigate(`/NationalDex/${pokemon.name}`)}>
                        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                      </p>
                      <button onClick={() => removeFromTeam(team, index)}>Remove from Team</button>
                    </section>
                  );
                })}
              </section>
            ) : (
              <p>No Pokémon in this team yet.</p>
            )}
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;
