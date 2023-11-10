import { Outlet } from "react-router-dom";
import { LateralNav } from '@features/ui/lateral-nav/LateralNav';
import { PrivateRoute } from "@features/routes/PrivateRoute";
import { Footer } from "@features/ui/footer/Footer";

export default function WorkspaceLayout() {
    return (
        <PrivateRoute>
            <div className="workspace-layout">
                <LateralNav />
                <Outlet />
                <Footer />
            </div>
        </PrivateRoute>
    );
}