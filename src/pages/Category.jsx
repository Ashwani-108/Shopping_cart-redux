import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORY_STATUSES, fetchCategoryProducts,setPricing,setRatings,sortProducts,selectFilteredProductList } from "../redux/categorySlice";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Category = () => {
  
  const [rating] = useState([1, 2, 3, 4, 5]);
  const [productPrice] = useState(['50','100','200','300','500'])
  const dispatch = useDispatch();
  const params = useParams();
  const categoryProducts = useSelector(selectFilteredProductList);
  const status = useSelector((state) => state.category.status);  
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleRating = (e) => {
    const filterValue = e.target.value;    
    dispatch(setRatings(filterValue))
  }

  const handlePriceChange = (e) =>{
    const filterpricing = e.target.value; 
    dispatch(setPricing(filterpricing))
  }
    

  useEffect(() => {
    dispatch(fetchCategoryProducts(params.id));
  }, [dispatch,params.id]);


  useEffect(()=>{
    const deepCopy = JSON.parse(JSON.stringify(categoryProducts));
    setFilteredProducts(deepCopy);
  },[categoryProducts])
    

  const handleSort = (filter) => {
    dispatch(sortProducts(filter)); 
  };

  return (
    <>
      <h4>Category Items</h4>
      {status === CATEGORY_STATUSES.LOADING && (
        <div style={{ width: "100%" }}>Loading...</div>
      )}

      {status === CATEGORY_STATUSES.ERROR && <h2> Something went wrong!</h2>}
      <div className="products_filter_wrapper">
        <div className="container">
          <div className="products_sorting">
            <select onChange={(e) => handleSort(e.target.value)}>
              <option value="">Sort By</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div className="products_filter_block py-2">
            <div className="product_filters pt-3 ">
              <div className="price-filters">
              <h6 className="mt-3">Select Price Range</h6>
                {productPrice.map((price,index)=>(
                  <div key={index}>
                    <input
                      type="checkbox"
                      value={price}
                      id={price}
                      onChange={(e) => handlePriceChange(e)}
                    />
                    <label htmlFor={price}>{price} & above</label>
                  </div>
                ))}
              </div>
              <div className="rating-change">
                <h6 className="mt-3">Select Rating Range</h6>
                {rating?.map((rate) => {
                  return (
                    <div key={rate}>
                      <input
                        type="checkbox"
                        value={rate}
                        id={rate}
                        onChange={(e) => handleRating(e)}
                      />
                      <label htmlFor={rate}>{rate} star & above</label>
                    </div>
                  );
                })}
              </div>
              <div className="clearing-filter mt-3 text-left justify-content-left">
                <Button variant="secondary" className="btn-sm btn" >
                  Clear Filter
                </Button>
              </div>
            </div>
            <div className="products_right">
              <div className="productsWrapper">
                {filteredProducts?.length > 0 ? (
                  filteredProducts?.map((item) => {
                    return (
                      <div className="category__product" key={item.id}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: "100px" }}
                        />
                        <h6 className="mt-3">{item.title}</h6>
                        <p>Price: ${item.price}</p>
                        <p>{item.rating.rate}star</p>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <h5>No Products found</h5>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
