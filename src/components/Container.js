import React from "react";
import { css } from "@emotion/css";

const Container = ({ children }) => {
  return (
    <div
      className={css`
        width: 95%;
        margin: auto;

        @media only screen and (min-width: 600px) {
          width: 80%;
          max-width: 900px;
        }
      `}
    >
      {children}
    </div>
  );
};

export default Container;
