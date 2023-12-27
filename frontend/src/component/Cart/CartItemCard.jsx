import React from "react";
import "./styles/cartItemCard.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const CartItemCard = ({ item, deleteCartItem }) => {
  const dispatch = useDispatch();
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="productImage" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price:₹${item.price}`}</span>
        <p onClick={() => dispatch(deleteCartItem(item.product))}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
