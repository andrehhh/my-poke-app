import React, { useRef, useCallback } from "react";
import { css } from "@emotion/css";
import loadable from "@loadable/component";

import { useGlobalContext } from "../context";

const PokemonCard = loadable(() => import("./PokemonCard"));
const Loading = loadable(() => import("./Loading"));

const PokemonCards = ({ pokemons, loading, error }) => {
  const { nextPage, hasMore } = useGlobalContext();

  const observer = useRef();
  const lastPokemonRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore) nextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextPage, hasMore]
  );

  if (loading && !pokemons) return <Loading />;
  if (error) return `Error! ${error.message}`;

  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: repeat(3, 4fr);
        column-gap: 0.3rem;
        row-gap: 0.5rem;

        @media only screen and (min-width: 600px) {
          grid-template-columns: repeat(4, 3fr);
          column-gap: 0.5rem;
          row-gap: 0.8rem;
        }

        @media only screen and (min-width: 1024px) {
          column-gap: 1rem;
          row-gap: 1.5rem;
        }
      `}
    >
      {pokemons.map((pokemon, index) => {
        const { id, name, image, nickname } = pokemon;
        if (!nickname && pokemons.length === index + 1) {
          return (
            <PokemonCard
              key={nickname ? nickname : id}
              id={id}
              name={name}
              image={image}
              nickname={nickname}
              ref={lastPokemonRef}
            />
          );
        } else {
          return (
            <PokemonCard
              key={nickname ? nickname : id}
              id={id}
              name={name}
              image={image}
              nickname={nickname}
            />
          );
        }
      })}
    </div>
  );
};

export default PokemonCards;
