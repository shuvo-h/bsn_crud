
import './App.css';
import NavBar from './components/shared/NavBar/NavBar';
import Home from './components/Home/Home';
import Foods from './components/Foods/Foods';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import FoodDetails from './components/Foods/FoodDetails/FoodDetails';
import Login from './components/AdminUser/Login/Login';
import Register from './components/AdminUser/Register/Register';
import AuthProvider from "./components/Context/Context"
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Lunch from './components/Foods/Lunch/Lunch';
import Breakfast from './components/Foods/Breakfast/Breakfast';
import Dinner from './components/Foods/Dinner/Dinner';

function App() {
  const demovatr = "";
  const allstag = 878;
  return (
    <>
    <AuthProvider>
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/all-foods">
            <Foods></Foods>
          </Route>
          <PrivateRoute exact path="/foods/:foodId">
            <FoodDetails></FoodDetails>
          </PrivateRoute>
          <Route exact path="/breakfast">
            <Breakfast></Breakfast>
          </Route>
          <Route exact path="/lunch">
            <Lunch></Lunch>
          </Route>
          <Route exact path="/dinner">
            <Dinner></Dinner>
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
    </AuthProvider>
    </>
  );
}

export default App;
