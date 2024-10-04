import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts, sortProducts } from "../redux/categorySlice";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../utils/localStoageHelpers";

const Category = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { data: categoryProducts, status } = useSelector(
    (state) => state.category
  );
  const [filteredProducts, setFilteredProducts] = useState();

  useEffect(() => {
    const localCartItems = getLocalStorage("categoryFilteredItems");
    if (localCartItems && localCartItems.length > 0) {
      console.log(localCartItems, "localCartItems");
      setFilteredProducts(localCartItems);
    }
      dispatch(fetchCategoryProducts(params.id));
    
  }, [dispatch])

  if (status === "loading") {
    return <p>Loading categories...</p>;
  }

  if (status === "error") {
    return <p>Failed to load categories.</p>;
  }

  const handleSort = (filter) => {
    dispatch(sortProducts(filter)); // Dispatch sorting action
  };

  return (
    <div>
      <h1>Category Items</h1>
      <div className="products_filter_wrapper">

          <div className="side_products_filter">
            
          </div>

          <div className="products_filter">
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          </div>

          <div className="productsWrapper">
          {categoryProducts?.map((item) => {
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

        </div>
    </div>
  );
};

export default Category;
