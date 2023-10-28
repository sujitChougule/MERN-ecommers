import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.scss";
import Product from "./Product";
import MetaDate from "../layouts/MetaDate";
const product = {
  name: "Blue Tshirt",
  images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
  price: 3000,
  _id: "sujit",
};
const Home = () => {
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </div>
  );
};

export default Home;
