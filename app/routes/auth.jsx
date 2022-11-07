import { Outlet } from "remix";
import stylesUrl from "../styles/routes/auth.css";

export const links = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

export const handle = {
    hideSidebar: true,
};

export default function () {
    return <Outlet />;
}
