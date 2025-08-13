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

  console.log(searchResultmenus);
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
      <div>
        <SearchResult
          cafeType={(await params).cafeId}
          keyword={(await searchParams).keyword}
        />
      </div>
    </div>
  );
}
