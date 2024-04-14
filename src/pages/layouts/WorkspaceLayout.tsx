import { Outlet } from "react-router-dom";
import { LateralNav, RouteInfo } from '@features/ui/lateral-nav/LateralNav';
import { PrivateRoute } from "@features/routes/PrivateRoute";
import { Footer } from "@features/ui/footer/Footer";
import { NotificationPanel } from "@features/notifications/NotificationPanel";

const ROUTES: RouteInfo[] = [
  {
    text: "Inicio",
    icon: "home",
    url: "/",
  },
  {
    text: "Lectura",
    icon: "book",
    url: "/workspace/readings",
  },
  {
    text: "Memorama",
    icon: "lightbulb",
    url: "/workspace/memoTest",
  },
  {
    text: "Temporizador",
    icon: "clock",
    url: "/workspace/timer",
  },
  {
    text: 'Eventos',
    icon: 'calendar',
    url: '/workspace/events'
  },
  {
    text: "Espacio colaborativo",
    icon: "columns",
    url: "/workspace/colaboration",
  },
  {
    text: 'Reportes',
    icon: "columns",
    url: "/workspace/report"
  },
  {
    text: 'Perfil',
    icon: "user",
    url: "/workspace/user/profile"
  }
];

export default function WorkspaceLayout() {
    return (
        <PrivateRoute>
            <div className="workspace-layout">
                <LateralNav routes={ROUTES} />
                    <Outlet />
                <Footer />
            </div>
            <NotificationPanel />
        </PrivateRoute>
    );
}