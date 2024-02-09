import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useAppContext } from "../context/AppContext";
import { UserContext } from "../context/UserContext";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [readyy, setReady] = useState(null);
  const { username, ready } = useContext(UserContext);
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
    for (let i = 0; i < quantity; i++) {
      axios.put("http://localhost:3500/addToUserCart", {
        userId: username._id,
        itemId: id,
      });
    }
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
  }, [readyy, ready]);
  if (!readyy) {
    return <LoadingPage />;
  } else {
    if (ready) {
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
              {!!username && (
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
              )}
            </div>
          </div>
          <div class="footer">
            <div class="left">
              <p id="price">{quantity * item.price}</p>
            </div>
            {!!username && (
              <div class="right">
                <p onClick={addToCart}>Add to Cart</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
};

export default ItemPage;
