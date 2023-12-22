import { useEffect } from "react";
import "./App.css";
import webloader from "webfontloader";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./component/layouts/Header/Header";
import Footer from "./component/layouts/Footer/Footer";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import Profile from "./component/User/Profile.jsx";
import { useSelector } from "react-redux";
function App() {
  useEffect(() => {
    webloader.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/Search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        {isAuthenticated && (
          <Route exact path="/account" element={<Profile />} />
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
