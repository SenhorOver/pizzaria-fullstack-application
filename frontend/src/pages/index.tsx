import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import styles from "../../styles/home.module.scss";

import logoImg from "../assets/logo.svg";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthContext } from "@/contexts/AuthContext";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await signIn({ email: "asd", password: "sadf" });
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
            <Input type="email" placeholder="Digite seu email..." />
            <Input type="password" placeholder="Digite sua senha..." />
            <Button type="submit" loading={false}>
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
