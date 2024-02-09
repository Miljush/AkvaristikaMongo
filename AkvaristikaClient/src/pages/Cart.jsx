import { useContext, useEffect, useState } from "react";
import Cart_Item from "../components/Cart_Item";
import { UserContext } from "../context/UserContext";
import LoadingPage from "./LoadingPage";
import axios from "axios";

const Cart = () => {
  const { username, ready } = useContext(UserContext);
  const [items, setItems] = useState(null);
  const [readyStrana, setReadyStrana] = useState(false);
  const [readyStrana2, setReadyStrana2] = useState(false);
  const [total, setTotal] = useState(0);
  const [dostava, setDostava] = useState(0);
  const [bezDostave, setBezDostave] = useState(0);
  const [rehydrate, setRehydrate] = useState(true);
  const [iskoriscen, setIskoriscen] = useState(false);
  const [kupon, setKupon] = useState("");
  const [items2, setItems2] = useState(null);
  const iskoristiKupon = () => {
    if (iskoriscen == false && kupon == "Diskus20") {
      setTotal(total - 0.2 * total);
      setIskoriscen(true);
    }
  };
  const hidriraj = () => {
    setRehydrate(!rehydrate);
    console.log("hidriran sam");
  };

  const checkout = () => {
    if (items2.length != 0) {
      axios
        .post("http://localhost:3500/createOrder", {
          userId: username._id,
          price: total,
        })
        .then((res) => {
          if (username) alert("Uspesno poslata narudzbina!");
          setRehydrate(!rehydrate);
        });
    } else {
      alert("Punjeno s prazno");
    }
  };
  useEffect(() => {
    if (ready) {
      axios
        .get("http://localhost:3500/getItemCount", {
          params: { cartId: username.cart },
        })
        .then((response) => {
          setItems(response.data);
          setReadyStrana(true);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get("http://localhost:3500/getAllItemsCart", {
          params: { cartId: username.cart },
        })
        .then((response) => {
          setItems2(response.data);
          var total = 0;
          response.data.forEach((item) => {
            total += item.price;
          });
          if (total < 6000) {
            setBezDostave(total);
            setDostava(1500);
            setTotal(total + 1500);
          } else {
            setBezDostave(total);
            setTotal(total);
          }

          setReadyStrana2(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [username, ready, rehydrate]);
  if (!ready) {
    return <LoadingPage />;
  } else {
    if (readyStrana && readyStrana2) {
      return (
        <div className="wrap cf">
          <div className="heading cf">
            <h1>Moja korpa</h1>
            <a href="#" className="continue">
              Nastavi kupovinu
            </a>
          </div>
          <div className="cart">
            <ul className="cartWrap">
              {Object.entries(items).map(([key, value], index) => (
                <Cart_Item
                  even={index}
                  stock={true}
                  numberOfItems={value}
                  cartId={username.cart}
                  id={key}
                  key={key}
                  hidriraj={hidriraj}
                />
              ))}
              <div className="special">
                <div className="specialContent">
                  Poklon uz prvu kupovinu Tetra grebalica
                </div>
              </div>
            </ul>
          </div>
          <div className="promoCode">
            <label htmlFor="promo">Imaš promo kod?</label>
            <input
              value={kupon}
              onChange={(ev) => setKupon(ev.target.value)}
              type="text"
              name="promo"
              placholder="Unesi kupon"
            />
            <a onClick={iskoristiKupon} href="#" className="btn" />
          </div>
          <div className="subtotal cf">
            <ul>
              <li className="totalRow">
                <span className="label">Cena bez dostave</span>
                <span className="value">{bezDostave} din</span>
              </li>
              <li className="totalRow">
                <span className="label">Dostava</span>
                <span className="value">{dostava} din</span>
              </li>
              <li className="totalRow final">
                <span className="label">Ukupno</span>
                <span className="value">{total} din</span>
              </li>
              <li className="totalRow">
                <a href="#" onClick={checkout} className="btn continue">
                  Nastavi dalje
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
};

export default Cart;
