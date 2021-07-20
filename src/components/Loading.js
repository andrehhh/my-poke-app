import { css } from "@emotion/css";
import React from "react";
import pokeballLogo from "../images/pokeball-logo.png";

const Loading = () => {
  return (
    <div
      className={css`
        background-color: white;
        height: 100vh;
        display: grid;
        justify-content: center;
        align-items: center;

        img {
          width: 100px;
          animation: loading-logo-spin infinite 3s linear;
        }

        @keyframes loading-logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
    >
      <img src={pokeballLogo} alt="loading" />
    </div>
  );
};

export default Loading;
