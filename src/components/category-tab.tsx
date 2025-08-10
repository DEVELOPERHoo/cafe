"use client";
import { MenuData } from "@/types";
import style from "./category-tab.module.css";
import { useState } from "react";
import Image from "next/image";

interface Props {
  data: MenuData[];
}
export default function CategoryTab(data: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sortedCategories = [...data.data].sort(
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
      <div className={style.menuList}>
        {selectedMenus.map((data, idx) => (
          <div key={idx}>
            <Image
              src={data.img}
              width={200}
              height={200}
              alt={`${data.nameKr}의 표지 이미지`}
            />
            <div className={style.title}>{data.nameKr}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
