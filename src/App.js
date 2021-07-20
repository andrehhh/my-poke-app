import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";

const Navbar = loadable(() => import("./components/Navbar"));
const PokemonList = loadable(() => import("./pages/PokemonList"));
const PokemonDetail = loadable(() => import("./pages/PokemonDetail"));
const MyPokemonList = loadable(() => import("./pages/MyPokemonList"));

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <PokemonList />
          </Route>
          <Route
            path="/pokemon/:name"
            children={
              <>
                <Navbar />
                <PokemonDetail />
              </>
            }
          ></Route>
          <Route exact path="/my-pokemons">
            <MyPokemonList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
