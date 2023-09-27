import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { PokemonsData } from "../../page";

// Defina uma interface para as props do componente CreatePokemons
interface CreatePokemonsProps {
  setPokemons: React.Dispatch<React.SetStateAction<PokemonsData[]>>;
}

const CreatePokemons: React.FC<CreatePokemonsProps> = ({ setPokemons }) => {
  const [tipo, setTipo] = useState("");
  const [treinador, setTreinador] = useState("");

  // Resto do código do componente CreatePokemons

  const handleCreatePokemon = async () => {
    if (!tipo || !treinador) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/pokemons", {
        tipo,
        treinador,
      });

      if (response.status === 200) {
        setPokemons((prevPokemons) => [...prevPokemons, response.data]); // Adicione o novo Pokemon à lista
        setTipo("");
        setTreinador("");
      } else {
        alert("Erro ao criar o Pokemon.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao criar o Pokemon.");
    }
  };

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipo(e.target.value);
  };

  const handleTreinadorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTreinador(e.target.value);
  };

  return (
    <div id="container">
      <h2>Criar Novo Pokémon</h2>
      <label className="label">
        Tipo do Pokémon:
        <select id="selectTipo" value={tipo} onChange={handleTipoChange}>
          <option value="">Selecione o tipo</option>
          <option value="pikachu">Pikachu</option>
          <option value="mewtwo">Mewtwo</option>
          <option value="charizard">Charizard</option>
        </select>
      </label>

      <label className="label">
        Nome do Treinador:
        <input
          id="inputTreinador"
          type="text"
          value={treinador}
          onChange={handleTreinadorChange}
        />
      </label>

      <button id="btnCreate" onClick={handleCreatePokemon}>
        Criar Pokémon
      </button>
    </div>
  );
};

export default CreatePokemons;
