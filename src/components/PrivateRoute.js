import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, loggedIn, ...routeProps }) => (
    <Route {...routeProps} render={(props) => (
      (loggedIn === true) ? 
            <Component {...props} {...routeProps} /> :<Redirect to='/login' />)
        } 
    />
);

export default PrivateRoute;