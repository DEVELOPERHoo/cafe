import Link from "next/link";
import "./globals.css";
import style from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <div>
              <Link href={"/"}>☕ MOMASIL</Link>
            </div>
            <div className={style.cart}>🛒</div>
          </header>
          <main>{children}</main>
          <footer></footer>
        </div>
      </body>
    </html>
  );
}
