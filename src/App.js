import React, { Component } from 'react';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

//Lazily loading components!
const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});


class App extends Component {
    componentDidMount () {
        this.props.onTryAutoSignup();
    }


  render() {
      //Routing setup for unauthenticated users- no URL guards
      let routes = (
          <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/auth" component={asyncAuth} />
              <Redirect to="/" />
          </Switch>
      );
      if (this.props.isAuthenticated) {
          //Route guards - these are not accessible to unauthenticated user,s even manually!
          routes = (
              <Switch>
                  <Route path="/orders" component={asyncOrders} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/auth" component={asyncAuth} />
                  <Route path="/checkout" component={asyncCheckout} />
                  <Route path="/" component={BurgerBuilder} />
                  <Redirect to="/" />
              </Switch> 
          );
      }

    return (
        <BrowserRouter basePath="/">
            <div>
              <Layout>
                  {routes}
              </Layout>
            </div>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
