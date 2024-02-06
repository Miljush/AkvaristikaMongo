import React from "react";

const Card = () => {
  return (
    <div className="kutija">
      <div className="card" style={{ height: "auto" }}>
        <img src="public\img\juwelko.jpg" className="card-img-top" alt="..." />
        <div>
          <div style={{ paddingLeft: "5px" }}>
            <span className="float-start badge  bg-success">35999 din</span>
          </div>
          <h5 style={{ textAlign: "center" }} className="card-title">
            Juwel Rio 125
          </h5>
          <div>
            <button className="karticaDugme">Brzi pregled</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
