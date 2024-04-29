import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Ambil data Pokémon yang dipilih
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = await pokemonResponse.json();
        setPokemonData(pokemonData);

        // Ambil data evolusi untuk Pokémon yang dipilih
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionChainData = await evolutionChainResponse.json();
        setEvolutionData(evolutionChainData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };
    fetchPokemonData();
  }, [id]);

  if (!pokemonData || !evolutionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto text-white">
      <div className="border p-4 m-4">
        <h2 className="text-3xl font-bold mb-4">{pokemonData.name}</h2>
        <div className="flex items-center">
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="w-32 h-32 mr-4" />
          <div>
            <p className="text-white">Height: {pokemonData.height}</p>
            <p className="text-white">Weight: {pokemonData.weight}</p>
            <p className="text-white">Abilities:</p>
            <ul>
              {pokemonData.abilities.map((ability, index) => (
                <li key={index} className="text-white">
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tampilkan informasi tentang evolusi */}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Evolution</h3>
        {evolutionData.chain ? <EvolutionChain chain={evolutionData.chain} /> : <p>No evolution data available.</p>}
      </div>
    </div>
  );
}

function EvolutionChain({ chain }) {
  // Rekursif untuk menelusuri rantai evolusi
  const renderEvolution = (evolution) => {
    return (
      <div key={evolution.species.name} className="flex p-4 m-4">
        <h3 className="text-xl font-semibold text-white">{evolution.species.name}</h3>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.species.url.split("/")[6]}.png`} alt={evolution.species.name} className=" h-52 w-80" />
        {evolution.evolves_to.length > 0 && <div className=" gap-4 mt-4">{evolution.evolves_to.map((nextEvolution) => renderEvolution(nextEvolution))}</div>}
      </div>
    );
  };

  return renderEvolution(chain);
}

export default PokemonDetails;
