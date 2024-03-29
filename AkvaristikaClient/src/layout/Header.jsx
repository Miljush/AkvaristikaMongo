import React, { useContext, useEffect, useState } from "react";
import "../styles/Header.css";
import "../styles/Sidebar.scss";
import "../styles/Kartice.css";
import "../styles/Cart.scss";
import "../styles/AboutUs.scss";
import "../styles/SelectCard.css";
import "../styles/AddAquarium.css";
import "../styles/LoginRegister.css";
import "../styles/ItemPage.scss";
import "../styles/Orders.scss";
import { useAppContext } from "../context/AppContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { headerData } = useAppContext();
  const { username, ready, setUsername } = useContext(UserContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [rehydrate, setRehydrate] = useState(false);
  const handleUsernameClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3500/logout", {
        withCredentials: true,
      })
      .then(({ data }) => {
        setMenuOpen(false);
        setUsername(null);
        navigate("/");
      });
  };
  useEffect(() => {}, [username, ready, rehydrate]);
  if (ready) {
    return (
      <header>
        <div className="banner">
          Besplatna Dostava za narudžbine preko 6000 din
        </div>
        <nav className="custom-nav">
          <div id="logo">
            <a href="/">
              <svg
                width="42px"
                height="42px"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                href="/"
              >
                <path
                  fill="#000000"
                  d="M96 39c-4.75 0-8.688.388-12.613 2.385-3.926 1.997-7.284 6.946-7.61 11.176-.65 8.46 3.415 12.92 6.506 18.07 3.09 5.152 6.22 10.342 7.428 13.966 1.21 3.623 1.275 3.692-.073 5.04l-.035.034-.034.035C48.298 131.88 23 192.615 23 256c0 84.586 49.342 158.86 116.316 199.686C176.136 478.13 214.018 473 256 473c41.406 0 80.11 4.575 116.62-17.277C440.496 415.1 489 341.143 489 256c0-63.218-25.516-124.14-66.553-166.28l-.04-.042-.044-.04c-1.348-1.35-1.282-1.42-.074-5.042 1.207-3.624 4.336-8.814 7.427-13.965 3.09-5.15 7.156-9.61 6.506-18.07-.326-4.23-3.684-9.178-7.61-11.175C424.688 39.388 420.75 39 416 39H96zm0 18h320c.277 0 .127.03.38.037-.584 1.346-1.09 2.656-2.097 4.332-2.91 4.848-6.78 10.658-9.072 17.534-2.29 6.877-2.225 16.808 4.427 23.46l-.084-.085C447.116 140.852 471 197.657 471 256c0 78.296-44.763 146.655-107.62 184.277C332.713 458.63 298.577 455 256 455c-43.3 0-76.282 4.233-107.316-14.686C86.65 402.5 41 333.556 41 256c0-58.569 23.653-115.098 61.432-153.705l-.07.068c6.653-6.65 6.72-16.582 4.427-23.46-2.293-6.875-6.164-12.685-9.073-17.534-1.006-1.677-1.513-2.987-2.096-4.333.253-.008.103-.037.38-.037zm87.484 61.742c-3.14-.01-6.395.055-9.734.186-20.032.785-43.117 3.942-63.287 7.217-2.172.352-4.24.706-6.332 1.06-5.374 5.666-10.308 12.474-14.8 20.115-.174.296-.34.6-.514.9 7.16-1.346 15.486-2.84 24.532-4.308 26.376-4.282 58.298-8.124 78.11-6.928 40.6 2.452 80.8 29.15 128 32 23.11 1.396 55.185-2.763 82.08-7.13 9.824-1.594 18.89-3.226 26.49-4.665-2.093-4.34-4.305-8.55-6.655-12.547-.815-1.386-1.65-2.734-2.494-4.063-6.142 1.128-12.943 2.325-20.228 3.508-26.376 4.282-58.298 8.124-78.11 6.928-40.6-2.452-80.8-29.15-128-32-2.888-.175-5.916-.263-9.058-.274zm-66.115 42.77l-30.026 2.88A192 192 0 0 0 64 256a192 192 0 0 0 62.63 141.56A224 224 0 0 1 87.88 272a224 224 0 0 1 29.49-110.488zm250.806 13.435a24 24 0 0 0-24 24 24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0-24-24zm30.83 78.46a16 16 0 0 0-16 16 16 16 0 0 0 16 16 16 16 0 0 0 16-16 16 16 0 0 0-16-16zm-94.026 18.546c-29.042.46-80.674 29.662-102.882 42.205C187.845 300.326 172.085 288 144 288c16 16 16 48 0 64 28.08 0 37.343-22.155 56.672-22.168C220 329.82 289.394 372.967 320 368c38.434-6.237 64-32 64-48-1.427-24.583-47.862-46.512-76.28-48-.89-.046-1.803-.062-2.74-.047zM336 293.385a10.81 10.81 0 0 1 10.81 10.808 10.81 10.81 0 0 1-10.81 10.81 10.81 10.81 0 0 1-10.81-10.81A10.81 10.81 0 0 1 336 293.385z"
                />
              </svg>
            </a>
            <a href="/" className="nonko">
              Akvaristika <br /> Diskus
            </a>
          </div>
          <ul className="navigation-menu">
            <li>
              <a href="/allProducts">Proizvodi</a>
            </li>
            <li>
              <a href="#">Servisi</a>
              <ul className="subnav">
                <li className="card-med" id="serv-groom">
                  <div className="card-image">
                    <img src="../../public/img/Izrada.jpg" />
                  </div>
                  <a href="#">
                    <span>Izrada Akvarijuma</span>
                    <span>
                      Više informacija{" "}
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12H20M20 12L16 8M20 12L16 16"
                          stroke="#45413e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
                <li className="card-med" id="serv-board">
                  <div className="card-image">
                    <img src="../../public/img/odrzavanje.jpg" />
                  </div>
                  <a href="#">
                    <span>Održavanje akvarijuma</span>
                    <span>
                      Više informacija
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12H20M20 12L16 8M20 12L16 16"
                          stroke="#45413e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="AboutUs">O nama</a>
            </li>
            {username?.role == "Admin" && (
              <li>
                <a href="/SelectAdd">Admin panel</a>
              </li>
            )}
          </ul>
          <div id="utility">
            {!!username && (
              <a href="/cart">
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 -4 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="24" cy="4" r="6" fill="#49a822" />
                  <text
                    x="24"
                    y="4"
                    fontSize="10"
                    fill="white"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {headerData}
                  </text>
                </svg>
              </a>
            )}
            {!username && (
              <a
                href="/LoginRegister"
                className="linkiiccc"
                style={{ fontSize: "16px", color: "black" }}
              >
                Login/Register
              </a>
            )}

            {!!username && (
              <>
                <div
                  className={`color-b font-bold`}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={handleUsernameClick}
                >
                  {username.username}
                </div>
                {isMenuOpen && (
                  <div className="menu">
                    <ul>
                      <li style={{ cursor: "pointer" }} onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </nav>
      </header>
    );
  }
};

export default Header;
