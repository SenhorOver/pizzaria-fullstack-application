import { AuthTokenError } from "@/services/errors/AuthTokenError";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies, destroyCookie } from "nookies";

// Only Authenticated
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function canSSRAuth<P extends Record<string, any>>(
  fn: GetServerSideProps<P>,
) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    // If guest user access page, redirect
    const token = cookies["@nextauth.token"];
    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      const response = await fetch("http://localhost:3333/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 404 || response.status === 401) {
        throw new Error("Token Invalid");
      }
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, "@nextauth.token");
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      destroyCookie(ctx, "@nextauth.token");
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
