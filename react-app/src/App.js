import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/Auth/LoginForm/LoginForm';
import SignUpForm from './components/Auth/SignUpForm/SignUpForm';
import NavBar from './components/Navigation';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UserProfile from './components/User/UserProfile';
import { authenticate } from './store/session';

import ViewPostings from './components/Postings/ViewAllPostings';
import SinglePosting from './components/Postings/ViewSinglePosting';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = <><NavBar /></>
  } else {
    sessionLinks = <></>
  }

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }



  return (
    <BrowserRouter>
      {loaded && sessionLinks}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <ViewPostings />
        </ProtectedRoute>
        <ProtectedRoute path='/postings/:postingId' exact={true}>
          <SinglePosting />
        </ProtectedRoute>
        <ProtectedRoute path='/:username' exact={true} >
          <UserProfile />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
