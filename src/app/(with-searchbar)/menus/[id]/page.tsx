import CategoryTab from "@/components/category-tab";
import style from "./page.module.css";
import { CafeData, MenuData } from "@/types";
import BannerImage from "@/components/banner-image";

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

  const allMenus: MenuData[] = await response.json();

  return (
    <div>
      <CategoryTab allMenus={allMenus} cafeId={cafeId} />
    </div>
  );
}

async function CafeBannerImage({ cafeId }: { cafeId: string }) {
  const response = await fetch(`${process.env.CAFE_API_SERVER_URL}/cafes`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allCafes: CafeData[] = await response.json();

  const cafeMap = new Map<string, CafeData>(
    allCafes.map((cafe) => [cafe.id, cafe])
  );
  const selectCafeData = cafeMap.get(cafeId);

  if (!selectCafeData) {
    return <div>해당 카페 데이터를 가져올 수 없습니다...</div>;
  }

  return (
    <>
      <BannerImage key={selectCafeData.id} {...selectCafeData} />
    </>
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
        <CafeBannerImage cafeId={(await params).id} />
        <MenuList cafeId={(await params).id} />
      </div>
    </div>
  );
}
