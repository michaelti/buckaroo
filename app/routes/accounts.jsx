import { requireUserId, getUser } from "~/utils/session.server";
import { useLoaderData, Outlet, NavLink } from "remix";
import stylesUrl from "../styles/routes/accounts.css";

export const links = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

export async function loader({ request }) {
    await requireUserId(request);
    const user = await getUser(request);
    const accounts = await user.$relatedQuery("accounts");

    return { accounts };
}

export default function () {
    const { accounts } = useLoaderData();

    return (
        <div>
            <nav className="account-navigation">
                {accounts.map((account) => (
                    <article key={account.id}>
                        <NavLink className="account-navigation__link" to={String(account.id)}>
                            {account.name}
                        </NavLink>
                    </article>
                ))}
            </nav>

            <Outlet />
        </div>
    );
}
