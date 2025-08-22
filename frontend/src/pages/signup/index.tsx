import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/home.module.scss";

import logoImg from "../../assets/logo.svg";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function SignUp() {
  const { authLoading, signUp } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      return;
    }

    await signUp({ name, email: email.toLowerCase(), password });
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" width={300} />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              type="text"
              placeholder="Digite seu nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Cadastrar
            </Button>
          </form>

          <Link href="/">
            <p className={styles.text}>Já possui uma conta? Faça login!</p>
          </Link>
        </div>
      </div>
    </>
  );
}
