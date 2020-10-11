import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';
import Login from '../pages/Login';
import Home from '../pages/Home';
import RegisterProduct from '../pages/RegisterProduct';
import RegisterUser from '../pages/RegisterUser';
import Product from '../pages/Product';

export default function Routes() {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register_product" component={RegisterProduct} />
            <Route path="/register_user" component={RegisterUser} />
            <Route path="/product/:id" component={Product} />
            <Route path="/" component={Home} />
        </Switch>
    );
}
