import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "@/contexts/AuthContext";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export function setupApiClient(
  ctx:
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | undefined = undefined,
) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["@nextauth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // Erro 401 (não autorizado) vai deslogar o usuário
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          // Deslogar o usuário (client-side)
          signOut();
        } else {
          // Error (server-side)
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
