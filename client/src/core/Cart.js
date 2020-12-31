import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import Stripe from "../core/Stripe";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadAllCartProducts = (products) => {
    return (
      <div>
        <h3>Total {products.length} products</h3>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadCheckout = () => {
    return (
      <div>
      <Stripe products={products} setReload={setReload} />
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{products.length>0 ? ( loadAllCartProducts(products)):(
          <h4>No Products</h4>
        )}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
