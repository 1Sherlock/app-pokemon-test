import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout";
const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/admin" component={AdminLayout}/>
                <Redirect from="/" to="/admin/pokemon"/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;