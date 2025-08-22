import { api } from "@/services/apiClient";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  authLoading: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
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

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    toast.error("Deslogado com sucesso!");
    Router.push("/");
  } catch {
    toast.error("Erro ao deslogar");
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

      toast.success("Logado com sucesso!");

      // Redirecionar para /dashboard
      Router.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao acessar");
      console.log(err);
    }

    setAuthLoading(false);
  }

  async function signUp({ name, email, password }: SignUpProps) {
    setAuthLoading(true);

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });
      toast.success("Cadastrado com sucesso!");
      Router.push("/");
    } catch (error) {
      toast.error("Erro ao cadastrar!");
      console.log(error);
    }

    setAuthLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, authLoading, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
