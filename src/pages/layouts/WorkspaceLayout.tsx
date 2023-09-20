import { Outlet } from "react-router-dom";
import { LateralNav } from '@features/ui/lateral-nav/LateralNav';

export default function WorkspaceLayout() {
    return (
        <>
            <LateralNav />
            <Outlet />
        </>
    );
}