import "./Dashboard.scss";
import MonthlySummary from "../components/MonthlySummary";
import Categories from "../components/Categories";
import Card from "../components/Card";

function Dashboard() {
    return (
        <main class="main dashboard">
            <div className="dashboard__left">
                <h1 className="main__title">👋 Welcome back, User</h1>
                <span>
                    Here is your <strong>TD Chequing</strong> account at a glance
                </span>

                <MonthlySummary totalIncome={975} totalExpense={125} />

                <div class="dashboard__cards">
                    <Card>
                        <h2>💰 New Transaction</h2>
                    </Card>
                    <Card>
                        <h2>🗒 Latest Transactions</h2>
                    </Card>
                </div>
            </div>

            <div className="dashboard__right">
                <Categories />
            </div>
        </main>
    );
}

export default Dashboard;
