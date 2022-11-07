import { logout } from "~/utils/session.server";

export function loader({ request }) {
    return logout(request);
}
