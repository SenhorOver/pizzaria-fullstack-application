import { api } from "@/services/apiClient";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
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
    Router.push("/");
  } catch (err) {
    console.log(err);
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

  useEffect(() => {
    setAuthLoading(true);
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, name, email } = response.data;

          setUser({
            id,
            name,
            email,
          });
        })
        .catch(() => {
          signOut();
        })
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);

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
