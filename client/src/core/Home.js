import React, {useState,useEffect} from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import {getProducts} from "./helper/coreapicalls"

export default function Home() {
  
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  
  const loadAllProduct = () => {
    getProducts().then(data => {
      if(data.error){
        setError(data.error)
        console.log(data.error);
        
      }else{
        setProducts(data);
      }
    })
  }

  useEffect(() => {
    loadAllProduct()
  },[])

  return (
    <Base title="Home Page" description="Welcome to Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of tshirts</h1>
        <div className="row">
          {products.map((product,index) => {
            return(
              <div className="col-4 mb-4" key={index}>
                <Card product= {product} />
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  );
}
