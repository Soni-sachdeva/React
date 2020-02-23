import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { HomePage } from "../_features/HomePage";
import { LoginPage } from "../_features/LoginPage";
import {
  LOGIN,
  HOMEPAGE,
  PAGE_NOT_FOUND
} from "../_components/config/urlMappings";
import { Provider } from "react-redux";
import store from "../_redux/store";
import "antd/dist/antd.css";

import { PageNotFound } from "../_features/ErrorPage";

const App = props => {
  return (
    <div>
      <Provider store={store} key="news_app_provider_key">
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => {
                props.history.push(LOGIN);
              }}
            />
            <Route exact path={LOGIN} component={LoginPage} />
            <Route exact path={"/"} component={LoginPage} />
            <Route path={HOMEPAGE} component={HomePage} />
            <Route exact path={PAGE_NOT_FOUND} component={PageNotFound} />
            <Redirect path="*" to={PAGE_NOT_FOUND} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
