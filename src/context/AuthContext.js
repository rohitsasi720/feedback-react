import { createContext, useContext, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom'; 

const AuthContext = createContext({});
//const useAuth = () => useContext(AuthContext); 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const csrf = () => axios.get('/sanctum/csrf-cookie');
    const navigate = useNavigate();
    const [error, setError] = useState([]);
    
    const getUser = async () => {
        const { data } = await axios.get('/api/user');
        setUser(data);
    };

    const login = async ({email, password}) => {
        await csrf();
        try {
          await axios.post("/login", {
            email,
            password,
          });
          await getUser();
          navigate("/dashboard");
        } catch (error) {
          if (error.response.status === 422) {
            setError(error.response.data.errors);
          }
        }
    }

    const register = async ({name, email, password, password_confirmation}) => {
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
        } 
        catch (error) {
          if (error.response.status === 422) {
            setError(error.response.data.errors);
          }
        }
    }

    const logout = () => {
        axios.post('/logout').then(() => {
            setUser(null);
            navigate('/login');
        }
        );
    }

    // useEffect(() => {
    //     if(!user){
    //         getUser();
    //     }
    // }, [user]);


    return <AuthContext.Provider value={{ user, getUser, login, register, logout, error }}>{children}</AuthContext.Provider>;
}
    export default function useAuthContext() {
        return useContext(AuthContext);
    }



