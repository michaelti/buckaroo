import "./Logout.scss";
import { useEffect } from "react";

function Logout({ authenticate }) {
    useEffect(() => {
        sessionStorage.removeItem("token");
        authenticate();
    }, []);

    return <main className="page-logout">Logging out</main>;
}

export default Logout;
