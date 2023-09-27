'use client';
import { useState } from "react";
import styles from "./page.module.css";
import CreatePokemons from "./components/CreatePokemons";
import ListPokemons from "./components/ListPokemons";

type PokemonType = "charizard" | "mewtwo" | "pikachu";

export interface PokemonsData {
  tipo: PokemonType;
  treinador?: string;
  id: number,
  nivel?: number
}

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonsData[]>([]);

  return (
    <main className={styles.main}>
      <h1>Pokedex</h1>
      <CreatePokemons setPokemons={setPokemons}/>
      <ListPokemons pokemons={pokemons} setPokemons={setPokemons}/>
    </main>
  );
}
