import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [active, setActive] = useState("");
  const HandeSignUp = () => {
    setActive("right-panel-active");
  };
  const HandeSignIn = () => {
    setActive("");
  };
  const [username, setUsernamee] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useContext(UserContext);
  const [usernameRegister, setUsernameRegister] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const log = async (ev) => {
    ev.preventDefault();
    const response = await axios.post(
      "http://localhost:3500/login",
      {
        user: username,
        pwd: password,
      },
      { withCredentials: true }
    );
    setUsername(response.data);
    navigate("/allProducts");
  };

  const register = async (ev) => {
    ev.preventDefault();
    const response = await axios.post("http://localhost:3500/register", {
      username: usernameRegister,
      password: passwordRegister,
      firstName: firstName,
      lastName: lastName,
      email: email,
      profilePicture: "slika.jpg",
    });
    setActive("");
  };
  useEffect(() => {}, [active]);

  return (
    <div className="glavniii">
      <div className={`containerko ${active}`} id="containerko">
        <div className="form-containerko sign-up-containerko">
          <form className="formicko">
            <h1 className="heder1">Create Account</h1>

            <input
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
              className="inputiris"
              type="text"
              placeholder="Ime"
            />
            <input
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
              className="inputiris"
              type="text"
              placeholder="Prezime"
            />
            <input
              value={usernameRegister}
              onChange={(ev) => setUsernameRegister(ev.target.value)}
              className="inputiris"
              type="text"
              placeholder="username"
            />
            <input
              value={passwordRegister}
              onChange={(ev) => setPasswordRegister(ev.target.value)}
              className="inputiris"
              type="password"
              placeholder="Lozinka"
            />
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="inputiris"
              type="email"
              placeholder="E-mail"
            />
            <button
              className="buttonarijus dugmetara"
              onClick={(ev) => {
                register(ev);
              }}
            >
              Registruj se
            </button>
          </form>
        </div>
        <div className="form-containerko sign-in-containerko">
          <form className="formicko">
            <h1 className="heder1">Prijava</h1>
            <input
              value={username}
              onChange={(ev) => setUsernamee(ev.target.value)}
              className="inputiris"
              type="text"
              placeholder="username"
            />
            <input
              className="inputiris"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              type="password"
              placeholder="Lozinka"
            />
            <a className="aaa" href="#">
              Zaboravili ste lozinku?
            </a>
            <button
              onClick={(ev) => log(ev)}
              className="buttonarijus dugmetara"
            >
              Prijavi se
            </button>
          </form>
        </div>
        <div className="overlay-containerko">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="heder1">Dobrodošao nazad!</h1>
              <p className="paragraf">
                Da biste ostali povezani s nama, molimo vas da se prijavite sa
                svojim ličnim informacijama.
              </p>
              <button
                onClick={HandeSignIn}
                className="buttonarijus dugmetara ghost"
                id="signIn"
              >
                Prijavi se
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="heder1">Zdravo, ljubitelju akvarijuma!</h1>
              <p className="paragraf">
                Unesi svoje lične podatke i započni svoju avanturu s nama
              </p>
              <button
                onClick={HandeSignUp}
                className="buttonarijus dugmetara ghost"
                id="signUp"
              >
                Registracija
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
