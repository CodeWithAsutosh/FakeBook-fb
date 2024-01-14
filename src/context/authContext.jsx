import { createContext, useEffect, useState } from "react";
import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUserID, setCurrentUserID] = useState(
    JSON.parse(localStorage.getItem("userId")) || null
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(`${baseURL}/users/login`, inputs);
      setCurrentUserID(res.data.data.userId);
      setCurrentUser(res.data.data.token);
      return res.data;
    } catch (err) {
      if (err.response && err.response.data.status === false) {
        alert(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(currentUserID));
    localStorage.setItem("token", JSON.stringify(currentUser));
  }, [currentUser, currentUserID]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;