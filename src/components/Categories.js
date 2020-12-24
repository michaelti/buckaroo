import "./Categories.scss";
import Card from "./Card";
import CategoryCard from "./CategoryCard";

function Categories() {
    return (
        <Card className="categories">
            <h2 className="categories__title">🗂 Categories</h2>
            <div className="categories__list">
                <CategoryCard title="Food" amount="490" color="green" />
                <CategoryCard title="Personal" amount="450" color="pink" />
                <CategoryCard title="Business" amount="35" color="blue" />
                <CategoryCard title="+ New category" />
            </div>
        </Card>
    );
}

export default Categories;
