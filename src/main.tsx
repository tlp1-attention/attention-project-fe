import { AuthContextProvider } from "@features/auth/context/AuthContext";
import { Toaster } from "@features/ui/toaster/Toaster";
import LoginForm from "@pages/auth/login/LoginPage";
import { Register } from "@pages/auth/Register";
import HomePage from "@pages/home/Home";
import WorkspaceLayout from "@pages/layouts/WorkspaceLayout";
import { EventPage } from "@pages/workspace/EventPage";
import { ReadingPage } from "@pages/workspace/IndividualReadingPage";
import { ReadingListPage } from "@pages/workspace/ReadingListPage";
import { ReadingQuizPage } from "@pages/workspace/ReadingQuizPage";
import { TimerPage } from "@pages/workspace/TimerPage";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainLayout from "./pages/layouts/MainLayout";
import { NotFoundPage } from "@pages/NotFoundPage";
import { ReportPage } from "@pages/workspace/ReportPage";
import UserProfile from "@pages/profile/UserProfile";
import UserDataFormPage from "@pages/userData/UserDataForm";
import UserProfileLayout from "@pages/layouts/UserProfileLayout";
import PreferencesFormPage from "@pages/PreferenceFormPage/PreferencesFormPage";

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/workspace",
    element: <WorkspaceLayout />,
    children: [
      {
        index: true,
        path: "/workspace/timer",
        element: <TimerPage />
      },
      {
        path: "/workspace/events",
        element: <EventPage />
      },
      {
        path: "/workspace/readings",
        element: <ReadingListPage />
      },
      {
        path: "/workspace/readings/:readingId",
        element: <ReadingPage />
      },
      {
        path: "/workspace/readings/:readingId/quiz",
        element: <ReadingQuizPage />
      },
      {
        path: "/workspace/report",
        element: <ReportPage />
      }
    ]
  },
  {
    path: "/user",
    element: <UserProfileLayout />,
    children: [
      {
        index: true,
        path: "/user/profile",
        element: <UserProfile />
      },
      {
        path: "/user/preferences",
        element: <PreferencesFormPage />
      },
      {
        path: "/user/userData",
        element: <UserDataFormPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <>
        <Toaster />
        <RouterProvider router={router} />
      </>
    </AuthContextProvider>
  </React.StrictMode>
);
