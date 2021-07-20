import React from "react";
import { css } from "@emotion/css";

const PokemonType = ({ type }) => {
  return (
    <div
      className={css`
        .type {
          padding: 0.1rem 1rem;
          border-radius: 2px;
          font-size: 0.7rem;
          text-transform: capitalize;
          color: white;
        }

        .normal {
          background-color: #a8a77a;
        }
        .fire {
          background-color: #ee8130;
        }
        .water {
          background-color: #6390f0;
        }
        .electric {
          background-color: #f7d02c;
        }
        .grass {
          background-color: #7ac74c;
        }
        .ice {
          background-color: #96d9d6;
        }
        .fighting {
          background-color: #c22e28;
        }
        .poison {
          background-color: #a33ea1;
        }
        .ground {
          background-color: #e2bf65;
        }
        .flying {
          background-color: #a98ff3;
        }
        .psychic {
          background-color: #f95587;
        }
        .bug {
          background-color: #a6b91a;
        }
        .rock {
          background-color: #b6a136;
        }
        .ghost {
          background-color: #735797;
        }
        .dragon {
          background-color: #6f35fc;
        }
        .dark {
          background-color: #705746;
        }
        .steel {
          background-color: #b7b7ce;
        }
        .fairy {
          background-color: #d685ad;
        }

        @media only screen and (min-width: 600px) {
          .type {
            padding: 0.1rem 1.2rem;
            font-size: 0.9rem;
          }
        }
      `}
    >
      <div className={`type ${type}`}>{type}</div>
    </div>
  );
};

export default PokemonType;
