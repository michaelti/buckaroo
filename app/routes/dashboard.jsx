import { requireUserId, getUser } from "~/utils/session.server";
import { useLoaderData } from "remix";

export async function loader({ request }) {
    await requireUserId(request);
    const user = await getUser(request);
    return { user };
}

export default function () {
    const { user } = useLoaderData();

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
        </div>
    );
}
