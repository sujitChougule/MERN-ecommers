import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.scss";
import ReviewCard from "./ReviewCard";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
import MetaDate from "../layouts/MetaDate";
import { addToCartItems } from "../../actions/cartAction";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const [quantity, setQuantity] = useState(1);
  const incrementOuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decrementOuantity = () => {
    if (quantity === 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);

  const addToCart = () => {
    dispatch(addToCartItems(id, quantity));
    alert.success("Successfully item added to cart");
  };

  // options for react stars
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 25 : 30,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="ProductDetailsPage">
          <MetaDate title={`${product.name} --ShopNest`} />
          <div className="ProductDetails">
            <div className="carouselBox">
              <Carousel className="CarouselImage">
                {product.images &&
                  product.images.map((item, i) => (
                    <img key={i} src={item.url} alt={`${i} Slide`} />
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
                <p>Inclusive of all taxes</p>
                <div className="detailsBlocks-3-1">
                  <div className="detailsBlocks-3-1-1">
                    <button onClick={decrementOuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={incrementOuantity}>+</button>
                    <button
                      disabled={product.stock < 1 ? true : false}
                      onClick={addToCart}>
                      Add to Cart
                    </button>
                  </div>
                  <p>
                    Status:
                    <b
                      className={product.stock < 1 ? "redColor" : "greenColor"}>
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>
              </div>
              <div className="detailsBlocks-4">
                Description <p>{product.description}</p>
              </div>
              <button className="submitReview"> Submit Review</button>
            </div>
          </div>
          <h3 className="reviewHeading"> REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
