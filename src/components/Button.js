import "./Button.scss";
import { Link } from "react-router-dom";

function Button({ isLink, children, ...props }) {
    const normalBtn = (
        <button className="button" {...props}>
            {children}
        </button>
    );

    const linkBtn = (
        <Link className="button" {...props}>
            {children}
        </Link>
    );

    return isLink ? linkBtn : normalBtn;
}

export default Button;
