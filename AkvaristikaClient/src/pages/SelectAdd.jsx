const SelectAdd = () => {
  return (
    <div className="glavni">
      <section className="hero-sectionn">
        <div className="card-gridd">
          <a className="cardd" href="/AddAquarium">
            <div className="card__backgroundd pozadina" />
            <div className="card__contentt">
              <h3 className="card__headingg">Akvarijumi</h3>
            </div>
          </a>
          <a className="cardd" href="/AddFish">
            <div className="card__backgroundd pozadina2" />
            <div className="card__contentt">
              <h3 className="card__headingg">Ribice</h3>
            </div>
          </a>
          <a className="cardd" href="/AddPlant">
            <div className="card__backgroundd pozadina3" />
            <div className="card__contentt">
              <h3 className="card__headingg">Biljke</h3>
            </div>
          </a>
          <a className="cardd" href="/AddEquipment">
            <div className="card__backgroundd pozadina4" />
            <div className="card__contentt">
              <h3 className="card__headingg">Oprema</h3>
            </div>
          </a>
          <a className="cardd" href="/Orders">
            <div className="card__backgroundd pozadina5" />
            <div className="card__contentt">
              <h3 className="card__headingg">Narudzbine</h3>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};
export default SelectAdd;
