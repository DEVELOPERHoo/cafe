export interface CafeData {
  id: string;
  name: string;
  img: string;
  url: string;
}

export interface MenuData {
  category: {
    name: string;
    sortOrder: number;
  };
  menus: MenuItem[];
}

export interface MenuItem {
  nameKr: string;
  nameEn: string;
  sortOrder: number;
  img: string; // 이미지 경로 (URL 형식)
}
