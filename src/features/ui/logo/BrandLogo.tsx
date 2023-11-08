import { Link } from "react-router-dom";

export function BrandLogo() {
    return (
        <>
            <Link to="/" className="custom-link me-auto">
                <img
                    src="/assets/attention-logo.png"
                    alt="imagen logo"
                    className="brand-logo"
                />
                <img
                    src="/assets/logo-1.png"
                    alt="logo pequeño"
                    className="brand-logo small"
                />
            </Link>
        </>
    )
}