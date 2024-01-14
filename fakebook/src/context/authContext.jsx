import { createContext, useEffect, useState } from "react";
import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${baseURL}/users/login`, inputs);
      setCurrentUser(res.data.token);
      return res.data;
    } catch (err) {
      if (err.response && err.response.data.status === false) {
        alert(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;