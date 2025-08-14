import { createContext, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface SignInProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    email: "",
    name: "",
    token: "",
  });
  const [loadingAuth, setLoadingAuth] = useState(false);
  const isAuthenticated = !!user.name;

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem("@sujeitopizzaria", JSON.stringify(data));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        token,
      });

      setLoadingAuth(false);
    } catch (err) {
      console.log("error", err);
      setLoadingAuth(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
