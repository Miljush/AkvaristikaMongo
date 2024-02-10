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
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "50px",
              paddingTop: "50px",
            }}
          >
            <div
              className="bord"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "500px" }}>
                  <img src={item.image} />
                </div>
                <div style={{ paddingLeft: "30px", maxWidth: "500px" }}>
                  <div style={{ paddingTop: "30px", fontSize: "40px" }}>
                    {item.name}
                  </div>
                  <div style={{ paddingTop: "20px", fontSize: "30px" }}>
                    {item.price} din
                  </div>
                  <div className="linija"></div>
                  <div
                    className="fonnnt"
                    style={{
                      paddingTop: "20px",
                      fontSize: "15px",
                      font: "Po",
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "full",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <div style={{ width: "50%" }}>
                  <p
                    style={{
                      fontSize: "25px",
                      color: "#0c1e35",
                      paddingLeft: "25px",
                      fontWeight: "600",
                    }}
                  >
                    {quantity * item.price}
                  </p>
                </div>
                <div style={{ width: "50%" }}>
                  {!!username && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <button
                          className="dugmelevo"
                          onClick={decreaseQuantity}
                        >
                          -
                        </button>
                        <input
                          className="cartinput"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={handleInputChange}
                        />
                        <button
                          className="dugmedesno"
                          onClick={increaseQuantity}
                        >
                          +
                        </button>
                      </div>

                      <div>
                        <button className="dodajucart" onClick={addToCart}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
};

export default ItemPage;
