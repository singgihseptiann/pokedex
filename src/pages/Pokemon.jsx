import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Pokemon = () => {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const Api = "https://pokeapi.co/api/v2/pokemon?limit=200";

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(Api);
        const data = await response.json();
        setDatas(data.results);
        console.log("Data cuy", data.results);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const results = datas.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [searchTerm, datas]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      {" "}
      <div>
        <div className="flex justify-center my-4">
          <input type="text" placeholder="Search Pokemon..." value={searchTerm} onChange={handleSearchChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400" />
          <button onClick={() => setSearchTerm("")} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-400">
            Clear
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((pokemon, index) => (
              <Link key={index} to={`/pokemon/${index + 1}`} className="border rounded-lg border-blue-200 w-52 p-2 m-2 mx-auto  backdrop-blur-sm transform transition duration-200 hover:scale-110">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} className="w-full h-auto" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-100 dark:text-white text-center">{pokemon.name}</h5>
                {/* Jika Anda memiliki lebih banyak informasi yang ingin ditampilkan di dalam kartu, Anda bisa menambahkannya di sini */}
              </Link>
            ))
          ) : (
            <p>Tidak ada hasil pencarian</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Pokemon;
