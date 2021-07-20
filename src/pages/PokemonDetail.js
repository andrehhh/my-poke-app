import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import loadable from "@loadable/component";

import pokeballLogo from "../images/pokeball-logo.png";

import { GET_POKEMON_DETAILS } from "../GraphQL/Queries";

import { useGlobalContext } from "../context";

const Container = loadable(() => import("../components/Container"));
const CatchModal = loadable(() => import("../components/CatchModal"));
const Loading = loadable(() => import("../components/Loading"));
const PokemonType = loadable(() => import("../components/PokemonType"));

const PokemonDetail = () => {
  const queryVariable = useParams();

  const { catchPokemon, catchModalToggle } = useGlobalContext();

  const [movesViewLimit, setMovesViewLimit] = useState(15);

  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: queryVariable,
  });

  if (loading) return <Loading />;
  if (error) return `Error! ${error.message}`;

  const { id, name, types, moves, sprites } = data.pokemon;

  var numberOfMoves = 0;

  return (
    <div
      className={css`
        padding: 2rem 0;

        .pokemon-name {
          text-transform: capitalize;
        }
      `}
    >
      {catchModalToggle.isOpen && <CatchModal />}
      <Container>
        <div
          className={css`
            position: relative;
            display: grid;
            padding-top: 2rem;
            grid-template-columns: auto auto;
            align-items: flex-end;
            justify-content: center;

            &::before {
              content: "";
              position: absolute;
              top: 5%;
              left: 48%;
              transform: translateX(-60%);
              width: 250px;
              height: 250px;
              border-radius: 50%;
              background-color: #f0f0f0;
            }

            * {
              z-index: 2;
            }

            img {
              width: 180px;
            }

            .pokemon-info {
              .pokemon-name {
                font-size: 1.8rem;
                font-weight: 700;
              }

              .pokemon-id {
                font-size: 1.2rem;
                font-weight: 700;
                color: #c0c0c0;
              }

              .types {
                margin-top: 1rem;
                display: flex;
                flex-wrap: wrap;
                column-gap: 0.3rem;
              }
            }

            @media only screen and (min-width: 600px) {
              &::before {
                width: 400px;
                height: 400px;
              }

              img {
                width: 300px;
              }

              .pokemon-info {
                .pokemon-name {
                  font-size: 2.5rem;
                }

                .pokemon-id {
                  font-size: 1.8rem;
                }

                .types {
                  margin-top: 2rem;
                  column-gap: 0.5rem;
                }
              }
            }

            @media only screen and (min-width: 1024px) {
              &::before {
                width: 420px;
                height: 420px;
              }
            }
          `}
        >
          <img src={sprites.front_default} alt={name} />
          <div className="pokemon-info">
            <div className="pokemon-name">{name}</div>
            <div className="pokemon-id">#{id}</div>
            <div className="types">
              {types.map((type, index) => {
                return <PokemonType key={index} type={type.type.name} />;
              })}
            </div>
          </div>
        </div>

        <div
          className={css`
            .moves-list-title {
              margin-top: 6rem;
              margin-bottom: 1.2rem;
              font-size: 1.6rem;
              font-weight: 700;
            }

            .moves {
              width: 100%;
              display: flex;
              flex-wrap: wrap;

              .move {
                margin-right: 0.5rem;
                margin-bottom: 0.5rem;
                padding: 0.2rem 0.8rem;
                background-color: #f0f0f0;
                font-size: 0.8rem;
                text-transform: capitalize;
              }

              .hidden {
                display: none;
              }
            }

            .more-moves-btn {
              margin: auto;
              margin-top: 0.5rem;
              padding: 0.2rem 0.5rem;
              width: max-content;
              border: 1px solid #3466af;
              border-radius: 4px;
              background-color: transparent;
              color: #3466af;
              font-size: 0.65rem;
              transition: 0.2s;
              cursor: pointer;
            }

            .more-moves-btn:hover {
              background-color: #3466af;
              color: white;
            }

            @media only screen and (min-width: 600px) {
              .moves-list-title {
                margin-top: 10rem;
              }

              .moves .move {
                font-size: 1rem;
              }

              .more-moves-btn {
                font-size: 0.8rem;
              }
            }
          `}
        >
          <div className="moves-list-title">Moves List</div>
          {moves && moves.length > 0 ? (
            <div
              className={css`
                display: grid;
              `}
            >
              <div className="moves">
                {moves.map((move, index) => {
                  const moveName = move.move.name.replace("-", " ");
                  numberOfMoves++;
                  return (
                    <div
                      key={index}
                      className={
                        index >= movesViewLimit ? "move hidden" : "move"
                      }
                    >
                      {moveName}
                    </div>
                  );
                })}
              </div>
              {movesViewLimit < numberOfMoves && (
                <button
                  onClick={() =>
                    setMovesViewLimit((prevLimit) => {
                      return prevLimit + 15;
                    })
                  }
                  className="more-moves-btn"
                >
                  Show more
                </button>
              )}
            </div>
          ) : (
            "No moves found"
          )}
        </div>

        <button
          onClick={() => catchPokemon(id, name, sprites.front_default)}
          className={css`
            position: fixed;
            right: 0;
            bottom: 2rem;
            padding: 0.2rem 1.5rem 0.2rem 0.2rem;
            display: flex;
            align-items: center;
            border: none;
            border-radius: 50px 0 0 50px;
            background-color: #eb6d6d;
            color: white;
            font-weight: 700;
            cursor: pointer;

            img {
              height: 25px;
              margin-right: 0.2rem;
            }

            @media only screen and (min-width: 600px) {
              padding: 0.2rem 3rem 0.2rem 0.2rem;
              font-size: 1.3rem;

              img {
                height: 40px;
              }
            }
          `}
        >
          <img src={pokeballLogo} alt="catch-logo" />
          Catch
        </button>
      </Container>
    </div>
  );
};

export default PokemonDetail;
