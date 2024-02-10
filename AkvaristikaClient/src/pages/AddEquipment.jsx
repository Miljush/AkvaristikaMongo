import React, { useContext, useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import axios from "axios";
import Card from "../components/EquipmentCard";
import LoadingPage from "./LoadingPage";
import { UserContext } from "../context/UserContext";
import NotFoundPage from "./NotFoundPage";

const AddEquipment = () => {
  const [imageUpload, setImageUpload] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [ime, setIme] = useState("");
  const [cena, setCena] = useState(0);
  const [opis, setOpis] = useState("");
  const [readyStrana, setReadyStrana] = useState(false);
  const { username, ready } = useContext(UserContext);
  const [rehydrate, setRehydrate] = useState(true);
  const [equipment, setEquipment] = useState(true);
  const [objekat, setObjekat] = useState(null);
  const [update, setUpdate] = useState(false);
  const [slika, setSlika] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Juwel");
  const [type, setType] = useState("Pumpe");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleClick = (obj) => {
    setObjekat(obj);
    setUpdate(true);
  };
  const uploadFile = (ev) => {
    ev.preventDefault();
    if (!imageUpload) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const data = {
          name: ime,
          price: cena,
          image: url,
          description: opis,
          brand: selectedOption,
          type: type,
        };
        axios
          .post("http://localhost:3500/addEquipment", data)
          .then(function (response) {
            setRehydrate(!rehydrate);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    });
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      setImageUpload(selectedFile);
    }
  };
  const handleImageUpload2 = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      setImageUpload(selectedFile);
      setSlika(true);
    }
  };
  const azuriraj = (ev) => {
    ev.preventDefault();
    const data = objekat;
    data.name = ime;
    data.price = cena;
    data.description = opis;
    data.brand = selectedOption;
    data.type = type;
    if (!slika) {
      console.log(data);
      axios
        .put("http://localhost:3500/updateEquipment", data)
        .then((response) => {
          setRehydrate(!rehydrate);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          data.image = url;
          axios
            .put("http://localhost:3500/updateEquipment", data)
            .then((response) => {
              setRehydrate(!rehydrate);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      });
    }
  };
  useEffect(() => {
    axios.get("http://localhost:3500/getEquipment").then((response) => {
      setEquipment(response.data);
      setReadyStrana(true);
    });
    if (update) {
      setIme(objekat?.name);
      setCena(objekat?.price);
      setImageUpload(objekat?.image);
      setOpis(objekat?.description);
      setSelectedOption(objekat?.brand);
      setType(objekat?.type);
    }
  }, [rehydrate, readyStrana, objekat]);
  if (!readyStrana) {
    return <LoadingPage />;
  } else {
    if (ready) {
      if (username) {
        if (username.role == "Admin") {
          return (
            <div className="flexickoooo">
              <form className="formmm">
                {!update && <h1 className="h111"> Dodavanje opreme </h1>}
                {update && <h1 className="h111"> Izmena opreme </h1>}
                <fieldset className="fieldsetic">
                  <label className="labelica" htmlFor="name">
                    Ime:
                  </label>
                  <input
                    className="inputicko"
                    type="text"
                    value={ime}
                    onChange={(ev) => setIme(ev.target.value)}
                    placeholder={"Naziv opreme"}
                  />
                  <label className="labelica" htmlFor="name">
                    Cena:
                  </label>
                  <input
                    className="inputicko"
                    type="number"
                    value={cena}
                    onChange={(ev) => setCena(ev.target.value)}
                    placeholder={"Cena u dinarima"}
                  />

                  <label className="labelica">Slika</label>
                  {!update && (
                    <input
                      className="inputicko"
                      type="file"
                      onChange={handleImageUpload}
                    />
                  )}
                  {update && (
                    <input
                      className="inputicko"
                      type="file"
                      onChange={handleImageUpload2}
                    />
                  )}
                  {!update && previewImage && (
                    <div>
                      <p>Preview:</p>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="maxmax"
                      />
                    </div>
                  )}
                  {update && slika && (
                    <div>
                      <p>Preview:</p>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="maxmax"
                      />
                    </div>
                  )}
                  {update && !slika && (
                    <div>
                      <p>Preview:</p>
                      <img src={imageUpload} alt="Preview" className="maxmax" />
                    </div>
                  )}
                  <label className="labelica" htmlFor="bio">
                    Opis:
                  </label>
                  <textarea
                    className="inputicko"
                    value={opis}
                    onChange={(ev) => setOpis(ev.target.value)}
                    id="bio"
                    name="user_bio"
                  />
                  <label className="labelica" htmlFor="job">
                    Brend:
                  </label>
                  <select
                    className="inputicko selectar"
                    id="job"
                    name="user_job"
                    value={selectedOption}
                    onChange={handleOptionChange}
                  >
                    <option value="Juwel">Juwel</option>
                    <option value="Oase">Oase</option>
                    <option value="Fluval">Fluval</option>
                    <option value="biOrb">biOrb</option>
                    <option value="Red Sea">Red Sea</option>
                    <option value="Innovative Marine">Innovative Marine</option>
                  </select>
                  <label className="labelica" htmlFor="job">
                    Tip:
                  </label>
                  <select
                    className="inputicko selectar"
                    id="job"
                    name="user_job"
                    value={type}
                    onChange={handleTypeChange}
                  >
                    <option value="Pumpe">Pumpe</option>
                    <option value="Svetla">Svetla</option>
                    <option value="Filteri">Filteri</option>
                    <option value="Rasprsivaci">Rasprsivaci</option>
                  </select>
                </fieldset>
                {!update && (
                  <button onClick={(ev) => uploadFile(ev)} className="buttonko">
                    Dodaj Opremu
                  </button>
                )}
                {update && (
                  <button onClick={(ev) => azuriraj(ev)} className="buttonko">
                    Izmeni Opremu
                  </button>
                )}
              </form>
              <div className="ivice">
                <main>
                  <div className="kontejner">
                    {equipment.map((eq, index) => (
                      <Card
                        key={index}
                        equipment={eq}
                        brisanje={true}
                        handleId={handleClick}
                      />
                    ))}
                  </div>
                </main>
              </div>
            </div>
          );
        } else {
          return <NotFoundPage />;
        }
      } else {
        return <NotFoundPage />;
      }
    }
  }
};
export default AddEquipment;
