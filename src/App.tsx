import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Popular from "./Routes/Popular";
import Search from "./Routes/Search";
import Comingsoon from "./Routes/Comingsoon";
import Nowplaying from "./Routes/Nowplaying";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/comingsoon">
          <Comingsoon />
        </Route>
        <Route path="/nowplaying">
          <Nowplaying />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Popular />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;