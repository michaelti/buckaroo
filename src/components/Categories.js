import "./Categories.scss";
import CategoryCard from "./CategoryCard";

function Categories({ categories }) {
    return (
        <div className="categories">
            <h2 className="categories__title">🗂 Categories</h2>
            <div className="categories__list">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        title={category.title}
                        amount={category.amount}
                        color={category.color}
                    />
                ))}
                <CategoryCard title="+ New category" isPlaceholder />
            </div>
        </div>
    );
}

export default Categories;
