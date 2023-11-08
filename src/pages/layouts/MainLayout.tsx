import { useAuth } from '@features/auth/hooks/useAuth';
import { Footer } from '@features/ui/footer/Footer'
import { Header } from '@features/ui/header/Header'
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    const { isAuthenticated, logout } = useAuth()!;
    return (
        <>
            <Header isAuthenticated={isAuthenticated} logout={logout} />
                <Outlet />
            <Footer />
        </>
    );
}

