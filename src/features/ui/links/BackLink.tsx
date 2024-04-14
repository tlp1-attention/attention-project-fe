import { Link } from "react-router-dom";

export function BackLink({ link = "/" }) {
    return (
        <Link
            to={link}
        >
            <i className="bi bi-arrow-90deg-left fs-2"></i>
        </Link>
    )
}