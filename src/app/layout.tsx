import "./globals.css";
import style from "./layout.module.css";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <Header />
          <main>{children}</main>
          <footer></footer>
        </div>
      </body>
    </html>
  );
}
