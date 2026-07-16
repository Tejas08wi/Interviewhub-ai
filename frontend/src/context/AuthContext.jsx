import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getInitialAuth = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return {
        token: "",
        role: "",
        email: "",
        isAuthenticated: false,
      };
    }

    try {
      const decoded = jwtDecode(token);

      return {
        token,
        role: decoded.role,
        email: decoded.sub,
        isAuthenticated: true,
      };
    } catch (error) {
      localStorage.removeItem("token");

      return {
        token: "",
        role: "",
        email: "",
        isAuthenticated: false,
      };
    }
  };

  const [auth, setAuth] = useState(getInitialAuth);

  const login = (token) => {
    const decoded = jwtDecode(token);

    localStorage.setItem("token", token);

    setAuth({
      token,
      role: decoded.role,
      email: decoded.sub,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");

    setAuth({
      token: "",
      role: "",
      email: "",
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);