import React from 'react'
import App from './App';
import Login from './pages/Login';
import { Home } from './pages/Home';
import Register from './pages/Register';
import { createBrowserRouter } from 'react-router-dom';
import Guest from './utils/Guest';
import CheckAuth from './utils/CheckAuth';

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <CheckAuth>
                        <Home />
                    </CheckAuth>
                )
            },
            {
                path: "/login",
                element: (
                    <Guest>
                        <Login />
                    </Guest>
                )
            },
            {
                path: "register",
                element: (
                    <Guest>
                        <Register />
                    </Guest>
                )
            }
        ]
    },
]);
