import { useState, useEffect } from "react";
import axios from "axios";
const EquipmentCard = (objekat) => {
  const [izbrisan, setIzbirsan] = useState(false);
  const handleCardClose = () => {
    axios
      .delete(`http://localhost:3500/deleteEquipment`, {
        params: { id: objekat?.equipment?._id },
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
          <svg
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
            }}
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => objekat.handleId(objekat.equipment)}
          >
            <path
              d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {objekat?.brisanje === true && (
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
              onClick={() => handleCardClose()} // Replace handleCardClose with your close function
            >
              X
            </button>
          )}

          {objekat?.equipment?.image && (
            <img
              src={objekat?.equipment?.image}
              className="card-img-top"
              alt="..."
            />
          )}

          <div>
            <div style={{ paddingLeft: "5px" }}>
              {objekat?.equipment?.price && (
                <span className="float-start badge bg-success">
                  {objekat?.equipment?.price} din
                </span>
              )}
            </div>

            {objekat?.equipment?.name && (
              <h5 style={{ textAlign: "center" }} className="card-title">
                {objekat?.equipment?.name}
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

export default EquipmentCard;
