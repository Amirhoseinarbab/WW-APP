const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

import  { createContext, useState } from "react";

// Create the authentication context
export const AuthContext = createContext();

// Create the authentication provider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    
    // const navigate = useNavigate()

  // Function to handle login
  const login = (email, password) => {
    // Perform authentication logic here (e.g., API call)
    // Set the user and isLoggedIn state based on the result
    console.log("login")
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
        console.log("true login")
      setUser(FAKE_USER);
      setIsLoggedIn(true);
    //   navigate("/app")
      
    }
  };

  // Function to handle logout
  const logout = () => {
    // Perform logout logic here (e.g., clear session)
    // Reset the user and isLoggedIn state
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
