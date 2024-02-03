import React from "react";
import "./styles/cartItemCard.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LinesEllipsis from "react-lines-ellipsis";
const CartItemCard = ({ item, deleteCartItem }) => {
  const dispatch = useDispatch();
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="productImage" />
      <div>
        <Link to={`/product/${item.product}`}>
          <LinesEllipsis
            text={item.name}
            maxLine={1}
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </Link>
        <span>{`Price:₹${item.price}`}</span>
        <p onClick={() => dispatch(deleteCartItem(item.product))}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
