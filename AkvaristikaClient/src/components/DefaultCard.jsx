import React from "react";
import { useNavigate } from "react-router-dom";

const DefaultCard = (objekat) => {
  const navigate = useNavigate();
  const navigiraj = () => {
    navigate("/item/" + objekat.akvarijum._id);
  };
  return (
    <div className="kutija">
      <div className="card" style={{ height: "auto", position: "relative" }}>
        {objekat?.akvarijum?.image && (
          <img
            src={objekat?.akvarijum?.image}
            className="card-img-top"
            alt="..."
          />
        )}

        <div>
          <div style={{ paddingLeft: "5px" }}>
            {objekat?.akvarijum?.price && (
              <span className="float-start badge bg-success">
                {objekat?.akvarijum?.price} din
              </span>
            )}
          </div>

          {objekat?.akvarijum?.name && (
            <h5 style={{ textAlign: "center" }} className="card-title">
              {objekat?.akvarijum?.name}
            </h5>
          )}

          <div>
            <button onClick={navigiraj} className="buttonarijus karticaDugme ">
              Brzi pregled
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultCard;
