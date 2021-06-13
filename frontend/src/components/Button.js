import "./Button.scss";
import { Link } from "react-router-dom";

function Button({ isLink, children, ...props }) {
    return isLink ? (
        <Link className="button" {...props}>
            {children}
        </Link>
    ) : (
        <button className="button" {...props}>
            {children}
        </button>
    );
}

export default Button;
