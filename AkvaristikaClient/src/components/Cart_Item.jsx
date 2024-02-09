import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const Cart_Item = (objekat) => {
  const [evenString, setEvenString] = useState(0);
  const [stockString, setStockString] = useState(false);
  const [stockStringTekst, setStockStringTekst] = useState("");
  const [numberOfItemsString, setnumberOfItemsString] = useState(0);
  const [priceString, setPriceString] = useState(0);
  const [nameString, setNameString] = useState("");
  const [total, setTotal] = useState(0);
  const [readyPage, setReadyPage] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const { headerData, updateHeaderData } = useAppContext();

  const removeAll = () => {
    axios
      .put("http://localhost:3500/removeItem", {
        cartId: objekat.cartId,
        itemId: objekat.id,
        many: true,
      })
      .then((res) => {
        objekat.hidriraj();
      });
    updateHeaderData(headerData - objekat.numberOfItems);
    setDeleted(true);
  };
  useEffect(() => {
    if (objekat) {
      setEvenString(objekat.even);
      setStockString(objekat.stock);
      setnumberOfItemsString(objekat.numberOfItems);
      if (objekat.even % 2 == 0) {
        setEvenString("even");
      } else {
        setEvenString("odd");
      }
      if (objekat.stock) {
        setStockString("stockStatus");
        setStockStringTekst("Ima na stanju");
      } else {
        setStockString("stockStatus out");
        setStockStringTekst("Nema na stanju");
      }
      axios
        .get("http://localhost:3500/getItem", {
          params: { id: objekat.id },
        })
        .then((response) => {
          setPriceString(response.data.price);
          setNameString(response.data.name);
          setTotal(response.data.price * objekat.numberOfItems);
          setReadyPage(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [objekat, readyPage]);
  if (readyPage) {
    if (deleted) {
      return;
    }
    return (
      <li className={`items ${evenString}`}>
        <div className="infoWrap">
          <div className="cartSection">
            <img src="" alt="" className="itemImg" />
            <p className="itemNumber">{objekat.id}</p>
            <h3>{nameString}</h3>
            <p>
              {" "}
              <input
                type="text"
                className="qty"
                placeholder={numberOfItemsString}
              />{" "}
              x {priceString} din
            </p>
            <p className={`${stockString}`}>{stockStringTekst}</p>
          </div>
          <div className="prodTotal cartSection">
            <p>{total} din</p>
          </div>
          <div className="cartSection removeWrap">
            <a href="#" className="remove" onClick={removeAll}>
              x
            </a>
          </div>
        </div>
      </li>
    );
  }
};

export default Cart_Item;
