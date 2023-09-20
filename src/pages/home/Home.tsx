import { IUser } from "@interfaces/user"
import { Link } from "react-router-dom"

type HomePageProps = {
    user?: IUser
}

export default function HomePage({ user }: HomePageProps) {


    return (
        <main>
            <hgroup className="m-large d-flex justify-content-start align-items-center flex-column gap-2 height-full">
                <h1 className="header-font">
                    ¡Bienvenido a nuestra web, donde la concentración se
                    convierte en un superpoder!
                </h1>
                <Link
                    className="boton flex-grow-0 text-decoration-none"
                    to={ user ? "/workspace/timer" : "/login" }
                >Empieza ahora
                    <i className="bi bi-arrow-right fs-3 p-2"></i>
                </Link>
            </hgroup>
            <article className="m-auto" id="grid">
                <h2 className="d-flex justify-content-center text-center fw-bold pb-4">
                    Potencia tu capacidad de atención
                </h2>
                <section className="d-flex flex-column flex-xl-row p-3 m-4 mx-md-5 justify-content-center gap-5 text-justify">
                    <div className="fs-4 w-100 w-xl-50 parrafos">
                        <p className="w-100">
                            En este espacio, te invitamos a explorar técnicas y
                            estrategias efectivas para{' '}
                            <b>
                                mejorar y potenciar tu capacidad de
                                concentración
                            </b>
                            . Aquí encontrarás recursos prácticos, consejos y
                            herramientas que te ayudarán a desarrollar una{' '}
                            <b>
                                mente enfocada y resistente a las distracciones
                            </b>
                            .
                        </p>
                        <br />
                        <p className="w-100">
                            En un mundo lleno de distracciones constantes,{' '}
                            <b>
                                la capacidad de concentración se ha convertido
                                en un activo valioso
                            </b>
                            . Sabemos lo difícil que puede ser mantener el
                            enfoque en una tarea o proyecto, especialmente
                            cuando estamos rodeados de notificaciones,
                            interrupciones y exigencias constantes.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center max-w-25">
                        <img
                            src="./assets/imagen-1.png"
                            alt="imagen de niño feliz"
                            className="im-1 object-fit-cover shadow-lg"
                        />
                    </div>
                </section>
                <section className="d-flex flex-column  flex-xl-row-reverse m-4 mx-md-5 justify-content-center gap-5 text-justify">
                    <div className="fs-4 w-10 w-xl-50 parrafos">
                        <p className="w-100">
                            <b>
                                La concentración no solo es clave para aumentar
                                nuestra productividad
                            </b>
                            , sino que también nos permite disfrutar plenamente
                            de nuestras experiencias y realizar un trabajo de
                            mayor calidad. A través de la práctica y el
                            aprendizaje continuo, podemos entrenar nuestra mente
                            para ser más selectiva y disciplinada en cuanto a
                            dónde dirigimos nuestra atención.
                        </p>
                        <p className="w-100">
                            Nuestro
                            <b>
                                objetivo es brindarte información y apoyo para
                                que puedas alcanzar un nivel óptimo de
                                concentración
                            </b>
                            en todas las áreas de tu vida. Ya sea que estés
                            estudiando, trabajando en un proyecto importante o
                            simplemente deseas mejorar tu enfoque en las
                            actividades cotidianas, estamos aquí para ayudarte.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center max-w-25">
                        <img
                            src="./assets/imagen-2.png"
                            alt="imagen de niño feliz"
                            className="im-1 object-fit-cover shadow-lg"
                        />
                    </div>
                </section>
            </article>
        </main>
    )
}
