import Link from "next/link";
import styles from "./style.module.scss";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import logoImg from "../../../assets/logo.svg";

export function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={"/dashboard"}>
          <Image src={logoImg} alt="Logo do site Sujeiro Pizzaria" />
        </Link>
        <nav className={styles.menuNav}>
          <Link href={"/category"}>
            <p>Categoria</p>
          </Link>

          <Link href={"/product"}>
            <p>Cardapio</p>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
