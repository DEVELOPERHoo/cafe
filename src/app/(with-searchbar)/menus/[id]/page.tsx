import CategoryTab from "@/components/category-tab";
import style from "./page.module.css";

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

  return (
    <div>
      <CategoryTab allMenus={allMenus} cafeId={cafeId} />
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
        <MenuList cafeId={(await params).id} />
      </div>
    </div>
  );
}
