# My Poke App


## Create React App
This app is first created with `create-react-app`.


## Libraries and Dependencies
- React (useState, useEffect, useRef, useCallback, useContext, createContext)
- GraphQL (gql), Apollo Client (useQuery)
- Material UI Icons
- Eslint
- Loadable
- Emotion (css)
- react-router-dom (BrowserRouter as Router, Switch, Route, useParams, Link)
If there are more libraries and dependencies that I forgot to list here, my apologies.


## Design
The design of this web application is done with Figma. The design file will be attached in this repository.


## Pages
All pages are built with mobile-first development in mind.


### Pokemon List
Pokemon list contains all pokemons fetched from the GraphQL query, and only 50 pokemons are fetched at a time. It has an infinite scroll system where it will fetch the next 50 pokemons to the list evertime the user reaches the end of the list. I avoid loading all pokemons all at once since it will waste the server bandwidth. At the top right corcer of the pokemon list, we can count the number of unique pokemons that we have caught.

Each pokemons is shown as a card. Each card has the pokemon's name, image, and ID. Once we click the pokemon card, it will redirect us to the Pokemon Detail page to view more details regarding the pokemon.


### Pokemon Detail
The Pokemon Detail page consists of an image of a larger scale, the name of the pokemon, its ID, as well as its type. The pokemon type is shown in cards in which the card colour change depending of the type. The unproper position of the text and image is intentional and it looks great.

The moves list consists of the pokemon's moves which will initially load 15 moves. Clicking the show more button will add 15 more moves to the list until there are no more moves, the button will disappear.

On the bottom right corner, there is a red button which enables the user to catch the pokemon. After successfully catching the pokemon, the user will be able to set a nickname to the newly catched pokemon. Users are able to catch the same pokemon multiple times, but its nickname should be different. I have set the nickname check into a case-insensitive format, so 'john' and 'John' will be considered the same and will be rejected. There will be a notice to ask the user to change the nickname if the nickname does not meet the criteria and if nickname exists. The submit button is also disabled in this case.


### My Pokemons
My Pokemons page consists of all the pokemons that the user have collected. The pokemons that the user have collected is saved in the localStorage, so refreshing the page will not remove the list. On the top right corner, the user will be able to find the total number of pokemons they have collected. Each pokemon is also shown in a card, which has its nickname, image, ID, and name. Each pokemon has a button which enables the user to release the pokemon into the wild, removing it from the list. Clicking the card will redirect the user to the Pokemon Detail page of the corresponding pokemon.

If there is no pokemon in the My Pokemons list, a notice will be shown and a button that redirects the user to the Pokemon List page will be available.


## Deployment
The web app is deployed to Netlify.

First, I ran the `npm run build` command to build the react app into static html files. The build file is then deployed into Netlify and can be accessed with the link below.

https://andrehhh-my-poke-app.netlify.app/
