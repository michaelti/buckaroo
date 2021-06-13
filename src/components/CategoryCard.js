import "./CategoryCard.scss";

function Category({ title, amount, color, isPlaceholder }) {
    const currency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <div className={`category-card ${color ? `category-card--${color}` : ""}`}>
            <div>
                <h3 className="category-card__title">{title}</h3>
                {!isPlaceholder && (
                    <span className="category-card__amount">{currency.format(amount)}</span>
                )}
            </div>
            {!isPlaceholder && <div className="category-card__button">&rarr;</div>}
        </div>
    );
}

export default Category;
