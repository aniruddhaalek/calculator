import React from "react";

import { Switch, Route } from "react-router-dom";

import "./App.css";
import { routes } from "./Routes";

const App: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.login.new}>
        {/* replace this with a component */}
        <h1>Home</h1>
      </Route>
    </Switch>
  );
};

export default App;
