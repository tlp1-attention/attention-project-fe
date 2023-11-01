import { Header } from "@features/ui/header/Header";
import "./css/NotFound.css";
import { Footer } from "@features/ui/footer/Footer";
import { useAuth } from "@features/auth/hooks/useAuth";

export function NotFoundPage() {
  const { isAuthenticated, logout } = useAuth()!;
  return (
    <>
      <Header isAuthenticated={isAuthenticated} logout={logout}/>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <article className="">
          <section className="d-flex gap-4 align-items-center">
            <hgroup className="p-4 border-brand d-block">
              <h1 className="display-3 fw-bold">404</h1>
            </hgroup>
            <div className="divider-not-found"></div>
            <p className="lead display-3 p-4">Página no encontrada.</p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
