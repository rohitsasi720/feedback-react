import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const navigate = useNavigate();
  const [error, setError] = useState([]);

const getUser = async () => {
  try {
    let data = null;
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      data = JSON.parse(userFromLocalStorage);
    } else {
      const response = await axios.get("/api/user");
      data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
    }
    setUser(data);
    return data;
  } catch (error) {
    setUser(null);
    localStorage.removeItem("user");
    return null;
  }
};





  const login = async ({ email, password }) => {
    await csrf();
    try {
      await axios.post("/login", {
        email,
        password,
      });
      localStorage.setItem("useremail", email);
      await getUser();
      navigate("/dashboard");
    } catch (error) {
      if (error.response.status === 422) {
        setError(error.response.data.errors);
      }
    }
  };

  const register = async ({ name, email, password, password_confirmation }) => {
    await csrf();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      localStorage.setItem("username", name);
      await getUser();
      navigate("/dashboard");
    } catch (error) {
      if (error.response.status === 422) {
        setError(error.response.data.errors);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    } else {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, getUser, login, register, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
