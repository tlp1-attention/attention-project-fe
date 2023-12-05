import { Link } from "react-router-dom";

export function BackLink() {
    return (
        <Link
            to="/"
        >
            <i className="bi bi-arrow-90deg-left fs-2"></i>
        </Link>
    )
}