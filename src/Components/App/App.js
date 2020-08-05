import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';

import Homepage from '../Homepage/Homepage';
import Navbar from '../Navbar/Navbar';
import Authcontext from '../../Authcontext/Authcontext';
import Postdetails from '../Postdetails/Postdetails';
import FourOfour from '../404Page/404page';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Createpost from '../Createpost/Createpost';


const App = () => {
    const [darkmode, setDarkmode] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <div className={darkmode ? 'App App-dark' : 'App'}>
            <Authcontext.Provider value={{
                darkmode: darkmode,
                setDarkmode: setDarkmode,
                loading: loading,
                setLoading: setLoading,
            }}>

                <Route path='/' component={Navbar} />

                <Switch>
                    <Route path='/' exact component={Homepage} />
                    <Route path='/post/:id' exact component={Postdetails} />
                    <Route path='/about' exact component={About} />
                    <Route path='/contact' exact component={Contact} />
                    <Route path='/createpostrinkuprat' exact component={Createpost} />
                    <Route component={FourOfour} />
                </Switch>
            </Authcontext.Provider>
        </div>
    )
}

export default App;
