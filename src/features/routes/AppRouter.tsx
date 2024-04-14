import { AuthContextProvider } from "@features/auth/context/AuthContext";
import { FederatedAuthProvider } from "@features/federated/FederatedAuthProvider";
import { SocketProvider } from "@features/real-time/context/SocketProvider";
import { Toaster } from "@features/ui/toaster/Toaster";
import { NotFoundPage } from "@pages/NotFoundPage";
import PreferencesFormPage from "@pages/PreferenceFormPage/PreferencesFormPage";
import { AdminPanelPage } from "@pages/admin-panel/AdminPanelPage";
import { Register } from "@pages/auth/Register";
import LoginPage from "@pages/auth/login/LoginPage";
import HomePage from "@pages/home/Home";
import AdminPanelLayout from "@pages/layouts/AdminPanelLayout";
import MainLayout from "@pages/layouts/MainLayout";
import UserProfileLayout from "@pages/layouts/UserProfileLayout";
import WorkspaceLayout from "@pages/layouts/WorkspaceLayout";
import MemoTest from "@pages/memoTest/MemoTest";
import { MemoTestProvider } from "@pages/memoTest/context/MemoTestContext";
import UserProfile from "@pages/profile/UserProfile";
import UserDataFormPage from "@pages/userData/UserDataForm";
import { UsersPage } from "@pages/users/UsersPage";
import { EventPage } from "@pages/workspace/EventPage";
import { ReadingPage } from "@pages/workspace/IndividualReadingPage";
import { ReadingListPage } from "@pages/workspace/ReadingListPage";
import { ReadingQuizPage } from "@pages/workspace/ReadingQuizPage";
import { ReportPage } from "@pages/workspace/ReportPage";
import { TimerPage } from "@pages/workspace/TimerPage";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <p>Something went wrong...</p>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/workspace",
    element: <WorkspaceLayout />,
    children: [
      {
        index: true,
        path: "/workspace/timer",
        element: <TimerPage />,
      },
      {
        path: "/workspace/events",
        element: <EventPage />,
      },
      {
        path: "/workspace/colaboration",
        element: <UsersPage />,
      },
      {
        path: "/workspace/readings",
        element: <ReadingListPage />,
      },
      {
        path: "/workspace/colaboration/:userId?",
        element: <UsersPage />,
      },
      {
        path: "/workspace/readings/:readingId",
        element: <ReadingPage />,
      },
      {
        path: "/workspace/readings/:readingId/quiz",
        element: <ReadingQuizPage />,
      },
      {
        path: "/workspace/memoTest",
        element: (
          <MemoTestProvider>
            <MemoTest />
          </MemoTestProvider>
        ),
      },
      {
        path: "/workspace/report",
        element: <ReportPage />,
      },
    ],
  },
  {
    path: "/workspace/user",
    element: <UserProfileLayout />,
    children: [
      {
        index: true,
        path: "/workspace/user/profile",
        element: <UserProfile />,
      },
      {
        path: "/workspace/user/preferences",
        element: <PreferencesFormPage />,
      },
      {
        path: "/workspace/user/userData",
        element: <UserDataFormPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminPanelLayout />,
    children: [{
      index: true,
      path: '/admin/readings',
      element: <AdminPanelPage />
    }]
  },
  {
    path: "/user",
    element: <UserProfileLayout />,
    children: [
      {
        index: true,
        path: "/user/profile",
        element: <UserProfile />,
      },
      {
        path: "/user/preferences",
        element: <PreferencesFormPage />,
      },
      {
        path: "/user/userData",
        element: <UserDataFormPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return (
    <StrictMode>
      <AuthContextProvider>
        <FederatedAuthProvider>
          <SocketProvider>
            <Toaster />
            <RouterProvider router={router} />;
          </SocketProvider>
        </FederatedAuthProvider>
      </AuthContextProvider>
    </StrictMode>
  );
}
