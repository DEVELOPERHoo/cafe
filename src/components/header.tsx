"use client";
import Link from "next/link";
import style from "./header.module.css";
import Cart from "./cart";
import { useCartUiStore } from "@/store/cartUiStore";

export default function Header() {
  const { open, toggleCart } = useCartUiStore();

  return (
    <>
      <header className={style.header}>
        <div>
          <Link href={"/"}>☕MOMASIL</Link>
        </div>
        <div className={style.cart} onClick={() => toggleCart(open)}>
          🛒
        </div>
        <Cart />
      </header>
    </>
  );
}
