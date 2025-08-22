import { api } from "@/services/apiClient";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useState } from "react";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  authLoading: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface SignInProps {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("Erro ao deslogar");
  }
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
  });
  const [authLoading, setAuthLoading] = useState(false);
  const isAuthenticated = !!user.name;

  async function signIn({ email, password }: SignInProps) {
    setAuthLoading(true);

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mês
        path: "/", // Quais caminhos terão acesso ao cookie
      });

      setUser({ id, name, email });

      // Próximas requisições com token
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Redirecionar para /dashboard
      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }

    setAuthLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, authLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
