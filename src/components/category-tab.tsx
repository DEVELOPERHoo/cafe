"use client";
import { MenuData } from "@/types";
import style from "./category-tab.module.css";
import { useState } from "react";
import Image from "next/image";
import Searchbar from "./searchbar";
import BacktotopButton from "./backtotop-button";

interface Props {
  allMenus: MenuData[];
  cafeId: string;
}
//export default function CategoryTab({ data, cafeId }: Props) {
export default function CategoryTab({ allMenus, cafeId }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 추후 작업 예정
  if (!allMenus || allMenus.length === 0) {
    return <div>검색결과가 없습니다.</div>; // 그냥 완전 빈 화면
  }

  // flatMap 사용시 중첩 배열일때 데이터를 뽑아서 펼치기
  const mergedMenus = allMenus.flatMap((item) => item.menus);

  // sortOrder가 0인 전체 데이터 생성
  const allCategory: MenuData = {
    category: {
      name: "전체",
      sortOrder: 0,
    },
    menus: mergedMenus,
  };

  const withAllCategory = [allCategory, ...allMenus];

  const sortedCategories = [...withAllCategory].sort(
    (a, b) => a.category.sortOrder - b.category.sortOrder
  );

  const selectedMenus = [...sortedCategories[selectedIndex].menus].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <div>
      <div className={style.tab}>
        {sortedCategories.map((data, idx) => (
          <div
            //className={style.container}
            key={data.category.name}
            onClick={() => {
              setSelectedIndex(idx);
            }}
            className={
              selectedIndex == idx
                ? `${style.container} ${style.selected}`
                : style.container
            }
          >
            {data.category.name}
          </div>
        ))}
      </div>
      <div>
        <Searchbar cafeId={cafeId} />
      </div>
      <div className={style.menuList}>
        {selectedMenus.map((data, idx) => (
          <div key={idx}>
            <Image
              src={data.img}
              width={200}
              height={200}
              alt={`${data.nameKr}의 표지 이미지`}
              style={{ objectFit: "contain" }}
            />
            <div className={style.title}>{data.nameKr}</div>
          </div>
        ))}
      </div>
      <BacktotopButton />
    </div>
  );
}
