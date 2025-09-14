"use client";
import { useCartStore } from "@/store/cartStore";
import style from "./cart.module.css";
import Image from "next/image";
import { useCartUiStore } from "@/store/cartUiStore";
import { useEffect, useState } from "react";
import { useStompClient } from "@/hooks/useStompClient";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();
  const { open, closeCart } = useCartUiStore();
  const { isConnected, connectStomp } = useStompClient();

  const handleShare = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CAFE_API_SERVER_URL}/carts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cafeId: "mmth", name: "" }),
        }
      );

      if (!response.ok) {
        alert("방 생성 중 오류 발생");
        return;
      }

      const cartId: string = await response.json();
      console.log("방생성 완료, cartId:", cartId);

      // 2. 소켓 연결 시도 (없으면)
      connectStomp(cartId);
    } catch (error) {
      console.error("🚨 공유하기 오류:", error);
    }
  };

  // cart의 모든 quantity의 합
  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0); // 초기값(initialValue)을 0으로 설정

  return (
    <>
      {/* 사이드 Cart */}
      <div className={`${style.cart} ${open ? style.open : ""}`}>
        {/* 헤더 */}
        <div className={style.header}>
          <div className={style.title}>
            장바구니
            <span className={style.b_cnt}>{totalQuantity}</span>
          </div>
          <button onClick={closeCart} className={style.closeBtn}>
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
                <div className={style.menuDetails}>
                  <div className={style.menuTitle}>{item.nameKr}</div>
                  <div className={style.quantityDetails}>
                    <button onClick={() => decreaseQuantity(item.id)}>–</button>
                    <div className={style.menuQuantity}>{item.quantity}</div>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
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
        <button className={style.shareCart} onClick={handleShare}>
          공유하기
        </button>
      </div>
    </>
  );
}
