import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import MainLayout from './pages/layouts/MainLayout'
import HomePage from '@pages/home/Home'
import LoginForm from '@pages/auth/login/LoginPage'
import { Register } from '@pages/auth/Register'
import WorkspaceLayout from '@pages/layouts/WorkspaceLayout'
import { TimerPage } from '@pages/workspace/TimerPage'
import { EventPage } from '@pages/workspace/EventPage'
import { AuthContextProvider } from '@features/auth/context/AuthContext'
import { Toaster } from '@features/ui/toaster/Toaster';
import { ReadingListPage } from '@pages/workspace/ReadingListPage'

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
            },
            {
                path: '/workspace/readings',
                element: <ReadingListPage />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <>
                <Toaster />
                <RouterProvider router={router} />
            </>
        </AuthContextProvider>
    </React.StrictMode>
)
