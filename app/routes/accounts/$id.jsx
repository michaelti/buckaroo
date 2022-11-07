import { requireUserId } from "~/utils/session.server";
import { useLoaderData, useCatch, Form, Link } from "remix";
import Account from "../../../db/models/account";
import Transaction from "../../../db/models/transaction";
import { formatISO } from "date-fns";

export async function loader({ request, params }) {
    const userId = await requireUserId(request);

    const account = await Account.query().findOne({ user_id: userId, id: params.id });

    if (!account) throw new Response("Account not found", { status: 404 });

    const transactions = await Transaction.query()
        .where({ account_id: account.id })
        .withGraphFetched("category")
        .orderBy("date", "desc")
        .orderBy("id", "desc");

    return { account, transactions };
}

export async function action({ request }) {
    // TODO: check permission before mutating the data

    const formData = await request.formData();
    const action = await formData.get("form-action");

    switch (action) {
        case "create": {
            const account_id = formData.get("account_id");
            const category_id = formData.get("category_id");
            const amount = formData.get("amount");
            const name = formData.get("name");
            const date = formData.get("date");

            try {
                await Transaction.query().insert({
                    account_id,
                    category_id,
                    amount: amount * 100,
                    name,
                    date,
                });
            } catch {
                return "Error";
            }

            return null;
        }

        case "delete": {
            const id = formData.get("id");

            try {
                await Transaction.query().deleteById(id);
            } catch {
                return "Error";
            }

            return null;
        }

        default: {
            throw new Error("Unexpected action");
        }
    }
}

export default function Index() {
    const { account, transactions } = useLoaderData();

    return (
        <div>
            <h2>{account.name}</h2>

            <Form method="post" className="new-transaction">
                <input type="text" name="amount" placeholder="Amount" />
                <input type="text" name="name" placeholder="Description" />
                <select name="category_id">
                    <option value="1">Food</option>
                    <option value="2">Travel</option>
                    <option value="3">Tech</option>
                </select>
                <input
                    type="date"
                    name="date"
                    defaultValue={formatISO(new Date(), { representation: "date" })}
                />
                <input type="hidden" name="account_id" value={account.id} />
                <input type="hidden" name="form-action" value="create" />
                <button>Add transaction</button>
            </Form>

            {transactions.map((transaction) => (
                <article key={transaction.id} className="transaction">
                    <div className="transaction__amount">${transaction.amount / 100}</div>
                    <div>{transaction.name}</div>
                    <div>{transaction.category.name}</div>
                    <div>{transaction.date}</div>

                    <Form method="post">
                        <input type="hidden" name="id" value={transaction.id} />
                        <input type="hidden" name="form-action" value="delete" />
                        <button>Delete</button>
                    </Form>
                </article>
            ))}
        </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    return <div>{caught.data}</div>;
}

export function ErrorBoundary({ error }) {
    console.error(error);

    return <div>Error loading account data.</div>;
}
