import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      if (!username) {
        axios
          .get("http://localhost:3500/userProfileInfo", {
            withCredentials: true,
          })
          .then(({ data }) => {
            setUsername(data);
            setReady(true);
          });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);
  return (
    <UserContext.Provider value={{ username, setUsername, ready }}>
      {children}
    </UserContext.Provider>
  );
}
