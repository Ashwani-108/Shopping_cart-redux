import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/cartSlice";
import { STATUSES, fetchProducts } from "../redux/productSlice";
import { getLocalStorage, setLocalStorage } from "../utils/localStoageHelpers";
import { useNavigate } from "react-router-dom";
import ProductComponent from "../components/ProductComponent";

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
    const uniqueCategories = [
      ...new Set(products?.flatMap((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchCategories();
    }
  }, [products]);

  const handleCategory = (categoryName) => {
    console.log(categoryName, "categoryName");
    window.open(`/category/${categoryName}`, "_blank");
  };

  const filteredProducts = search ? products?.filter(
    (product) =>product.title.toLowerCase().includes(search.toLowerCase()))
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
            <div className="search__Wrapper text-center">
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
                      className="btn btn-category btn-secondary mt-3 btn-sm" 
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
              <ProductComponent
                key={product}
                product={product}
                handleGoToCart={handleGoToCart}
                handleAdd={handleAdd}
                isInCart={isInCart}
              />
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
