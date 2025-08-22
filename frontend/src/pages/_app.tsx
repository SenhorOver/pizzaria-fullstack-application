import type { AppProps } from "next/app";
import "../../styles/globals.scss";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer theme="dark" autoClose={2500} />
    </AuthProvider>
  );
}
