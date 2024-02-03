import React, { Fragment, useEffect, Link } from "react";
import "./Home.scss";
import Product from "./ProductCard";
import MetaDate from "../layouts/MetaDate";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
//carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import slider1 from "../images/slider1.jpg";
import slider2 from "../images/slider2.jpg";
import slider3 from "../images/slider3.jpg";
import slider4 from "../images/slider4.jpg";
import slider5 from "../images/slider5.jpg";

import cat1 from "../images/cat1.png";
import cat2 from "../images/cat2.png";
import cat3 from "../images/cat3.png";
import cat4 from "../images/cat4.png";
import cat5 from "../images/cat5.png";
import cat6 from "../images/cat6.png";
import cat7 from "../images/cat7.png";

import sl1 from "../images/sl1.png";
import sl2 from "../images/sl2.png";
import sl3 from "../images/sl3.png";
import sl4 from "../images/sl4.png";
import sl5 from "../images/sl5.png";
import topTrend from "../images/topTrend.png";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  // carosoul

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <MetaDate title="ShopNest" />
          <div className="carosuol">
            <Carousel
              className="topCar"
              interval={2000}
              autoPlay={true}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              infiniteLoop={true}>
              <div>
                <img src={slider2} alt="product" />
                <div class="gradient-overlay"></div>
              </div>
              <div>
                <img src={slider1} alt="product" />
                <div class="gradient-overlay"></div>
              </div>
              <div>
                <img src={slider3} alt="product" />
                <div class="gradient-overlay"></div>
              </div>
              <div>
                <img src={slider4} alt="product" />
                <div class="gradient-overlay"></div>
              </div>
              <div>
                <img src={slider5} alt="product" />
                <div class="gradient-overlay"></div>
              </div>
            </Carousel>
          </div>
          <div className="catagory">
            <div className="topcat">
              <div>
                <a href="/products">
                  <img src={cat1} alt="product" />
                </a>
              </div>
              <div>
                <a href="/products">
                  <img src={cat2} alt="product" />
                </a>
              </div>
              <div>
                <a href="/products">
                  <img src={cat3} alt="product" />
                </a>
              </div>
              <div>
                <a href="/products">
                  <img src={cat4} alt="product" />
                </a>
              </div>
            </div>
            <div className="botcat">
              <div>
                <a href="/products">
                  <img src={cat5} alt="product" />
                </a>
              </div>
              <div>
                <a href="/products">
                  <img src={cat6} alt="product" />
                </a>
              </div>
              <div>
                <a href="/products">
                  <img src={cat7} alt="product" />
                </a>
              </div>
              <div>
                <a href="/products">
                  <img src={cat2} alt="product" />
                </a>
              </div>
            </div>
          </div>
          <div className="subBanner">
            <img src={topTrend} alt="banner" />
            <Carousel
              interval={2000}
              autoPlay={true}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              infiniteLoop={true}>
              <div>
                <a src="/products">
                  <img src={sl1} alt="product" />
                </a>
              </div>
              <div>
                <img src={sl2} alt="product" />
              </div>
              <div>
                <img src={sl3} alt="product" />
              </div>
              <div>
                <img src={sl4} alt="product" />
              </div>
              <div>
                <img src={sl5} alt="product" />
              </div>
            </Carousel>
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
