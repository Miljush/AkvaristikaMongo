import { useEffect, useState } from "react";

const LoginRegister = () => {
  const [active, setActive] = useState("");
  const HandeSignUp = () => {
    setActive("right-panel-active");
  };
  const HandeSignIn = () => {
    setActive("");
  };
  useEffect(() => {}, [active]);

  return (
    <div className="glavniii">
      <div className={`containerko ${active}`} id="containerko">
        <div class="form-containerko sign-up-containerko">
          <form className="formicko" action="#">
            <h1 className="heder1">Create Account</h1>

            <input className="inputiris" type="text" placeholder="Name" />
            <input className="inputiris" type="email" placeholder="Email" />
            <input
              className="inputiris"
              type="password"
              placeholder="Lozinka"
            />
            <button className="dugmetara">Registruj se</button>
          </form>
        </div>
        <div class="form-containerko sign-in-containerko">
          <form className="formicko" action="#">
            <h1 className="heder1">Prijava</h1>

            <input className="inputiris" type="email" placeholder="Email" />
            <input
              className="inputiris"
              type="password"
              placeholder="Lozinka"
            />
            <a className="aaa" href="#">
              Zaboravili ste lozinku?
            </a>
            <button className="dugmetara">Prijavi se</button>
          </form>
        </div>
        <div class="overlay-containerko">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
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
            <div class="overlay-panel overlay-right">
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
