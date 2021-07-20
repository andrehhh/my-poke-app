import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import loadable from "@loadable/component";

import { useGlobalContext } from "../context";

const Container = loadable(() => import("../components/Container"));
const PokemonListSkeleton = loadable(() =>
  import("../components/PokemonListSkeleton")
);
const PokemonCards = loadable(() => import("../components/PokemonCards"));

const MyPokemonList = () => {
  const { myPokemons } = useGlobalContext();

  return (
    <PokemonListSkeleton currentTab="my-pokemons">
      <Container>
        <div className="header">
          <div className="title">My Pokemons</div>
          <div className="totals">
            Total pokemons: {myPokemons && myPokemons.length}
          </div>
        </div>
        {myPokemons.length > 0 ? (
          <PokemonCards pokemons={myPokemons} />
        ) : (
          <div
            className={css`
              margin-top: 10rem;
              display: grid;
              grid-template-columns: max-content;
              justify-content: center;
              row-gap: 0.5rem;
              border: none;

              .no-pokemon-notice {
                font-weight: 700;
                color: white;
              }

              .link {
                margin: auto;
                margin-top: 0.5rem;
                padding: 0.2rem 0.5rem;
                width: max-content;
                border-radius: 4px;
                background-color: white;
                color: #3466af;
                font-size: 0.8rem;
                text-decoration: none;
                transition: 0.2s;
                cursor: pointer;
              }

              @media only screen and (min-width: 600px) {
                .no-pokemon-notice {
                  font-size: 1.1rem;
                }

                .link {
                  font-size: 0.9rem;
                }
              }
            `}
          >
            <div className="no-pokemon-notice">
              You have no pokemon. Lets catch some first!
            </div>
            <Link to="/" className="link">
              Go to Pokemon List
            </Link>
          </div>
        )}
      </Container>
    </PokemonListSkeleton>
  );
};

export default MyPokemonList;
