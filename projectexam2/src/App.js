import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/hotels">{Hotels}</Route>
        <Route path="/book">{Book}</Route>
        <Route path="/contactus">{Contact}</Route>
        <Route path="/login">{Login}</Route>
      </Switch>
    </Router>
  );
}

export default App;
