import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import Landingpage from '../../Components/Landingpage/Landingpage';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Blogpage from '../../Components/Blogpage/Blogpage';
import Create from '../../Components/Blogpage/Create/Create';
import Details from '../../Components/Blogpage/Details/Details';
import Update from '../../Components/Blogpage/Update/Update';
import Delete from '../../Components/Blogpage/Delete/Delete';
import fourOfourPage from '../../Components/404Page/404page';


class App extends React.Component {
  render() {
    let home = <Route path='/' exact component={Landingpage} />;

    if (localStorage.getItem('loggedin') === 'true') {
      home = <Route path='/' exact component={Blogpage} />;
    }

    console.log(this.props)
    if (this.props.history.location.pathname)

      return (
        <div>
          <Switch>
            {home}
            <Route path='/signup' exact component={Signup} />
            <Route path='/login' exact component={Login} />
            <Route path='/blog/new' exact component={Create} />
            <Route path='/blog/details/:id' exact component={Details} />
            <Route path='/blog/update/:id' exact component={Update} />
            <Route path='/blog/delete/:id' exact component={Delete} />
            <Route component={fourOfourPage} />
          </Switch>
        </div>
      )
  }
}

export default withRouter(App);