import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from './api';

const SelectedPokemon = ({ teams = [], setTeams }) => {
  const navigate = useNavigate();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(""); 
  const { name } = useParams();

  useEffect(() => {
    const getSinglePokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const singlePokemon = await response.json();
        
        const commonAbility = singlePokemon.abilities[0].ability.name;

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
        const speciesInfo = await speciesResponse.json();

        const pokeDescription = speciesInfo.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        ).flavor_text;

        const sanitizedDescription = pokeDescription.replace(/[\n\r\f]/g, " ");

        const detailedPokemon = {
          name: singlePokemon.name,
          sprite: singlePokemon.sprites.front_default,
          shinySprite: singlePokemon.sprites.front_shiny,
          id: singlePokemon.id,
          type: singlePokemon.types.map((typeObj) => typeObj.type.name).join(", "),
          description: sanitizedDescription,
          ability: commonAbility,
        };

        setPokemonDetails(detailedPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    getSinglePokemon();
  }, [name]);

  useEffect(() => {
    const fetchUserTeams = async () => {
      try {
        console.log('Fetching teams data...');
        const response = await api.get('/teams');
        setTeams(response.data);
        console.log('Teams fetched:', response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("User not authenticated, clearing teams...");
          setTeams([]); // Clear teams if user is not authenticated
        } else {
          console.error("Error fetching user teams:", error);
        }
      }
    };

    fetchUserTeams();
  }, [setTeams]);

  const addToTeam = async () => {
    if (!selectedTeam) {
      alert("Please select a team!");
      return;
    }

    const team = teams.find((team) => team.name === selectedTeam);

    if (team && team.pokemon.length >= 6) {
      alert("This team is full");
      return;
    }

    try {
      const response = await api.post(`/teams/${team.id}/pokemon`, {
        pokemon: pokemonDetails,
      });
      setTeams((prevTeams) => {
        return prevTeams.map((t) => 
          t.id === team.id ? { ...t, pokemon: [...t.pokemon, pokemonDetails] } : t
        );
      });
      alert(`${pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.slice(1)} added to ${selectedTeam}!`);
    } catch (error) {
      console.error("Error adding Pokémon to team:", error);
    }
  };

  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  return (
    <section id="selected-pokemon">
      <div className="poke-images">
        <img src={pokemonDetails.sprite} alt={pokemonDetails.name} className="page-title" />
      </div>
      <section id="selected-pokemon-details">
        <h2>{pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.slice(1)}</h2>
        <p>Type: {pokemonDetails.type.toUpperCase()}</p>
        <div>
          <p>PokéDex Entry:</p>
          <p id="poke-entry">{pokemonDetails.description}</p>
        </div>
        <section id="selected-pokemon-interaction">
          <select value={selectedTeam} onChange={(event) => setSelectedTeam(event.target.value)}>
            <option value="">Select a Team</option>
            {Array.isArray(teams) && teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <button onClick={addToTeam}>Add to Team</button>
          <button onClick={() => navigate(`/NationalDex`)}>Back to National Dex</button>
        </section>
      </section> 
    </section> 
  );
};

export default SelectedPokemon;
