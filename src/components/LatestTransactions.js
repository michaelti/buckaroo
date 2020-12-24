import "./LatestTransactions.scss";

function LatestTransactions({ transactions }) {
    const currency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <div className="latest-transactions">
            <h2>🗒 Latest Transactions</h2>
            <table className="latest-transactions__table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.name}</td>
                            <td>
                                <strong>{currency.format(transaction.total)}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LatestTransactions;
