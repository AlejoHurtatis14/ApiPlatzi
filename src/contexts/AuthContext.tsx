import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { getJsonObject, storage } from "../storage/storage";
import { useIonToast } from "@ionic/react";
import { useHistory } from 'react-router-dom';
import { User } from "../interfaces/User";

export const AuthContext = createContext<ValueAuthProviderType>({
  currentUser: { id: 0, email: "", name: "", password: "" },
  login: (n, p) => {},
  logout: () => {},
  setCurrentUser: () => {},
});

export function useAuth() {
  return useContext<ValueAuthProviderType>(AuthContext);
}

type AuthProviderType = {
  children: ReactNode;
};

type ValueAuthProviderType = {
  currentUser: User;
  login: (name: string, password: string) => void;
  logout: () => void;
  setCurrentUser: (u: User) => void;
};

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [users] = useState<Array<User>>([
    {
      id: 1,
      name: "Admin",
      email: "admin@admin.com",
      password: "1234",
    },
    {
      id: 2,
      name: "User",
      email: "user@user.com",
      password: "1234",
    },
  ]);
  const [currentUser, setCurrentUser] = useState<User>({
    id: 0,
    email: "",
    name: "",
    password: "",
  });
  const [present] = useIonToast();
  const history = useHistory();

  useEffect(() => {
    const checkUserLogged = async () => {
      const user = await getJsonObject('userapiplatzi');
      if (user) {
        setCurrentUser(user);
        history.replace('/products-general')
      }
    };

    checkUserLogged();
  }, []);

  const login = (email: string, password: string) => {
    let findUser = users.find(
      (user) => user.email == email && user.password == password
    );
    if (findUser) {
      setCurrentUser(findUser);
      storage.set("userapiplatzi", JSON.stringify(findUser));
      history.push('/products-general')
    } else {
      presentToast("Datos incorrectos", "top");
    }
  };

  const logout = () => {
    setCurrentUser({ id: 0, email: "", name: "", password: "" });
    storage.remove('userapiplatzi');
    history.replace('/login')
  };

  const presentToast = (
    message: string,
    position: "top" | "middle" | "bottom"
  ) => {
    present({
      message: message,
      duration: 1500,
      position: position,
    });
  };

  const value: ValueAuthProviderType = {
    currentUser,
    login,
    logout,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
