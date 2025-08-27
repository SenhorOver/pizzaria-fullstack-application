import { Header } from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { useState } from "react";

import { toast } from "react-toastify";
import { setupApiClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (name == "") {
      toast.error("Nome da categoria inválido!");
      return;
    }

    try {
      const api = setupApiClient();
      await api.post("/category", { name });
      toast.success("Categoria cadastrada com sucesso!");
      setName("");
    } catch (error) {
      toast.error("Erro ao cadastrar categoria");
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Adicionar Categoria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  return { props: {} };
});
