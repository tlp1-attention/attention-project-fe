import { NotificationPanel } from "@features/notifications/NotificationPanel";
import { AdminRoute } from "@features/routes/AdminRoute";
import { PrivateRoute } from "@features/routes/PrivateRoute";
import { Footer } from "@features/ui/footer/Footer";
import { LateralNav, RouteInfo } from "@features/ui/lateral-nav/LateralNav";
import { Outlet } from "react-router-dom";

export const ADMIN_ROUTE: RouteInfo[] = [
    {
       text: 'Creación de lecturas',
       url: 'readings',
       icon: 'book',
    }
];

export default function AdminPanelLayout() {
    return (
        <AdminRoute>
            <PrivateRoute>
                <div className="workspace-layout">
                    <LateralNav routes={ADMIN_ROUTE} />
                        <Outlet />
                    <Footer />
                </div>
                <NotificationPanel />
            </PrivateRoute>
        </AdminRoute>
    );
}