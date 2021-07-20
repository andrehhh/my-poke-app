import React from "react";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";

import pokemonLogo from "../images/pokemon-logo.png";

const PokemonListSkeleton = ({ currentTab, children }) => {
  return (
    <div
      className={css`
        display: grid;
        background-color: #ffcb05;

        .logo {
          width: 150px;
          padding: 2rem 0;
          justify-self: center;
        }
      `}
    >
      <img src={pokemonLogo} alt="logo" className="logo" />
      <div
        className={css`
          .header {
            display: grid;
            grid-template-columns: auto auto;
            column-gap: 0.3rem;

            * {
              padding: 0.5rem 0;
              border-radius: 5px 5px 0 0;
              text-align: center;
              color: white;
              font-size: 0.9rem;
              text-decoration: none;
              font-family: "Poppins", sans-serif;
              font-weight: 700;
            }

            .active {
              background-color: #3466af;
            }

            .inactive {
              background-color: #1d2c5e;
            }
          }

          .body {
            background-color: #3466af;
            min-height: 100vh;
            padding: 2rem 0;

            .header {
              display: flex;
              padding-bottom: 0.5rem;
              justify-content: space-between;
              align-items: baseline;

              .title {
                font-size: 1.8rem;
              }

              .totals {
                font-size: 0.7rem;
                font-weight: 500;
              }
            }
          }

          @media only screen and (min-width: 600px) {
            .header {
              * {
                font-size: 1rem;
              }
            }

            .body .header {
              .title {
                font-size: 2rem;
              }

              .totals {
                font-size: 0.8rem;
              }
            }
          }

          @media only screen and (min-width: 1024px) {
            .header {
              * {
                font-size: 1.2rem;
              }
            }

            .body .header {
              .title {
                font-size: 2.5rem;
              }

              .totals {
                font-size: 0.9rem;
              }
            }
          }
        `}
      >
        <div className="header">
          <Link
            to="/"
            className={currentTab === "pokemon-list" ? "active" : "inactive"}
          >
            Pokemon List
          </Link>
          <Link
            to="/my-pokemons"
            className={currentTab === "my-pokemons" ? "active" : "inactive"}
          >
            My Pokemons
          </Link>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
};

export default PokemonListSkeleton;
