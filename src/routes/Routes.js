import React from 'react';
import PropTypes from 'prop-types';
import {  Route } from 'react-router-dom';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    isVendor,
    isSeller,
    ...rest
}) {
    // const { signed } = store.getState().auth;
    // const { profile } = store.getState().user;
    // if (!profile && isPrivate) {
    //     return <Redirect to={ROUTES.LOGIN} />;
    // }

    // if (!signed && isPrivate) {
    //     return <Redirect to={ROUTES.LOGIN} />;
    // }

    return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
};

RouteWrapper.defaultProps = {
    isPrivate: false,
};
