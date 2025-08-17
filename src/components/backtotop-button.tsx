"use client";
import { useEffect, useState } from "react";
import style from "./backtotop-button.module.css";
export default function BacktotopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > 300);
    };
    onScroll();
    //{ passive: true }는 event?.preventDefault() 를 호출하지 않는다는 의미
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };
  return (
    <button
      type="button"
      aria-label="맨 위로 이동"
      className={`${style.backToTop} ${visible ? style.show : ""}`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}
