import React, { useEffect, useState } from "react";

const Cart_Item = (objekat) => {
  const [evenString, setEvenString] = useState(0);
  const [stockString, setStockString] = useState(false);
  const [stockStringTekst, setStockStringTekst] = useState("");
  const [numberOfItemsString, setnumberOfItemsString] = useState(0);
  const [priceString, setPriceString] = useState(0);
  const [nameString, setNameString] = useState("");
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (objekat) {
      console.log(objekat);
      setEvenString(objekat.even);
      setStockString(objekat.stock);
      setnumberOfItemsString(objekat.numberOfItems);
      setPriceString(objekat.price);
      setNameString(objekat.name);
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
      setTotal(objekat.price * objekat.numberOfItems);
    }
  }, [objekat]);
  return (
    <li className={`items ${evenString}`}>
      {console.log(evenString)}
      <div className="infoWrap">
        <div className="cartSection">
          <img src="" alt="" className="itemImg" />
          <p className="itemNumber">#QUE-007544-002</p>
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
          <a href="#" className="remove">
            x
          </a>
        </div>
      </div>
    </li>
  );
};

export default Cart_Item;
