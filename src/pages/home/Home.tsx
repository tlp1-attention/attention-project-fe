import { Footer } from '../../features/ui/footer/Footer'
import { Header } from '../../features/ui/header/Header'
import './Home.css'

function HomePage() {
    return (
        <>
            <Header />
                <main className='justify-content-center min-vh-100'>Some test text</main>
            <Footer />
        </>
    );
}

export default HomePage
