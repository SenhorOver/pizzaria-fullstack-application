import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "../../styles/home.module.scss";

import logoImg from "../assets/logo.svg";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

export default function Home() {
  const { signIn, authLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Preencha todos os campos");
      return;
    }

    await signIn({ email: email.toLowerCase(), password });
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" width={300} />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={authLoading}>
              Acessar
            </Button>
          </form>

          <Link href="/signup">
            <p className={styles.text}>Não possui uma conta? Cadastre-se</p>
          </Link>
        </div>
      </div>
    </>
  );
}
