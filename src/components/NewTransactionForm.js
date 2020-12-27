import "./NewTransactionForm.scss";
import Button from "./Button";
import { useState } from "react";

function NewTransactionForm() {
    const [infoValues, setInfoValues] = useState({
        date: new Date().toISOString().split("T")[0],
    });

    const [amountValues, setAmountValues] = useState({});

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
                <label className="new-tx__item">
                    <span>Food</span>
                    <input
                        type="number"
                        step="0.01"
                        className="new-tx__input new-tx__input--amount"
                        placeholder="0.00"
                        name="amount_food"
                        onChange={handleChangeAmount}
                        value={amountValues.amount_food}
                        onBlur={formatAmount}
                    />
                </label>
                <label className="new-tx__item">
                    <span>Personal</span>
                    <input
                        type="number"
                        step="0.01"
                        className="new-tx__input new-tx__input--amount"
                        placeholder="0.00"
                        name="amount_personal"
                        onChange={handleChangeAmount}
                        value={amountValues.amount_personal}
                        onBlur={formatAmount}
                    />
                </label>
                <label className="new-tx__item">
                    <span>Business</span>
                    <input
                        type="number"
                        step="0.01"
                        className="new-tx__input new-tx__input--amount"
                        placeholder="0.00"
                        name="amount_business"
                        onChange={handleChangeAmount}
                        value={amountValues.amount_business}
                        onBlur={formatAmount}
                    />
                </label>
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
