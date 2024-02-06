import Cart_Item from "../components/Cart_Item";

const Cart = () => {
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
          {[...Array(3)].map((_, index) => (
            <Cart_Item
              even={index}
              stock={true}
              numberOfItems={3}
              price={3500}
              name={"Mangroo root 3kg"}
              key={index}
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
        <input type="text" name="promo" placholder="Enter Code" />
        <a href="#" className="btn" />
      </div>
      <div className="subtotal cf">
        <ul>
          <li className="totalRow">
            <span className="label">Cena bez dostave</span>
            <span className="value">31500 din</span>
          </li>
          <li className="totalRow">
            <span className="label">Dostava</span>
            <span className="value">0 din</span>
          </li>
          <li className="totalRow final">
            <span className="label">Ukupno</span>
            <span className="value">31500 din</span>
          </li>
          <li className="totalRow">
            <a href="#" className="btn continue">
              Nastavi dalje
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Cart;
