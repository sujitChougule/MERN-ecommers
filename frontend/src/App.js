import { useEffect } from "react";
import "./App.css";
import webloader from "webfontloader";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./component/layouts/Header/Header";
import Footer from "./component/layouts/Footer/Footer";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search";

function App() {
  useEffect(() => {
    webloader.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/Search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
