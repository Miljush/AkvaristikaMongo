import React, { useState } from "react";

const Footer = () => {
  return (
    <footer>
      <ul>
        Proizvodi
        <li>
          <a href="#">Akvarijumi</a>
        </li>
        <li>
          <a href="#">Ribice</a>
        </li>
        <li>
          <a href="#">Biljke</a>
        </li>
        <li>
          <a href="#">Oprema</a>
        </li>
      </ul>

      <ul>
        Naši servisi
        <li>
          <a href="#">Izrada akvarijuma</a>
        </li>
        <li>
          <a href="#">Održavanje akvarijuma</a>
        </li>
      </ul>
      <ul>
        Naša kompanija
        <li>
          <a href="#">Lokacija i vreme rada</a>
        </li>
        <li>
          <a href="#">O nama</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
