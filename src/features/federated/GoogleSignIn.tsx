import { useAuth } from "@features/auth/hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import './GoogleSignIn.css';
import { useNavigate } from "react-router-dom";

export function GoogleSignIn() {
    const { googleLogin } = useAuth()!;
    const navigate = useNavigate();
    const signInWithGoogle = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                await googleLogin(response.code);
            } catch(err) {
                toast.error('Inicio de sesión con Google no disponible. Por favor, intente de nuevo más tarde.');
            }
            navigate('/workspace/timer');
        },
        onError: async () => {
            toast.error('Error al iniciar sesión con Google. Intente de nuevo.');
        },
        ux_mode: 'popup',
        flow: 'auth-code'
    });

    return (
        <div className="d-flex flex-column w-100 m-2">
            <button onClick={signInWithGoogle} className="btn shadow-sm w-100 sign-in-button d-flex justify-content-center align-items-center gap-2 border border-2 p-2">
                <i className="bi bi-google fs-4 text-brand"></i>
                <span className="fs-4 text-brand">Iniciar sesión con Google</span>
            </button>
        </div>
    );
}

export const IS_GOOGLE_ENABLED = import.meta.env.VITE_GOOGLE_CLIENT_ID !== undefined;
