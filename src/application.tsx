import React, { useEffect } from 'react';
import { BrowserRouter, Switch, RouteComponentProps, Route } from 'react-router-dom';
// import logging from './config/logging';
import routes from './config/routes';

const Application: React.FunctionComponent<{}> = props => {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            <Route
                                key = {index}
                                path = {route.path}
                                exact = {route.exact}
                                render = {(props: RouteComponentProps<any>) => (
                                    <route.component
                                        name = {route.name}
                                        {...props}
                                        {...route.props}
                                    />
                                )}
                            />
                        );
                    })}
                </Switch>
            </BrowserRouter>
        </div>
    )
}


export default Application