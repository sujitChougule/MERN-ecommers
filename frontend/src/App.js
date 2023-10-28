import { useEffect } from "react";
import "./App.css";
import webloader from "webfontloader";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./component/layouts/Header/Header";
import Footer from "./component/layouts/Footer/Footer";
import Home from "./component/Home/Home.jsx";

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
