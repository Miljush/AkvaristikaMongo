import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [headerData, setHeaderData] = useState(0); // Initial header data

  const updateHeaderData = (newData) => {
    setHeaderData(newData);
  };

  //   useEffect(() => {
  //     axios
  //       .get("your-api-endpoint")
  //       .then((response) => {
  //         setHeaderData(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching header data:", error);
  //       });
  //   }, []);

  return (
    <AppContext.Provider value={{ headerData, updateHeaderData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
