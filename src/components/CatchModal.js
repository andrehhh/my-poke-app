import { css } from "@emotion/css";
import React, { useState, useEffect } from "react";

import CloseIcon from "@material-ui/icons/Close";

import { useGlobalContext } from "../context";

const CatchModal = () => {
  const { catchModalToggle, addToMyPokemon, myPokemons, closeModal } =
    useGlobalContext();
  const { id, name, image, isCatchSuccess } = catchModalToggle;

  const [nicknameInput, setNicknameInput] = useState("");
  const [nicknameAvailable, setNicknameAvailable] = useState(true);

  // Check if nickname is available
  const checkNickname = (nickname) => {
    setNicknameInput(nickname);
    const findNickname = myPokemons.find(
      (pokemon) => pokemon.nickname.toLowerCase() === nickname.toLowerCase()
    );
    if (findNickname) {
      setNicknameAvailable(false);
    } else {
      setNicknameAvailable(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className={css`
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0;
        display: grid;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 99;

        .modal {
          width: 85%;
          max-width: 450px;
          padding: 1rem 0 2rem 0;
          align-self: center;
          justify-self: center;
          border-radius: 5px;
          display: grid;
          grid-template-columns: calc(100% - 2rem);
          justify-content: center;
          background-color: #fafafa;
          row-gap: 2rem;

          .close-btn {
            width: max-content;
            justify-self: right;
            border: none;
            background: none;
            color: #a0a0a0;
            cursor: pointer;
            transition: 0.3s;
          }

          .close-btn:hover {
            color: #eb6d6d;
          }

          .modal-title {
            display: flex;
            margin-top: -1rem;
            justify-self: center;
            font-size: 1.2rem;
            font-weight: 700;
          }

          form {
            display: grid;
            row-gap: 0.8rem;
            grid-template-rows: auto auto 20px auto;

            * {
              width: max-content;
              justify-self: center;
            }

            label {
              font-size: 0.9rem;
              color: #a0a0a0;
            }

            input {
              width: 85%;
              max-width: 300px;
              padding: 0.3rem 0.5rem;
              border: 1px solid #e5e5e5;
            }

            .input-response {
              margin-top: -0.4rem;
              font-size: 0.7rem;
              color: red;
            }

            .submit-btn {
              padding: 0.2rem 0.5rem;
              width: max-content;
              justify-self: center;
              border: 1px solid #3466af;
              border-radius: 4px;
              background-color: transparent;
              color: #3466af;
              font-size: 0.8rem;
              transition: 0.2s;
              cursor: pointer;
            }

            .submit-btn:hover {
              background-color: #3466af;
              color: white;
            }

            .submit-btn-disabled {
              padding: 0.2rem 0.5rem;
              width: max-content;
              justify-self: center;
              border: 1px solid #3466af;
              border-radius: 4px;
              background-color: transparent;
              color: #3466af;
              font-size: 0.8rem;
              transition: 0.2s;
            }

            .submit-btn-disabled:disabled {
              opacity: 0.4;
            }
          }
        }
      `}
    >
      <div className="modal">
        <button onClick={closeModal} className="close-btn">
          <CloseIcon />
        </button>
        {isCatchSuccess ? (
          // Catch successful
          <>
            <div className="modal-title">
              <div className="pokemon-name">{name}</div>&nbsp;has been caught!
            </div>
            <form>
              <label htmlFor="nickname-input">
                Please give him a nickname!
              </label>
              <input
                type="text"
                id="nickname-input"
                value={nicknameInput}
                onChange={(e) => checkNickname(e.target.value)}
                autoComplete="off"
              />
              <div className="input-response">
                {nicknameInput.length > 10
                  ? "A nickname should consists of 10 characters max."
                  : !nicknameAvailable
                  ? "Nickname used. Please use other nickname."
                  : ""}
                {}
              </div>
              <button
                type="submit"
                onClick={(e) =>
                  addToMyPokemon(e, id, name, nicknameInput, image)
                }
                disabled={
                  !nicknameAvailable ||
                  !nicknameInput ||
                  nicknameInput.length > 10
                }
                className={
                  !nicknameAvailable ||
                  !nicknameInput ||
                  nicknameInput.length > 10
                    ? "submit-btn-disabled"
                    : "submit-btn"
                }
              >
                Sounds Good!
              </button>
            </form>
          </>
        ) : (
          // Catch unsuccessful
          <>
            <div className="modal-title">
              <div className="pokemon-name">{name}</div>&nbsp;has fled!
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CatchModal;
