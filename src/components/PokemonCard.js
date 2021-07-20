import { css } from "@emotion/css";
import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

const PokemonCard = React.forwardRef((props, ref) => {
  const { id, name, image, nickname } = props;
  const { releasePokemon } = useGlobalContext();

  return (
    <div
      ref={ref}
      className={css`
        background-color: #ffffff;
        border-radius: 5px;
        padding: 0.3rem;

        .link-container {
          display: grid;
          text-decoration: none;
          font-weight: 700;
          cursor: pointer;

          img {
            width: 100%;
            justify-self: center;
            background-color: #f0f0f0;
            border-radius: 5px;
          }

          .pokemon-id {
            justify-self: right;
            margin-top: 0.2rem;
            font-size: 0.75rem;
            text-transform: capitalize;
            color: #c0c0c0;
          }

          .pokemon-name {
            margin-top: 0.5rem;
            margin-bottom: 0.2rem;
            text-transform: capitalize;
            color: #303030;
          }

          .no-transform {
            text-transform: none;
          }
        }

        .pokemon-release-btn {
          margin-top: 0.3rem;
          width: 100%;
          padding: 0.2rem 0;
          border: 1px solid #d56a6a;
          border-radius: 4px;
          background-color: transparent;
          color: #d56a6a;
          font-size: 0.7rem;
          transition: 0.2s;
          cursor: pointer;
        }

        .pokemon-release-btn:hover {
          background-color: #d56a6a;
          color: white;
        }

        @media only screen and (min-width: 1024px) {
          .link-container {
            .pokemon-id {
              font-size: 1rem;
            }

            .pokemon-name {
              font-size: 1.3rem;
            }
          }
        }
      `}
    >
      <Link to={`/pokemon/${name}`} className="link-container">
        <img src={image} alt={name} />
        <div className="pokemon-id">
          #{id}
          {nickname && ` ${name}`}
        </div>
        <div
          className={nickname ? "pokemon-name no-transform" : "pokemon-name"}
        >
          {nickname || name}
        </div>
      </Link>
      {nickname && (
        <button
          onClick={() => releasePokemon(nickname)}
          className="pokemon-release-btn"
        >
          Release Pokemon
        </button>
      )}
    </div>
  );
});

export default PokemonCard;
