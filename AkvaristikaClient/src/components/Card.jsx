import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = (objekat) => {
  const [izbrisan, setIzbirsan] = useState(false);
  const handleCardClose = () => {
    axios
      .delete(`http://localhost:3500/deleteAquarium`, {
        params: { id: objekat?.akvarijum?._id },
      })
      .then((response) => {
        console.log(`Izbrisano`);
        setIzbirsan(!izbrisan);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {}, [izbrisan]);
  if (!izbrisan)
    return (
      <div className="kutija">
        <div className="card" style={{ height: "auto", position: "relative" }}>
          {objekat?.brisanje == true && (
            <button
              className="close-btn"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "red",
              }}
              onClick={() => handleCardClose()}
            >
              X
            </button>
          )}

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
              <button className="karticaDugme">Brzi pregled</button>
            </div>
          </div>
        </div>
      </div>
    );
  else {
    return;
  }
};

export default Card;
