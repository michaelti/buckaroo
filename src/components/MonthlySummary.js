import "./MonthlySummary.scss";

function MonthlySummary({ totalIncome, totalExpense }) {
    const currency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <div class="monthly-summary-container">
            <div class="monthly-summary">
                <span>⊕ Total Income</span>
                <div className="monthly-summary__value">{currency.format(totalIncome)}</div>
            </div>
            <div class="monthly-summary">
                <span>⊖ Total Expenses</span>
                <div className="monthly-summary__value">{currency.format(totalExpense)}</div>
            </div>
        </div>
    );
}

export default MonthlySummary;
