import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

const NotFoundPage = () => {
  return (
    <div className="centric">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "200px",
          }}
        >
          404
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "50px",
          }}
        >
          Stranica koju trazite ne postoji
        </div>
        <a
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "30px",
          }}
          href="/"
        >
          vrati me nazad
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
