export interface CafeData {
  id: string;
  name: string;
  img: string;
}

export interface MenuData {
  id: string;
  cafeId: string;
  name: string;
  img: string;
}
