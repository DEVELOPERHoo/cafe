import { create } from "zustand";

type CartItem = {
  id: string;
  nameKr: string;
  nameEn: string;
  img: string; // 이미지 경로 (URL 형식)
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void; // CartItem에서 quantity를 제외하고 받음
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((i) => i.id === item.id); // 장바구니에 id가 이미 있는지 체크
      if (exists) {
        return {
          // 이미 있다면 quantity + 1, 아니면 그냥 둠
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] }; // 새상품이면 quantity = 1로 추가
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id), // id가 같은 상품을 배열에서 제거
    })),
  clearCart: () => set({ cart: [] }), // 장바구니 초기화
}));
