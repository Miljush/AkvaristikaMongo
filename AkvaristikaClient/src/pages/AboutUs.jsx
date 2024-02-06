import React from "react";

const AboutUs = () => {
  return (
    <div className="wrapper">
      <section id="home" className="sec-main">
        <h1 className="main-heading">Gde se rađa inspiracija.</h1>
      </section>
      <section id="about" className="sec-about">
        <div className="container">
          <h1>O nama</h1>
          <hr />
          <div className="flexara">
            <div className="" style={{ alignItems: "center" }}>
              <p className="para">
                Dobrodošli u Diskus - vašu destinaciju za vrhunsku akvaristiku!
                Nalazimo se u srcu Niša i predstavljamo strastveni tim
                zaljubljenika u vodeni svet. U našoj radnji, očekuje vas širok
                asortiman kvalitetne opreme, saveta stručnjaka i ljubazna
                podrška kako biste stvorili svoj savršeni akvarijum. Otkrijte
                lepotu podvodnog sveta s nama!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="sec-services">
        <div className="container">
          <h1>Servisi</h1>
          <hr />
          <div className="flexic">
            <div className="col-sm-4">
              <i className="fa fa-4x fa-paint-brush" />
              <h2 className="h3">Izrada Akvarijuma</h2>
              <p>
                Oživite svoj prostor uz naše personalizovane akvarijume!
                Specijalizujemo se u izradi akvarijuma prema vašim željama,
                pružajući vam jedinstveni komad prirode u vašem domu ili
                kancelariji. Bez obzira na veličinu ili oblik, naš tim
                stručnjaka će stvoriti akvarijum koji odražava vašu jedinstvenu
                estetiku i pruža idealno okruženje za vaše ljubimce.
              </p>
            </div>
            <div className="col-sm-4">
              <i className="fa fa-4x fa-code" />
              <h2 className="h3">Održavanje Akvarijuma</h2>
              <p>
                Zaboravite na brige oko održavanja vašeg akvarijuma - prepustite
                to nama! Naš tim iskusnih stručnjaka pruža sveobuhvatne usluge
                održavanja, uključujući kontrolu vode, čišćenje i održavanje
                opreme. Vaš akvarijum će uvek blistati, a vaši vodeni stanovnici
                će uživati ​​u optimalnim uslovima.
              </p>
            </div>
            <div className="col-sm-4">
              <i className="fa fa-4x fa-tablet" />
              <h2 className="h3">Izrada Iwagumi Scape-ova</h2>
              <p>
                Stvorite harmoniju u vašem akvarijumu uz naše usluge izrade
                Iwagumi scape-ova. Posvećeni smo kreiranju vizuelno
                zadivljujućih pejzaža koristeći kamenje, biljke i vodu. Bilo da
                želite minimalistički dizajn ili živopisni akvarijum, naša
                stručnost će vam pomoći da postignete željeni estetski dojam.
                Oživite svoj prostor uz naše jedinstvene Iwagumi scape-ove!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
