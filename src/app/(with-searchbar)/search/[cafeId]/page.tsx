import SearchResultItem from "@/components/search-result-item";
import style from "./page.module.css";
import Searchbar from "@/components/searchbar";
import CategoryTab from "@/components/category-tab";
import { Suspense } from "react";

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
          <SearchResult
            cafeType={(await params).cafeId}
            keyword={(await searchParams).keyword || ""}
          />
        </Suspense>
      </div>
    </div>
  );
}
