import { Outlet } from "react-router-dom";
import { LateralNav } from '@features/ui/lateral-nav/LateralNav';
import { PrivateRoute } from "@features/routes/PrivateRoute";

export default function WorkspaceLayout() {
    return (
        <PrivateRoute>
            <div className="workspace-layout">
                <LateralNav />
                <Outlet />
            </div>
        </PrivateRoute>
    );
}