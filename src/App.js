// App.js
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import DashboardNew from "./DashboardNew";
import About from "./About";
import Contact from "./Contact";
import Profile from "./Profile";
import Preview from "./component/Preview"
const AuthenticatedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const UnauthenticatedRoute = ({ component: Component, isAuthenticated, isRestricted, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && isRestricted ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const App = () => {
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <Router>
      <Switch>
        <UnauthenticatedRoute
          isRestricted={false}
          isAuthenticated={isAuthenticated}
          component={LoginForm}
          path="/login"
          exact
        />
        <UnauthenticatedRoute
          isRestricted={false}
          isAuthenticated={isAuthenticated}
          component={About}
          path="/about"
          exact
        />
        <UnauthenticatedRoute
          isRestricted={false}
          isAuthenticated={isAuthenticated}
          component={Contact}
          path="/contact"
          exact
        />
        <UnauthenticatedRoute
          isAuthenticated={isAuthenticated}
          component={DashboardNew}
          path="/dashboard"
          exact
        />
        <AuthenticatedRoute
          isAuthenticated={isAuthenticated}
          component={Profile}
          path="/profile"
          exact
        />
        <UnauthenticatedRoute
          isAuthenticated={true}
          component={Preview}
          path="/view"
          exact
        />
      </Switch>
    </Router>
  );
};

export default App;
