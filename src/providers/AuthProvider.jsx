/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router";
import { getDataPrivate, signoutAPI } from "../utils/api";
import { jwtStorage } from "../utils/jwt_storage";


export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your logic
  const [userProfile, setUserProfile] = useState({});

  const navigate = useNavigate();

  const getDataProfile = () => {
    getDataPrivate("/api/v1/protected/data")
      .then((resp) => {
        if (resp?.user_logged) {
          setUserProfile(resp);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getDataProfile();
  }, []);

  const signin = (access_token, role) => {
    jwtStorage.storeToken(access_token);
    getDataProfile();
  
     
    if (role === "user") {
      navigate("/ragam", { replace: true });
    } else {
      navigate("/report-user", { replace: true });
    }
  };

  const signout = () => {
    signoutAPI()
      .then((resp) => {
        if (resp?.isSignedOut) {
          jwtStorage.removeItem();
          setIsLoggedIn(false);
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, signin, signout, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
