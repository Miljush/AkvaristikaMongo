import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useAppContext } from "../context/AppContext";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [ready, setReady] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const { headerData, updateHeaderData } = useAppContext();
  const handleInputChange = (e) => {
    const inputQuantity = parseInt(e.target.value, 10);
    if (!isNaN(inputQuantity) && inputQuantity > 0) {
      setQuantity(inputQuantity);
    }
  };
  const addToCart = () => {
    updateHeaderData(headerData + quantity);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3500/getItem", {
        params: { id: id },
      })
      .then((response) => {
        setItem(response.data);
        setReady(true);
      });
  }, [ready]);
  if (!ready) {
    return <LoadingPage />;
  } else {
    return (
      <div className="product">
        <div className="header"></div>
        <div className="main" style={{ marginBottom: "20px" }}>
          <div className="left">
            <h1>{item.name}</h1>
            {item?.type && <h2>{item.type}</h2>}
            {item?.brand && <h2>{item.brand}</h2>}

            <h3>{item.price} din</h3>
            <img src={item.image} alt="" />
          </div>
          <div className="right">
            <p>{item.description}</p>
            <div className="quantity-adjuster-container">
              <a className="adjuster-button" onClick={decreaseQuantity}>
                -
              </a>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleInputChange}
                className="quantity-input"
              />
              <a className="adjuster-button" onClick={increaseQuantity}>
                +
              </a>
              <div className="quantity-label">Quantity</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="left">
            <p id="price">{quantity * item.price}</p>
          </div>
          <div class="right">
            <p onClick={addToCart}>Add to Cart</p>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemPage;
