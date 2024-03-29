import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import AddPlace from "./pages/AddPlace";
import { AuthProvider } from "./context/AuthContext";
import ContactList from "./pages/ContactList";
import BookList from "./pages/BookList";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/hotels">{Hotels}</Route>
          <Route path="/contactus">{Contact}</Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/addplace" component={AddPlace}></Route>
          <Route path="/contactlist" component={ContactList}></Route>
          <Route path="/booklist" component={BookList}></Route>
        </Switch>
      </Router>
      <Footer></Footer>
    </AuthProvider>
  );
}

export default App;
