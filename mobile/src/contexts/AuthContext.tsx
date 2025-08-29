import { createContext, useEffect, useState } from "react";
import { api } from "../services/apiCient";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  loadingAuth: boolean;
}

export interface UserProps {
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

export async function signOut() {
  await AsyncStorage.clear();
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    email: "",
    name: "",
    token: "",
  });
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.name;

  useEffect(() => {
    async function getUser() {
      // Get saved user data
      const userInfo = await AsyncStorage.getItem("@userpizzaria");
      const hasUser: UserProps = JSON.parse(userInfo || "{}");

      // Verify if user info exists
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common["Authorization"] =
          `Bearer ${hasUser.token}'`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
      } else {
        setUser({
          id: "",
          name: "",
          email: "",
          token: "",
        });
      }

      setLoading(false);
    }

    getUser();
  }, []);

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: "",
        name: "",
        email: "",
        token: "",
      });
    });
  }

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const lowerEmail = email.toLowerCase();
      const response = await api.post("/session", {
        email: lowerEmail,
        password,
      });

      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem("@userpizzaria", JSON.stringify(data));

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
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signOut, loading, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
