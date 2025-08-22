import style from "./page.module.css";
import CategoryTab from "@/components/category-tab";
import { Suspense } from "react";
import { CafeData } from "@/types";
import BannerImage from "@/components/banner-image";

async function SearchResult({
  cafeType,
  keyword,
}: {
  cafeType: string;
  keyword?: string;
}) {
  const response = await fetch(
    `${process.env.CAFE_API_SERVER_URL}/menus/search/${cafeType}?keyword=${keyword}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const searchResultmenus = await response.json();

  return (
    <div>
      <CategoryTab allMenus={searchResultmenus} cafeId={cafeType} />
      {/* <SearchResultItem items={searchResultmenus} /> 재사용성을 위한 주석 */}
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
  searchParams,
}: {
  params: Promise<{ cafeId: string }>;
  searchParams: Promise<{ keyword?: string }>;
}) {
  return (
    <div>
      <div className={style.container}>
        {/* <Searchbar cafeId={(await params).cafeId} size="L" /> 재사용성을 위한 주석 */}
        <Suspense key={(await searchParams).keyword || ""} fallback="Loading">
          <CafeBannerImage cafeId={(await params).cafeId} />
          <SearchResult
            cafeType={(await params).cafeId}
            keyword={(await searchParams).keyword || ""}
          />
        </Suspense>
      </div>
    </div>
  );
}
