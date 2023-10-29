import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.scss";
import Product from "./Product";
import MetaDate from "../layouts/MetaDate";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="home">
      <MetaDate title="ShopNest" />
      <div className="banner">
        <p>Welcome to ShopNest</p>
        <h1>Your One-Stop Shop</h1>
        <a href="#homeHeading" className="">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading" id="homeHeading">
        Featured Products
      </h2>
      <div className="container" id="container">
        {products && products.map((product) => <Product product={product} />)}
      </div>
    </div>
  );
};

export default Home;
