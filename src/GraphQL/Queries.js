import gql from "graphql-tag";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        name
        image
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      message
    }
  }
`;

export const GET_SPECIES = gql`
  query species {
    species {
      count
      next
      previous
      results {
        url
        name
      }
    }
  }
`;
