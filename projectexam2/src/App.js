import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import BookPlace from "./pages/BookPlace";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import AddPlace from "./pages/AddPlace";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/hotels">{Hotels}</Route>
          <Route path="/book">{BookPlace}</Route>
          <Route path="/contactus">{Contact}</Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/addplace" component={AddPlace}></Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
