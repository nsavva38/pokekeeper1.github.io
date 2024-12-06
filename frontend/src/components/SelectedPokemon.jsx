import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SelectedPokemon = ({ teams, setTeams }) => {
  const navigate = useNavigate();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(""); // To track the chosen team
  const { id } = useParams();

  useEffect(() => {
    const getSinglePokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const singlePokemon = await response.json();

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
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
        };

        setPokemonDetails(detailedPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    getSinglePokemon();
  }, [id]);

  const addToTeam = () => {
    if (!selectedTeam) {
      alert("Please select a team!");
      return;
    }

    setTeams((prevTeams) => ({
      ...prevTeams,
      [selectedTeam]: [...(prevTeams[selectedTeam] || []), pokemonDetails],
    }));

    alert(`${pokemonDetails.name} added to ${selectedTeam}!`);
  };

  //------------------------------------RETURN-----------------------------------//
  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  return (
    <section id="selected-pokemon">
      <div className="poke-images">
        <img src={pokemonDetails.sprite} alt={pokemonDetails.name} />
        <img src={pokemonDetails.shinySprite} alt={`${pokemonDetails.name} shiny`} />
      </div>
      <h2>{pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.slice(1)}</h2>
      <p>Type: {pokemonDetails.type.toUpperCase()}</p>
      <p>PokeDex Entry: {pokemonDetails.description}</p>

      {/* Team Selection Dropdown */}
      <select value={selectedTeam} onChange={(event) => setSelectedTeam(event.target.value)}>
        <option value="">Select a Team</option>
        {Object.keys(teams).map((teamName) => (
          <option key={teamName} value={teamName}>
            {teamName}
          </option>
        ))}
      </select>

      <button onClick={addToTeam}>Add to Team</button>
      <button onClick={() => navigate(`/NationalDex`)}>Back to National Dex</button>
    </section>
  );
};

export default SelectedPokemon;
