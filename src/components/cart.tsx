"use client";
import { useCartStore } from "@/store/cartStore";
import style from "./cart.module.css";
import Image from "next/image";

interface CartProps {
  open: boolean;
  onClose: () => void;
}

export default function Cart({ open, onClose }: CartProps) {
  const { cart, removeFromCart, clearCart } = useCartStore();

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
        <div className={style.cBtnContainer}>
          <button className={style.clearBtn} onClick={clearCart}>
            초기화
          </button>
        </div>
        {/* 내용 */}
        <div className={style.content}>
          {cart.length === 0 ? (
            <div className={style.emptyCart}>
              <div>장바구니에 담은 상품이 없습니다.</div>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={style.cartItem}>
                <Image
                  src={item.img}
                  width={80}
                  height={80}
                  alt={`${item.nameKr}의 표지 이미지`}
                  style={{ objectFit: "contain" }}
                  className={style.cartImage}
                />
                <div className={style.cartTitle}>{item.nameKr}</div>
                <button
                  className={style.removeFromCartBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
        <button className={style.shareCart}>공유하기</button>
      </div>
    </>
  );
}
