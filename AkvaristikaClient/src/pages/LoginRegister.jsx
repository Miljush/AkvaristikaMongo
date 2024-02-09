import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

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
  };
  useEffect(() => {}, [active]);

  return (
    <div className="glavniii">
      <div className={`containerko ${active}`} id="containerko">
        <div className="form-containerko sign-up-containerko">
          <form className="formicko">
            <h1 className="heder1">Create Account</h1>

            <input className="inputiris" type="text" placeholder="Name" />
            <input className="inputiris" type="text" placeholder="Email" />
            <input
              className="inputiris"
              type="password"
              placeholder="Lozinka"
            />
            <button className="dugmetara">Registruj se</button>
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
            <button onClick={(ev) => log(ev)} className="dugmetara">
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
                className="dugmetara ghost"
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
                className="dugmetara ghost"
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
