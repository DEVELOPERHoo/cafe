"use client";
import Link from "next/link";
import style from "./header.module.css";
import { useState } from "react";
import Cart from "./cart";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className={style.header}>
      <div>
        <Link href={"/"}>☕MOMASIL</Link>
      </div>
      <div className={style.cart} onClick={() => setCartOpen(!cartOpen)}>
        🛒
      </div>
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
