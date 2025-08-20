import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";

import logoImg from "../../public/logo.png";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        <div className={styles.login}>
          <form>
            <Input type="text" placeholder="Digite seu email..." />
            <Input type="password" placeholder="Digite sua senha..." />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
        </div>
      </div>
    </>
  );
}
