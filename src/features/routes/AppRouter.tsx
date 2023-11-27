import { AuthContextProvider } from "@features/auth/context/AuthContext";
import { SocketProvider } from "@features/real-time/context/SocketProvider";
import { NotFoundPage } from "@pages/NotFoundPage";
import { Register } from "@pages/auth/Register";
import LoginPage from "@pages/auth/login/LoginPage";
import HomePage from "@pages/home/Home";
import MainLayout from "@pages/layouts/MainLayout";
import WorkspaceLayout from "@pages/layouts/WorkspaceLayout";
import { EventPage } from "@pages/workspace/EventPage";
import { ReadingPage } from "@pages/workspace/IndividualReadingPage";
import { ReadingListPage } from "@pages/workspace/ReadingListPage";
import { ReadingQuizPage } from "@pages/workspace/ReadingQuizPage";
import { ReportPage } from "@pages/workspace/ReportPage";
import { TimerPage } from "@pages/workspace/TimerPage";
import { Toaster } from "@features/ui/toaster/Toaster";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserProfile from "@pages/profile/UserProfile";
import UserDataFormPage from "@pages/userData/UserDataForm";
import UserProfileLayout from "@pages/layouts/UserProfileLayout";
import PreferencesFormPage from "@pages/PreferenceFormPage/PreferencesFormPage";
import { UsersPage } from "@pages/users/UsersPage";

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
    element: <LoginPage />
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
        path: "/workspace/colaboration",
        element: <UsersPage />
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
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

export function AppRouter() {
  return (
    <StrictMode>
      <AuthContextProvider>
        <SocketProvider>
          <Toaster />
          <RouterProvider router={router} />;
        </SocketProvider>
      </AuthContextProvider>
    </StrictMode>
  );
}
