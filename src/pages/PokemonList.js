import React from "react";
import loadable from "@loadable/component";

import { useGlobalContext } from "../context";

const Container = loadable(() => import("../components/Container"));
const PokemonListSkeleton = loadable(() =>
  import("../components/PokemonListSkeleton")
);
const PokemonCards = loadable(() => import("../components/PokemonCards"));

const PokemonList = () => {
  const { pokemonList, totalDiscovered } = useGlobalContext();
  const { pokemons, loading, error } = pokemonList;

  return (
    <PokemonListSkeleton currentTab="pokemon-list">
      <Container>
        <div className="header">
          <div className="title">All Pokemons</div>
          <div className="totals">Total discovered: {totalDiscovered}</div>
        </div>
        <PokemonCards pokemons={pokemons} loading={loading} error={error} />
      </Container>
    </PokemonListSkeleton>
  );
};

export default PokemonList;
