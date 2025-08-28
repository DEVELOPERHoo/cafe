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
          <div className={style.item}>
            <p>아이스아메리카노</p>
            <button className={style.removeFromCartBtn}>✕</button>
          </div>
          <div className={style.item}>
            <p>카페라떼</p>
            <button className={style.removeFromCartBtn}>✕</button>
          </div>
          <div className={style.item}>
            <p>디카페인 아이스아메리카노</p>
            <button className={style.removeFromCartBtn}>✕</button>
          </div>
        </div>
        <button className={style.shareCart}>공유하기</button>
      </div>
    </>
  );
}
