import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { GET_POKEMONS } from "./GraphQL/Queries";

const AppContext = React.createContext();

// Get myPokemons from localStorage function
const getMyPokemons = () => {
  let myPokemons = localStorage.getItem("myPokemons");
  if (myPokemons) {
    return (myPokemons = JSON.parse(localStorage.getItem("myPokemons")));
  } else {
    return [];
  }
};

const AppProvider = ({ children }) => {
  // PokemonList
  const [pokemonList, setPokemonList] = useState({
    pokemons: [],
    loading: false,
    error: {},
  });

  // myPokemons
  const [myPokemons, setMyPokemons] = useState(getMyPokemons());
  useEffect(() => {
    localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
  }, [myPokemons]);

  // Page for infinite scroll
  const [queryVariables, setQueryVariables] = useState({
    limit: 50,
    offset: 0,
  });

  // GraphQL useQuery and update state
  const [hasMore, setHasMore] = useState(true);
  const {
    loading: pokemonsGQLLoading,
    error: pokemonsGQLError,
    data: pokemonsGQLData,
  } = useQuery(GET_POKEMONS, {
    variables: queryVariables,
  });
  useEffect(() => {
    if (pokemonsGQLData) {
      setPokemonList((prevPokemons) => {
        if (prevPokemons.length + 50 > pokemonsGQLData.count) {
          setHasMore(false);
        }
        return {
          ...prevPokemons,
          pokemons: [
            ...new Set([
              ...prevPokemons.pokemons,
              ...pokemonsGQLData.pokemons.results,
            ]),
          ],
        };
      });
    }
  }, [pokemonsGQLData]);
  useEffect(() => {
    setPokemonList((prevPokemons) => {
      return {
        ...prevPokemons,
        loading: pokemonsGQLLoading,
        error: pokemonsGQLError,
      };
    });
  }, [pokemonsGQLLoading, pokemonsGQLError]);

  // Infinite scroll function
  const nextPage = () => {
    setQueryVariables((prevVariables) => {
      return {
        ...prevVariables,
        offset: prevVariables.offset + prevVariables.limit,
      };
    });
  };

  // Catch modal toggle state and settings
  const [catchModalToggle, setCatchModalToggle] = useState({
    isOpen: false,
    isCatchSuccess: false,
    name: "",
    image: "",
  });
  // Catch pokemon function
  const catchPokemon = (id, name, image) => {
    const isCatchSuccess = Math.random() >= 0.5;
    setCatchModalToggle({
      isOpen: true,
      isCatchSuccess: isCatchSuccess,
      id,
      name,
      image,
    });
  };

  const closeModal = () => {
    setCatchModalToggle({
      isOpen: false,
      isCatchSuccess: false,
      name: "",
      image: "",
    });
  };

  // Add new pokemon to myPokemons
  const addToMyPokemon = (e, id, name, nickname, image) => {
    e.preventDefault();
    const newPokemon = { id, name, nickname, image };
    if (!myPokemons.find((pokemon) => pokemon.nickname === nickname)) {
      setMyPokemons((prevMyPokemons) => {
        return [...prevMyPokemons, newPokemon];
      });
      closeModal();
    }
  };

  // Total discovered pokemons
  const [totalDiscovered, setTotalDiscovered] = useState(0);
  useEffect(() => {
    var uniquePokemons = [];
    if (myPokemons && myPokemons.length > 0) {
      myPokemons.forEach((pokemon) => {
        uniquePokemons.push(pokemon.name);
      });
      uniquePokemons = [...new Set([...uniquePokemons])];
      setTotalDiscovered(uniquePokemons.length);
    }
  }, [myPokemons]);

  const releasePokemon = (nickname) => {
    const newMyPokemonsList = myPokemons.filter(
      (pokemon) => pokemon.nickname !== nickname
    );
    setMyPokemons(newMyPokemonsList);
  };

  return (
    <AppContext.Provider
      value={{
        pokemonList,
        nextPage,
        catchPokemon,
        catchModalToggle,
        closeModal,
        addToMyPokemon,
        myPokemons,
        totalDiscovered,
        releasePokemon,
        hasMore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to get context values
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
