import React, { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";
import DefaultCard from "../components/DefaultCard";
import LoadingPage from "./LoadingPage";
import axios from "axios";

const AllProductsPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveFish, setIsActiveFish] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActiveBrand, setActiveBrand] = useState(false);
  const [isActiveType, setActiveType] = useState(false);
  const [isAquariums, setIsAquariums] = useState(false);
  const [items, setItems] = useState(null);
  const [aquariums, setAquariums] = useState([]);
  const [readyStrana, setReadyStrana] = useState(false);
  const [plants, setPlants] = useState([]);
  const [isPlants, setIsPlants] = useState(false);
  const [fish, setFish] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [isEquipment, setIsEquipment] = useState(false);
  const [brand, setBrand] = useState("");

  const toggleClass = () => {
    setIsActive(!isActive);
    setIsAquariums(true);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(false);
    setAquariums([]);
    items.forEach((item) => {
      if (item.__t == "Aquarium") {
        setAquariums((prevAquariums) => [...prevAquariums, item]);
      }
    });
  };

  const toggleBiOrbBrand = () => {
    setIsAquariums(true);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(false);
    setAquariums([]);
    items.forEach((item) => {
      if (item.__t == "Aquarium" && item.brand == "biOrb") {
        setAquariums((prevAquariums) => [...prevAquariums, item]);
      }
    });
  };
  const toggleFluvalBrand = () => {
    setIsAquariums(true);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(false);
    setAquariums([]);
    items.forEach((item) => {
      if (item.__t == "Aquarium" && item.brand == "Fluval") {
        setAquariums((prevAquariums) => [...prevAquariums, item]);
      }
    });
  };
  const toggleJuwelBrand = () => {
    setIsAquariums(true);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(false);
    setAquariums([]);
    items.forEach((item) => {
      if (item.__t == "Aquarium" && item.brand == "Juwel") {
        setAquariums((prevAquariums) => [...prevAquariums, item]);
      }
    });
  };
  const toggleMarineBrand = () => {
    setIsAquariums(true);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(false);
    setAquariums([]);
    items.forEach((item) => {
      if (item.__t == "Aquarium" && item.brand == "Innovative Marine") {
        setAquariums((prevAquariums) => [...prevAquariums, item]);
      }
    });
  };
  const toggleOaseBrand = () => {
    setIsAquariums(true);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(false);
    setAquariums([]);
    items.forEach((item) => {
      if (item.__t == "Aquarium" && item.brand == "Oase") {
        setAquariums((prevAquariums) => [...prevAquariums, item]);
      }
    });
  };
  const toggleRedSeaBrand = () => {
    setIsAquariums(true);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(false);
    setAquariums([]);
    items.forEach((item) => {
      if (item.__t == "Aquarium" && item.brand == "Red Sea") {
        setAquariums((prevAquariums) => [...prevAquariums, item]);
      }
    });
  };
  const togglePlant = () => {
    setIsPlants(true);
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsEquipment(false);
    setPlants([]);
    items.forEach((item) => {
      if (item.__t == "Plant") {
        setPlants((prevPlants) => [...prevPlants, item]);
      }
    });
  };
  const toggleFish = () => {
    setIsPlants(false);
    setIsAquariums(false);
    setIsActiveFish(true);
    setIsEquipment(false);
    setFish([]);
    items.forEach((item) => {
      if (item.__t == "Fish") {
        setFish((prevFish) => [...prevFish, item]);
      }
    });
  };
  const toggleEquipment = () => {
    setActiveBrand(false);
    setIsPlants(false);
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };
  const toggleBrand = () => {
    setActiveBrand(!isActiveBrand);
  };
  const toggleType = () => {
    setActiveType(!isActiveType);
  };
  const toggleBiOrbBrandEquipment = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.brand == "biOrb") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  const toggleFluvalBrandEquipment = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.brand == "Fluval") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  const toggleJuwelBrandEquipment = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.brand == "Juwel") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  const toggleMarineBrandEquipment = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.brand == "Innovative Marine") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  const toggleOaseBrandEquipment = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.brand == "Oase") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  const toggleRedSeaBrandEquipment = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.brand == "Red Sea") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  const togglePumpe = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.type == "Pumpe") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  const toggleSvetla = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.type == "Svetla") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  const toggleFilteri = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.type == "Filteri") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  const toggleRasprsivaci = () => {
    setIsAquariums(false);
    setIsActiveFish(false);
    setIsPlants(false);
    setIsEquipment(true);
    setEquipment([]);
    items.forEach((item) => {
      if (item.__t == "Equipment" && item.type == "Rasprsivaci") {
        setEquipment((prevEquipment) => [...prevEquipment, item]);
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3500/getItems")
      .then((response) => {
        setItems(response.data);
        setReadyStrana(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAquariums]);
  if (!readyStrana) {
    return <LoadingPage />;
  } else {
    return (
      <div className="flexmen">
        <div className="layout has-sidebar fixed-sidebar fixed-header">
          <aside id="sidebar" className="sidebar break-point-sm has-bg-image">
            <div className="image-wrapper">
              <img
                src="assets/images/sidebar-bg.jpg"
                alt="sidebar background"
              />
            </div>
            <div className="sidebar-layout">
              <div className="sidebar-content">
                <nav className="menu open-current-submenu">
                  <ul>
                    <li className="menu-header">
                      <span> OSNOVNO </span>
                    </li>
                    <li className="menu-item sub-menu">
                      <a href="#" onClick={toggleClass}>
                        <span className="menu-icon">
                          <i className="ri-vip-diamond-fill" />
                        </span>
                        <span className="menu-title">Akvarijumi</span>
                      </a>
                      <div
                        className="sub-menu-list1"
                        style={{ display: isActive ? "block" : "none" }}
                      >
                        <ul>
                          <li className="menu-item">
                            <a href="#" onClick={toggleBrand}>
                              <span className="menu-title">Brend</span>
                            </a>
                            <div
                              className="sub-menu-list1"
                              style={{
                                display: isActiveBrand ? "block" : "none",
                              }}
                            >
                              <ul>
                                <li className="menu-item">
                                  <a href="#" onClick={toggleJuwelBrand}>
                                    <span className="menu-title">Juwel</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#" onClick={toggleOaseBrand}>
                                    <span className="menu-title">Oase</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#" onClick={toggleFluvalBrand}>
                                    <span className="menu-title">Fluval</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#" onClick={toggleBiOrbBrand}>
                                    <span className="menu-title">biOrb</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#" onClick={toggleRedSeaBrand}>
                                    <span className="menu-title">Red Sea</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#" onClick={toggleMarineBrand}>
                                    <span className="menu-title">
                                      Innovative Marine
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="menu-item sub-menu">
                      <a href="#" onClick={toggleFish}>
                        <span className="menu-icon">
                          <i className="ri-bar-chart-2-fill" />
                        </span>
                        <span className="menu-title">Ribice</span>
                      </a>
                    </li>
                    <li className="menu-item sub-menu">
                      <a href="#" onClick={togglePlant}>
                        <span className="menu-icon">
                          <i className="ri-shopping-cart-fill" />
                        </span>
                        <span className="menu-title">Biljke</span>
                      </a>
                    </li>
                    <li className="menu-item sub-menu">
                      <a href="#" onClick={toggleEquipment}>
                        <span className="menu-icon">
                          <i className="ri-global-fill" />
                        </span>
                        <span className="menu-title">Oprema</span>
                      </a>
                      <div
                        className="sub-menu-list4"
                        style={{ display: isEquipment ? "block" : "none" }}
                      >
                        <ul>
                          <li className="menu-item">
                            <a href="#" onClick={toggleBrand}>
                              <span className="menu-title">Brend</span>
                            </a>
                            <div
                              className="sub-menu-list1"
                              style={{
                                display: isActiveBrand ? "block" : "none",
                              }}
                            >
                              <ul>
                                <li className="menu-item">
                                  <a
                                    href="#"
                                    onClick={toggleJuwelBrandEquipment}
                                  >
                                    <span className="menu-title">Juwel</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    href="#"
                                    onClick={toggleOaseBrandEquipment}
                                  >
                                    <span className="menu-title">Oase</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    href="#"
                                    onClick={toggleFluvalBrandEquipment}
                                  >
                                    <span className="menu-title">Fluval</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    href="#"
                                    onClick={toggleBiOrbBrandEquipment}
                                  >
                                    <span className="menu-title">biOrb</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    href="#"
                                    onClick={toggleRedSeaBrandEquipment}
                                  >
                                    <span className="menu-title">Red Sea</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a
                                    href="#"
                                    onClick={toggleMarineBrandEquipment}
                                  >
                                    <span className="menu-title">
                                      Innovative Marine
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="menu-item">
                            <a href="#" onClick={toggleType}>
                              <span className="menu-title">Tip</span>
                            </a>
                            <div
                              className="sub-menu-list1"
                              style={{
                                display: isActiveType ? "block" : "none",
                              }}
                            >
                              <ul>
                                <li className="menu-item">
                                  <a href="#" onClick={togglePumpe}>
                                    <span className="menu-title">Pumpe</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#" onClick={toggleSvetla}>
                                    <span className="menu-title">Svetla</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#" onClick={toggleFilteri}>
                                    <span className="menu-title">Filteri</span>
                                  </a>
                                </li>
                                <li className="menu-item">
                                  <a href="#" onClick={toggleRasprsivaci}>
                                    <span className="menu-title">
                                      Rasprsivaci
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    {/* <li className="menu-item sub-menu">
                  <a href="#" onClick={toggleClass5}>
                    <span className="menu-icon">
                      <i className="ri-paint-brush-fill" />
                    </span>
                    <span className="menu-title">Theme</span>
                  </a>
                  <div
                    className="sub-menu-list5"
                    style={{ display: isActive5 ? "block" : "none" }}
                  >
                    <ul>
                      <li className="menu-item">
                        <a href="#">
                          <span className="menu-title">Dark</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="#">
                          <span className="menu-title">Light</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li> */}
                    <li className="menu-header" style={{ paddingTop: 20 }}>
                      <span> DODATNO </span>
                    </li>
                    <li className="menu-item">
                      <a href="#">
                        <span className="menu-icon">
                          <i className="ri-book-2-fill" />
                        </span>
                        <span className="menu-title">Izrada akvarijuma</span>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="#">
                        <span className="menu-icon">
                          <i className="ri-calendar-fill" />
                        </span>
                        <span className="menu-title">Servis akvarijuma</span>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a href="#">
                        <span className="menu-icon">
                          <i className="ri-service-fill" />
                        </span>
                        <span className="menu-title">
                          Izrada iwagumi <br />
                          akvarijuma
                        </span>
                        <span className="menu-suffix">
                          <span className="badge secondary">Novo</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="sidebar-footer">
                <div className="footer-box">
                  <div>
                    <svg
                      width="42px"
                      height="42px"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      href="/"
                    >
                      <path
                        fill="#ffffff"
                        d="M96 39c-4.75 0-8.688.388-12.613 2.385-3.926 1.997-7.284 6.946-7.61 11.176-.65 8.46 3.415 12.92 6.506 18.07 3.09 5.152 6.22 10.342 7.428 13.966 1.21 3.623 1.275 3.692-.073 5.04l-.035.034-.034.035C48.298 131.88 23 192.615 23 256c0 84.586 49.342 158.86 116.316 199.686C176.136 478.13 214.018 473 256 473c41.406 0 80.11 4.575 116.62-17.277C440.496 415.1 489 341.143 489 256c0-63.218-25.516-124.14-66.553-166.28l-.04-.042-.044-.04c-1.348-1.35-1.282-1.42-.074-5.042 1.207-3.624 4.336-8.814 7.427-13.965 3.09-5.15 7.156-9.61 6.506-18.07-.326-4.23-3.684-9.178-7.61-11.175C424.688 39.388 420.75 39 416 39H96zm0 18h320c.277 0 .127.03.38.037-.584 1.346-1.09 2.656-2.097 4.332-2.91 4.848-6.78 10.658-9.072 17.534-2.29 6.877-2.225 16.808 4.427 23.46l-.084-.085C447.116 140.852 471 197.657 471 256c0 78.296-44.763 146.655-107.62 184.277C332.713 458.63 298.577 455 256 455c-43.3 0-76.282 4.233-107.316-14.686C86.65 402.5 41 333.556 41 256c0-58.569 23.653-115.098 61.432-153.705l-.07.068c6.653-6.65 6.72-16.582 4.427-23.46-2.293-6.875-6.164-12.685-9.073-17.534-1.006-1.677-1.513-2.987-2.096-4.333.253-.008.103-.037.38-.037zm87.484 61.742c-3.14-.01-6.395.055-9.734.186-20.032.785-43.117 3.942-63.287 7.217-2.172.352-4.24.706-6.332 1.06-5.374 5.666-10.308 12.474-14.8 20.115-.174.296-.34.6-.514.9 7.16-1.346 15.486-2.84 24.532-4.308 26.376-4.282 58.298-8.124 78.11-6.928 40.6 2.452 80.8 29.15 128 32 23.11 1.396 55.185-2.763 82.08-7.13 9.824-1.594 18.89-3.226 26.49-4.665-2.093-4.34-4.305-8.55-6.655-12.547-.815-1.386-1.65-2.734-2.494-4.063-6.142 1.128-12.943 2.325-20.228 3.508-26.376 4.282-58.298 8.124-78.11 6.928-40.6-2.452-80.8-29.15-128-32-2.888-.175-5.916-.263-9.058-.274zm-66.115 42.77l-30.026 2.88A192 192 0 0 0 64 256a192 192 0 0 0 62.63 141.56A224 224 0 0 1 87.88 272a224 224 0 0 1 29.49-110.488zm250.806 13.435a24 24 0 0 0-24 24 24 24 0 0 0 24 24 24 24 0 0 0 24-24 24 24 0 0 0-24-24zm30.83 78.46a16 16 0 0 0-16 16 16 16 0 0 0 16 16 16 16 0 0 0 16-16 16 16 0 0 0-16-16zm-94.026 18.546c-29.042.46-80.674 29.662-102.882 42.205C187.845 300.326 172.085 288 144 288c16 16 16 48 0 64 28.08 0 37.343-22.155 56.672-22.168C220 329.82 289.394 372.967 320 368c38.434-6.237 64-32 64-48-1.427-24.583-47.862-46.512-76.28-48-.89-.046-1.803-.062-2.74-.047zM336 293.385a10.81 10.81 0 0 1 10.81 10.808 10.81 10.81 0 0 1-10.81 10.81 10.81 10.81 0 0 1-10.81-10.81A10.81 10.81 0 0 1 336 293.385z"
                      />
                    </svg>
                  </div>
                  <div style={{ padding: "0 10px" }}>
                    <span style={{ display: "block", marginBottom: 10 }}>
                      Zapratite nas na društvenim mrežama
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div>
          <div className="ivice">
            <main>
              {!isAquariums && !isPlants && !isActiveFish && !isEquipment && (
                <div className="kontejner">
                  {items?.map((akvarijum, index) => (
                    <DefaultCard key={index} akvarijum={akvarijum} />
                  ))}
                </div>
              )}
              {isAquariums && (
                <div className="kontejner">
                  {aquariums?.map((akvarijum, index) => (
                    <DefaultCard key={index} akvarijum={akvarijum} />
                  ))}
                </div>
              )}
              {isPlants && (
                <div className="kontejner">
                  {plants?.map((akvarijum, index) => (
                    <DefaultCard key={index} akvarijum={akvarijum} />
                  ))}
                </div>
              )}
              {isActiveFish && (
                <div className="kontejner">
                  {fish?.map((akvarijum, index) => (
                    <DefaultCard key={index} akvarijum={akvarijum} />
                  ))}
                </div>
              )}
              {isEquipment && (
                <div className="kontejner">
                  {equipment?.map((akvarijum, index) => (
                    <DefaultCard key={index} akvarijum={akvarijum} />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
};
export default AllProductsPage;
