import React, { createContext, useState, useEffect } from 'react';

export let AuthContext = createContext();

function AuthProvider({ children })  {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const login = (email, type) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserType(type);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setUserType("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn , userType, setUserType , userEmail, setUserEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
