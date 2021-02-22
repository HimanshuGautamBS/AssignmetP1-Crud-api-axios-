import {Route, Switch} from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import User from './components/User';
import UserDetails from "./components/UserDetails";
import EditUser from "./components/EditUser";
// import Userdetails from './Userdetails';
// import UserDetails from './components/UserDetails';
import NewUser from './components/NewUser';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/users" component={User}/>
        <Route path="/users/new" component={NewUser}/>
        {/* Route for dynamic Url */}
        <Route exact path="/users/:id" component={UserDetails}/>
        <Route path="/users/:id/edit" component={EditUser}/>
        <Route component={Error}/>
      </Switch>
    </>
  );
}

export default App;
