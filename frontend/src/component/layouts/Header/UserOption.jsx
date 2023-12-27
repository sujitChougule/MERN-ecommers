import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import profile from "../../images/profilePng.png";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

import "./userOptions.scss";
const UserOption = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState("");
  const { user } = useSelector((state) => state.user);

  const dashboard = () => {
    navigate("/dashboard");
  };
  const orders = () => {
    navigate("/orders");
  };
  const account = () => {
    navigate("/account");
  };
  const cart = () => {
    navigate("/cart");
  };
  const Logout = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
  };

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCart style={{ color: cartItems.length ? "#3498db" : "" }} />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },

    { icon: <ExitToAppIcon />, name: "Logout", func: Logout },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  return (
    <Fragment className="speedDial">
      <SpeedDial
        ariaLabel="Speeddial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="SpeedDailIcon"
            src={user.avatar.url ? user.avatar.url : profile}
            alt="profileImg"
          />
        }>
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOption;
