import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Popular from "./Routes/Popular";
import Search from "./Routes/Search";
import Comingsoon from "./Routes/Comingsoon";
import Nowplaying from "./Routes/Nowplaying";
import BoxTest from "./Routes/BoxTest";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/test">
          <BoxTest />
        </Route>
        <Route path={["/comingsoon", "/comingsoon/:movieId"]}>
          <Comingsoon />
        </Route>
        <Route path={["/nowplaying", "/nowplaying/:movieId"]}>
          <Nowplaying />
        </Route>
        <Route path={["/search", "/search/:movieId"]}>
          <Search />
        </Route>
        <Route path={["/", "/popular/:movieId"]}>
          <Popular />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;