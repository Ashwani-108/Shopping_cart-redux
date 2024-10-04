import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/cartSlice";
import { STATUSES, fetchProducts } from "../redux/productSlice";
import { getLocalStorage, setLocalStorage } from "../utils/localStoageHelpers";
import { useNavigate } from "react-router-dom";

function Products() {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategories] = useState([]);
  const { data: products, status } = useSelector((state) => state.product);
  const [search, setSearch] = useState("");
  const fetchNewProducts = async () => {
    dispatch(fetchProducts());
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleAdd = (product) => {
    dispatch(add(product));
    setLocalStorage("cartItems", [...cart, product]);
  };

  useEffect(() => {
    const savedCart = getLocalStorage("cartItems");
    if (savedCart && savedCart.length > 0) {
      savedCart.forEach((item) => {
        dispatch(add(item));
      });
    }
    fetchNewProducts();
  }, [dispatch]);

  const fetchCategories = () => {
    const uniqueCategories = [...new Set(products?.flatMap((product) => product.category))];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchCategories();
    }
  }, [products]);

  const handleCategory = (categoryName) => {
    console.log(categoryName, "categoryName");
    window.open(`/category/${categoryName}`,'_blank');
  };

  const filteredProducts = search
    ? products?.filter((product) => 
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div>
      {status === STATUSES.LOADING && (
        <div style={{ width: "100%" }}>Loading...</div>
      )}

      {status === STATUSES.ERROR && <h2> Something went wrong!</h2>}
      <div className="category__wrapper">
        <div className="category__container">
          {products && (
            <div className="search__Wrapper">
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          )}
          <ul className="category__container_lists">
            {category.map((menuitem) => {
              return (
                <>
                  <li className="category__container_listItem">
                    <button
                      className="btn btn-category"
                      onClick={() => handleCategory(menuitem)}
                    >
                      {menuitem}
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="productsWrapper">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => {
            const isInCart = cart?.some((item) => item.id === product.id);
            return (
              <div className="card" key={product.id}>
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <h5>${product.price}</h5>
                <button
                  className={`btn ${
                    isInCart ? "btn-go-to-cart" : "btn-add-to-cart"
                  }`}
                  onClick={() =>
                    isInCart ? handleGoToCart() : handleAdd(product)
                  }
                >
                  {isInCart ? "Go to Cart" : "Add to Cart"}
                </button>
              </div>
            );
          })
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default Products;
