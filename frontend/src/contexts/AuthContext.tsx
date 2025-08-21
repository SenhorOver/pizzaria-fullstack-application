import Router from "next/router";
import { destroyCookie } from "nookies";
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
    setUser((user) => user);
    console.log(email, password);
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
