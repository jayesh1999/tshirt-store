import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getOrderStatus,
  getOrder,
  updateOrderStatus,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateOrder = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    error: "",
    status: "",
    success: false
  });

  const { status, error, success } = values;

  const handleChange =  (event) => {
    setValues({  error: false, status: event.target.value }); //here ...values means load all existing values which is null or undefined in above
    console.log("in handle:",status);
  };

  const preload = (orderId) => {
    getOrder(orderId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        preloadStatus();
      }
    });
  };

  const preloadStatus = () => {
    getOrderStatus(user._id, match.params.orderId, token).then((data) => {
      if (data.error) {
        console.log(error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          status: data.status,
        });
      }
    });
  };


  //useEffect method pre-loads all the data in database for showing to user in frontend.
  //for simplicity we create separate method for loading data and then we call it in react defaults useEffect() method.
  useEffect(() => {
    preload(match.params.orderId);
  }, []);

  console.log(status);
 
  const onSubmit = (event) => {
   event.preventDefault();
    handleChange(event)
    console.log(status);
    
    //setValues({ status, error: false, loading: true });
    console.log(status);
    updateOrderStatus(match.params.orderId, user._id, token, status).then(
      (data) => {
        console.log(data);
        
        if (data.error) {
          setValues({  error: data.error, success: false });
        } else {
          setValues({  status: data.status, success: true });
          console.log("STATUS:",status);
          
        }
      }
    );
  };

  const createOrderForm = () => {
    return (
      <div className="row text-center mb-5 mt-5 ">
        <div className="text-left mr-3">
          <h6 className="text-white">{match.params.orderId}</h6>
        </div>
        <div>
          <button
            type="submit"
            // onClick={onSubmit}
            // onChange={handleChange}
            value="Pending"
            className={
              status === "Pending"
                ? "btn btn-primary mr-3"
                : "btn btn-outline-success mr-3"
            }
          >
            Pending
          </button>
          <button
            type="submit"
            //onClick={onSubmit}
            onClick={onSubmit}
              
         
            //onClick={onSubmit}
            //onClick={handleChange}
            value="Cancelled"
            className={
              status === "Cancelled"
                ? "btn btn-primary mr-3"
                : "btn btn-outline-success mr-3"
            }
          >
            Cancelled
          </button>
          <button
            type="submit"
            // onClick={onSubmit}
            // onChange={handleChange}
            value="Shipped"
            className={
              status === "Shipped"
                ? "btn btn-primary mr-3"
                : "btn btn-outline-success mr-3"
            }
          >
            Shipped
          </button>
          <button
            type="submit"
            // onClick={onSubmit}
            // onChange={handleChange}
            value="Processing"
            className={
              status === "Processing"
                ? "btn btn-primary mr-3"
                : "btn btn-outline-success mr-3"
            }
          >
            Processing
          </button>
          <button
            type="submit"
            // onClick={onSubmit}
            // onChange={handleChange}
            value="Processing"
            className={
              status === "Deliveried"
                ? "btn btn-primary mr-3"
                : "btn btn-outline-success mr-3"
            }
          >
            Deliveried
          </button>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Manage a order here!"
      description="Welcome to order status section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-2 mr-3">
        Admin Home
      </Link>
      <Link to="/admin/orders" className="btn btn-md btn-dark mb-2 ">
        Back
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">{createOrderForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateOrder;
