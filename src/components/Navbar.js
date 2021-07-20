import React from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/css";
import loadable from "@loadable/component";

import pokemonLogo from "../images/pokemon-logo.png";

const Container = loadable(() => import("./Container"));

const navbarLinksStyle = css`
  text-decoration: none;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <nav
      className={css`
        background-color: #3466af;
        }
      `}
    >
      <Container>
        <div
          className={css`
            display: flex;
            padding: 0.5rem 0;
            justify-content: space-between;
            align-items: center;

            .logo img {
              width: 100px;
            }

            ul {
              display: grid;
              grid-template-columns: auto auto;
              column-gap: 1.5rem;
              list-style-type: none;
              font-family: "Poppins", sans-serif;
              font-weight: 500;
            }

            @media only screen and (min-width: 600px) {
              ul {
                column-gap: 3rem;
              }
            }
          `}
        >
          <div className="logo">
            <Link to="/" className={navbarLinksStyle}>
              <img src={pokemonLogo} alt="logo" />
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/" className={navbarLinksStyle}>
                Pokemon List
              </Link>
            </li>
            <li>
              <Link to="/my-pokemons" className={navbarLinksStyle}>
                My Pokemons
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
