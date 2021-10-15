
import './App.css';
import NavBar from './components/shared/NavBar/NavBar';
import Home from './components/Home/Home';
import Foods from './components/Foods/Foods';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import FoodDetails from './components/Foods/FoodDetails/FoodDetails';
import Login from './components/AdminUser/Login/Login';
import Register from './components/AdminUser/Register/Register';

function App() {
  return (
    <>
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route exact path="/all-foods">
          <Foods></Foods>
        </Route>
        <Route exact path="/foods/:foodId">
          <FoodDetails></FoodDetails>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/register">
          <Register></Register>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
