import { Footer } from '@features/ui/footer/Footer'
import { Header } from '@features/ui/header/Header'
import '../home/Home.css'
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <>
            <Header />
                <Outlet />
            <Footer />
        </>
    );
}

