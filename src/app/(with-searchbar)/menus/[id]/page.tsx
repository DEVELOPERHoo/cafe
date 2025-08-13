import { MenuData } from "@/types";
import CategoryTab from "@/components/category-tab";
import style from "./page.module.css";
import Searchbar from "@/components/searchbar";

async function MenuList({ cafeId }: { cafeId: string }) {
  const response = await fetch(
    `${process.env.CAFE_API_SERVER_URL}/menus/${cafeId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allMenus = await response.json();
  const sortedAllMenus = [...allMenus].sort(
    (a, b) => a.category.sortOrder - b.category.sortOrder
  );

  return (
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
    <div>
      <div className={style.container}>
        <Searchbar cafeId={(await params).id} />
        <MenuList cafeId={(await params).id} />
      </div>
    </div>
  );
}
