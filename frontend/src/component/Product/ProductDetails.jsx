import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.scss";

const ProductDetails = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      return console.log("erroe", error);
    }
    dispatch(getProductDetails(id));
  }, [error, dispatch, id]);

  // options for react stars
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 20,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <div className="ProductDetailsPage">
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlocks-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlocks-2">
            <ReactStars classNames="stars" {...options} />{" "}
            <span>({product.numOfReview} reviews)</span>
          </div>
          <div className="detailsBlocks-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlocks-3-1">
              <div className="detailsBlocks-3-1-1">
                <button>-</button>
                <input value="1" type="number" />
                <button>+</button>
                <button>Add to Cart</button>
              </div>
              <p>
                Status:
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
          </div>
          <div className="detailsBlocks-4">
            Description:<p>{product.description}</p>
          </div>
          <button className="submitReview"> Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;