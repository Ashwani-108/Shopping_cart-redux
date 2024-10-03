import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts } from "../redux/categorySlice";
import { useParams } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../utils/localStoageHelpers";

const Category = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { data: categoryProducts, status } = useSelector((state) => state.category);
  const [sortedProducts, setSortedProducts] = useState(categoryProducts);
  const [selectedFilter, setSelectedFilter] = useState("");

  const sortProducts = (products, filter) => {
    switch (filter) {
      case "A-Z":
        console.log(filter,'newfilter')
        return [...products].sort((a, b) => a.title.localeCompare(b.title));  // Alphabetical
      case "Z-A":
        return [...products].sort((a, b) => b.title.localeCompare(a.title));  // Reverse Alphabetical
      case "price-low-to-high":
        return [...products].sort((a, b) => a.price - b.price);  // Price Low to High
      case "price-high-to-low":
        return [...products].sort((a, b) => b.price - a.price);  // Price High to Low
      case "rating":
        return [...products].sort((a, b) => b.rating.rate - a.rating.rate);  // Sort by Rating
      default:
        return products;  // Return original products if no filter is selected
    }
  };

  useEffect(() => {
    const sorted = sortProducts(categoryProducts, selectedFilter);
    setSortedProducts(sorted);
    setLocalStorage("rating",sorted)

    if(sorted){
     getLocalStorage('rating') 
     setSortedProducts(sorted);
    }

  }, [selectedFilter, categoryProducts]);

  useEffect(() => {
    dispatch(fetchCategoryProducts(params.id));
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading categories...</p>;
  }

  if (status === "error") {
    return <p>Failed to load categories.</p>;
  }

  return (
    <div>
      <h1>Category Items</h1>
      <div className="products_filter_wrapper">
        <div className="products_filter">
          <select onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="">Sort By</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="productsWrapper">
          {sortedProducts?.map((item) => {
            return (
              <div className="category__product" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100px" }}
                />
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
              </div>
            );
          })}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Category;
