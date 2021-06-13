import "./NewTransactionForm.scss";
import Button from "./Button";
import { useState } from "react";
import { formatISO } from "date-fns";
import axios from "axios";

function NewTransactionForm({ fetchTransactions }) {
    const initialState = {
        infoValues: {
            date: formatISO(new Date(), { representation: "date" }),
            details: "",
        },
        amountValues: {},
    };

    const [infoValues, setInfoValues] = useState(initialState.infoValues);
    const [amountValues, setAmountValues] = useState(initialState.amountValues);

    // Temp
    const [categories] = useState([
        { id: 1, name: "Food" },
        { id: 2, name: "Personal" },
        { id: 3, name: "Business" },
    ]);

    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        setInfoValues({ ...infoValues, [name]: value });
    };

    const handleChangeAmount = (e) => {
        const { name, value } = e.target;
        setAmountValues({ ...amountValues, [name]: value });
    };

    const formatAmount = (e) => {
        const { name, value } = e.target;

        if (amountValues[name]) {
            setAmountValues({ ...amountValues, [name]: Number(value).toFixed(2) });
        }
    };

    const getTotal = () => {
        const amounts = Object.values(amountValues);
        const total = amounts.reduce((acc, curr) => {
            return acc + Number(curr);
        }, 0);

        return total.toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const preparedAmounts = Object.entries(amountValues).map(([key, value]) => ({
            category_id: key,
            amount: value * 100,
        }));

        axios
            .post(process.env.REACT_APP_BACKEND_URL + "/transactions", {
                ...infoValues,
                categories: preparedAmounts,
            })
            .then(() => {
                setInfoValues(initialState.infoValues);
                setAmountValues(initialState.amountValues);
                fetchTransactions();
            });
    };

    return (
        <div className="new-tx">
            <h2>💰 New Transaction</h2>
            <form onSubmit={handleSubmit} className="new-tx__form">
                <label className="new-tx__item">
                    <span>Date</span>
                    <input
                        type="date"
                        className="new-tx__input new-tx__input--date"
                        name="date"
                        onChange={handleChangeInfo}
                        value={infoValues.date}
                        required
                    />
                </label>
                <label className="new-tx__item">
                    <span>Details</span>
                    <input
                        type="text"
                        className="new-tx__input new-tx__input--details"
                        name="details"
                        onChange={handleChangeInfo}
                        value={infoValues.details}
                    />
                </label>
                {categories.map((category) => (
                    <label className="new-tx__item" key={category.id}>
                        <span>{category.name}</span>
                        <input
                            type="number"
                            step="0.01"
                            className="new-tx__input new-tx__input--amount"
                            placeholder="0.00"
                            name={category.id}
                            onChange={handleChangeAmount}
                            value={amountValues[category.id] || ""}
                            onBlur={formatAmount}
                        />
                    </label>
                ))}
                <div className="new-tx__item new-tx__item--submit">
                    <span>
                        Total <strong>${getTotal()}</strong>
                    </span>
                    <Button>Save transaction</Button>
                </div>
            </form>
        </div>
    );
}

export default NewTransactionForm;
