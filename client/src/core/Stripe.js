import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { API } from "../backend";
import { makeOrder } from "./helper/OrderHelper";
import { makeCartEmpty } from "./helper/CartHelper";

const Stripe = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        setData({ ...data, success: response.success, loading: true });
        console.log("PAYMENT SUCCESS");
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
        const orderData = {
          products: products
        };
        console.log(orderData);
        makeOrder(userId, token, orderData);
        makeCartEmpty(() => {
          console.log("Cart is empty now!");
        });
        setReload(!reload);
      })
      .catch((err) => {
        setData({ loading: false, success: false });
        console.log("PAYMENT FAILED");
        console.log(err);
      });
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default Stripe;
