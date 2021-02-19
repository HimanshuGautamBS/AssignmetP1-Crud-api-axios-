import {Route, Switch} from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import User from './components/User';
import Details from "./components/Details";
import EditPage from "./components/EditPage";
// import Userdetails from './Userdetails';
// import UserDetails from './components/UserDetails';
import UserInput from './components/UserInput';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/users" component={User}/>
        <Route path="/users/new" component={UserInput}/>
        {/* Route for dynamic Url */}
        <Route exact path="/users/:id" component={Details}/>
        <Route path="/users/:id/edit" component={EditPage}/>
        <Route component={Error}/>
      </Switch>
    </>
  );
}

export default App;
