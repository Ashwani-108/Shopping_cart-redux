import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { singleProduct } from "../redux/productSlice";
import { useParams } from "react-router-dom";

export const ProductPage = () => {

    const dispatch = useDispatch();
    const params = useParams()
    const status = useSelector((state) => state.product.status);  
    const singleProductData = useSelector((state) =>state.product.singleProduct);  
    const [productsData,setProductsData] = useState({})

    useEffect(() => {
        dispatch(singleProduct(params.id));
    
        if(singleProductData && singleProductData.length > 0){
          setProductsData(singleProductData)
        }

    }, [dispatch,params?.id]);

  return (
    <div className="products-info_Wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-5 pt-5 product-img">
            <img src={singleProductData?.image} className="img-fluid"/>
          </div>
          <div className="col-sm-7 text-start py-5 ps-5">
            <h5>{singleProductData?.title}</h5>
            <p>{singleProductData?.description}</p>
            <div className="product_rating">
            Rating:<strong>{singleProductData?.rating?.rate}</strong>
            </div>
            <div className="products_button pt-3 ">
              <button className="btn btn-primary btn-add-to-cart px-5">Add to Cart</button><br/>
              <button className="btn btn-warning btn-wishlist mt-3 px-5">Add to wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
