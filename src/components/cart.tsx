"use client";
import style from "./cart.module.css";

interface CartProps {
  open: boolean;
  onClose: () => void;
}

export default function Cart({ open, onClose }: CartProps) {
  return (
    <>
      {/* 사이드 Cart */}
      <div className={`${style.cart} ${open ? style.open : ""}`}>
        {/* 헤더 */}
        <div className={style.header}>
          <div className={style.title}>
            장바구니
            <span className={style.b_cnt}>
              <em>0</em>
            </span>
          </div>
          <button onClick={onClose} className={style.closeBtn}>
            ✕
          </button>
        </div>

        {/* 내용 */}
        <div className={style.content}>
          <p>상품 1</p>
          <p>상품 2</p>
          <p>상품 3</p>
        </div>
      </div>
    </>
  );
}
