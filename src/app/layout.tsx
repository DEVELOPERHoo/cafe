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
            <Link href={"/"}>☕ MOMASIL</Link>
          </header>
          <main>{children}</main>
          <footer>
            <div>제작 @경호, 승규</div>
            <div>틈나서 만들어봄</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
