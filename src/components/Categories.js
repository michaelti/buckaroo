import "./Categories.scss";
import Card from "./Card";
import CategoryCard from "./CategoryCard";

function Categories({ categories }) {
    return (
        <Card className="categories">
            <h2 className="categories__title">🗂 Categories</h2>
            <div className="categories__list">
                {categories.map((category) => (
                    <CategoryCard
                        title={category.title}
                        amount={category.amount}
                        color={category.color}
                    />
                ))}
                <CategoryCard title="+ New category" isPlaceholder />
            </div>
        </Card>
    );
}

export default Categories;
