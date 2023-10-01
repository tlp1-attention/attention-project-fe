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
import { TimerPage } from '@pages/workspace/TimerPage'
import { EventPage } from '@pages/workspace/EventPage'

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
                path: '/workspace/timer',
                element: <TimerPage />
            },
            {
                path: '/workspace/events',
                element: <EventPage />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
