import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import axios from "axios";
import Card from "../components/Card";
import LoadingPage from "./LoadingPage";

const AddAquarium = () => {
  const [imageUpload, setImageUpload] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [ime, setIme] = useState("");
  const [cena, setCena] = useState(0);
  const [opis, setOpis] = useState("");
  const [readyStrana, setReadyStrana] = useState(false);
  const [rehydrate, setRehydrate] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Juwel");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const log = (ev) => {
    ev.preventDefault();
    console.log(ime + cena + opis + brend + selectedOption);
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
        };
        axios
          .post("http://localhost:3500/addAquarium", data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        setRehydrate(!rehydrate);
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
    useEffect(() => {
      axios.get("/stanOglas/vratiDostupneOglase").then((response) => {
        setOglasi(response.data);
        setReadyStrana(true);
      });
    }, [rehydrate]);
  };
  if (!readyStrana) {
    return <LoadingPage />;
  } else {
    return (
      <div className="flexickoooo">
        <form className="formmm" onSubmit={(ev) => uploadFile(ev)}>
          <h1 className="h111"> Dodavanje Akavarijuma </h1>
          <fieldset className="fieldsetic">
            <label className="labelica" htmlFor="name">
              Ime:
            </label>
            <input
              className="inputicko"
              type="text"
              value={ime}
              onChange={(ev) => setIme(ev.target.value)}
              placeholder={"Naziv akavarijuma"}
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
            <input
              className="inputicko"
              type="file"
              onChange={handleImageUpload}
            />
            {previewImage && (
              <div>
                <p>Preview:</p>
                <img src={previewImage} alt="Preview" className="maxmax" />
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
          </fieldset>
          <button className="buttonko">Dodaj Akvarijum</button>
        </form>
        <div className="ivice">
          <main>
            <div className="kontejner">
              {[...Array(6)].map((_, index) => (
                <Card key={index} />
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }
};
export default AddAquarium;
