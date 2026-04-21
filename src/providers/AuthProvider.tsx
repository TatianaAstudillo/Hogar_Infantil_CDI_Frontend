import { createContext, useContext, useState, useEffect } from "react";

type User ={
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}
type AuthContextType ={
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user:User) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(() => {
  return localStorage.getItem("token");
  });
  const [user, setUser] = useState<User | null>(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
    setUser(JSON.parse(storedUser));
    setToken(storedToken);
  }
}, []);

  const login = (token: string, user:User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};