import "./Dashboard.scss";
import MonthlySummary from "../components/MonthlySummary";
import Categories from "../components/Categories";
import Card from "../components/Card";
import LatestTransactions from "../components/LatestTransactions";
import NewTransactionForm from "../components/NewTransactionForm";
import axios from "axios";
import { compareDesc } from "date-fns";
import { useState, useEffect } from "react";

function Dashboard() {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "/transactions").then((response) => {
            const sortedData = response.data.sort((a, b) => {
                const byDate = compareDesc(new Date(a.date), new Date(b.date));
                const byId = b.id - a.id;
                return byDate || byId;
            });

            setTransactions(sortedData.slice(0, 5));
        });
    };

    useEffect(fetchTransactions, []);

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
                        <NewTransactionForm fetchTransactions={fetchTransactions} />
                    </Card>
                    <Card>
                        <LatestTransactions transactions={transactions} />
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
