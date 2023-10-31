import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.scss";
import Product from "./Product";
import MetaDate from "../layouts/MetaDate";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
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
          <div className="containers" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
