import { Route, Switch } from 'react-router-dom';

import { UserInfoProvider } from './contexts/UserContext';

import HomeScreen from './components/common/HomeScreen';

import Header from './components/header/Header';
import AllPets from './components/pet/AllPets';
import MyPets from './components/pet/MyPets';
import Create from './components/pet/Create';
import Details from './components/pet/Details';
import Edit from './components/pet/Edit';

import Register from './components/user/Register';
import Login from './components/user/Login';
import MyProfile from './components/user/MyProfile';
import Logout from './components/user/Logout';


function App() {
  return (
    <UserInfoProvider>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/pets/all" exact component={AllPets} />
          <Route path="/pets/myPets" exact component={MyPets} />
          <Route path="/pets/create" exact component={Create} />
          <Route path="/pets/details/:petId" exact component={Details} />
          <Route path="/pets/edit/:petId" exact component={Edit} />
          <Route path="/user/register" exact component={Register} />
          <Route path="/user/login" exact component={Login} />
          <Route path="/user/myprofile" exact component={MyProfile} />
          <Route path="/user/logout" exact component={Logout} />
        </Switch>
      </div>
    </UserInfoProvider>
  );
}

export default App;
