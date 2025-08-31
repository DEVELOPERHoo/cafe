// 카페 목록 타입
export interface CafeData {
  id: string;
  name: string;
  img: string;
  banner: string;
  url: string;
}

// 메뉴데이터 타입(카테고리, 메뉴리스트)
export interface MenuData {
  category: {
    name: string;
    sortOrder: number;
  };
  menus: MenuItem[];
}

// 메뉴 타입
export interface MenuItem {
  id: string;
  nameKr: string;
  nameEn: string;
  sortOrder: number;
  img: string; // 이미지 경로 (URL 형식)
}

export interface SearchResultMenuList {
  SearchResultMenuList: SearchResultMenuItem[];
}

export interface SearchResultMenuItem {
  cafeName: string;
  categoryName: string;
  nameKr: string;
  nameEn: string;
  img: string;
}
