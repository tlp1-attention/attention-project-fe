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

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <p>Something went wrong...</p>,
        children: [
            {
                index: true,
                element: <HomePage />
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
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
