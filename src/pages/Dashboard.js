import "./Dashboard.scss";
import MonthlySummary from "../components/MonthlySummary";
import Categories from "../components/Categories";
import Card from "../components/Card";
import LatestTransactions from "../components/LatestTransactions";
import NewTransactionForm from "../components/NewTransactionForm";

function Dashboard() {
    return (
        <main className="main dashboard">
            <div className="dashboard__left">
                <h1 className="main__title">👋 Welcome back, User</h1>
                <span>
                    Here is your <strong>TD Chequing</strong> account at a glance
                </span>

                <MonthlySummary totalIncome={975} totalExpense={125} />

                <div className="dashboard__cards">
                    <Card>
                        <NewTransactionForm />
                    </Card>
                    <Card>
                        <LatestTransactions
                            transactions={[
                                { id: 1, date: "2020-12-26", name: "Burrito Boyz", total: -15 },
                                { id: 2, date: "2020-12-25", name: "Pay: Visa", total: -25 },
                                { id: 3, date: "2020-12-24", name: "Deposit", total: 100 },
                            ]}
                        />
                    </Card>
                </div>
            </div>

            <div className="dashboard__right">
                <Card>
                    <Categories
                        categories={[
                            { id: 1, title: "Food", amount: 490, color: "green" },
                            { id: 2, title: "Food", amount: 450, color: "pink" },
                            { id: 3, title: "Food", amount: 35, color: "blue" },
                        ]}
                    />
                </Card>
            </div>
        </main>
    );
}

export default Dashboard;
