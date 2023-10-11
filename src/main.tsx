import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import MainLayout from './pages/layouts/MainLayout'
import HomePage from '@pages/home/Home'
import LoginForm from '@pages/auth/LoginForm'
import { Register } from '@pages/auth/Register'
import WorkspaceLayout from '@pages/layouts/WorkspaceLayout'
import { UsersPage } from '@pages/users/UsersPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <p>Something went wrong...</p>,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/users',
                element: <UsersPage />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginForm />,
    },
    {
        path: '/register',
        element: <Register />
    },
    { 
        path: '/workspace',
        element: <WorkspaceLayout />,
        children: [
            {
                index: true,
                element: <p>Timer component</p>
            },
            {
                
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
