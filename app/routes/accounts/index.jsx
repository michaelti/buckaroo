import { requireUserId } from "~/utils/session.server";
import { redirect, useCatch } from "remix";
import Account from "../../../db/models/account";

export async function loader({ request }) {
    const userId = await requireUserId(request);

    const accounts = await Account.query().where({ user_id: userId });

    if (accounts.length < 1) throw new Response("No accounts found");

    const account = accounts[0];

    return redirect("/accounts/" + account.id);
}

export default function Index() {
    return null;
}

export function CatchBoundary() {
    const caught = useCatch();

    return <div>{caught.data}</div>;
}
