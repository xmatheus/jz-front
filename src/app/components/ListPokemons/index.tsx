import React, { useEffect } from "react";
import "./styles.css";
import { PokemonsData } from "../../page";
import axios from "axios";

// Defina uma interface para as props do componente CreatePokemons
interface ListPokemonsProps {
  setPokemons: React.Dispatch<React.SetStateAction<PokemonsData[]>>;
  pokemons: PokemonsData[];
}

const typeClassMap: Record<string, string> = {
  pikachu: "type-pikachu",
  mewtwo: "type-mewtwo",
  charizard: "type-charizard",
};

const ListPokemons: React.FC<ListPokemonsProps> = ({
  pokemons,
  setPokemons,
}) => {
  useEffect(() => {
    getPokemons();
  }, []);

  async function getPokemons() {
    try {
      const response = await axios.get("http://localhost:3001/pokemons");
      console.log(response.data);
      setPokemons((prevPokemons) => [...prevPokemons, ...response.data]);
    } catch (error) {}
  }

  async function handleDelete(id: number) {
    try {
      await axios.delete(`http://localhost:3001/pokemons/${id}`);
      setPokemons((prevPokemons) => [
        ...prevPokemons.filter((item) => item.id !== id),
      ]);
    } catch (error) {}
  }

  return (
    <div id="list-container">
      {pokemons.map((item) => (
        <div key={item.id} className="list-item">
          <p className="item-id">ID: {item.id}</p>
          <p className={`item-tipo ${typeClassMap[item.tipo]}`}>{item.tipo} </p>
          <p className="item-treinador">{item.treinador}</p>
          <button
            className="delete-button"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListPokemons;
