import React, { Component } from 'react'
import { Switch, Route, match, Redirect } from 'react-router-dom'
import createComponent from 'router/lazyLoad';
import Login from 'bundle-loader?lazy&name=page1!pages/login';
import Tables from 'bundle-loader?lazy&name=tables!pages/tables';
import Detail from 'bundle-loader?lazy&name=detail!pages/detail';

export default class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/login" render={createComponent(Login)} />
          <Route path="/list" render={createComponent(Tables)} />
          <Route path="/detail/:id" component={createComponent(Detail)} />
        </Switch> 
      </div>
    );
  }
}
