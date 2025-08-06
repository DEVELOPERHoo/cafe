import { MenuData } from "@/types";
import CategoryTab from "@/components/category-tab";
import style from "./page.module.css";

async function MenuList({ cafeId }: { cafeId: string }) {
  const response = await fetch(`https://king-seungkyu.shop/menus/${cafeId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allMenus = await response.json();
  const sortedAllMenus = [...allMenus].sort(
    (a, b) => a.category.sortOrder - b.category.sortOrder
  );

  return (
    // <div className={style.tab}>
    //   {sortedAllMenus.map((data: MenuData, idx: number) => (
    //     <CategoryTab key={idx} {...data} />
    //   ))}
    // </div>
    <div>
      <CategoryTab data={sortedAllMenus} />
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className={style.container}>
      <MenuList cafeId={(await params).id} />
    </div>
  );
}
