import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { username, ready } = useContext(UserContext);
  const [headerData, setHeaderData] = useState(0);

  const updateHeaderData = (newData) => {
    setHeaderData(newData);
  };

  useEffect(() => {
    if (ready && username) {
      axios
        .get("http://localhost:3500/cartItemCountUser", {
          params: { id: username._id },
        })
        .then((response) => {
          setHeaderData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching header data:", error);
        });
    }
  }, [username]);

  return (
    <AppContext.Provider value={{ headerData, updateHeaderData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
