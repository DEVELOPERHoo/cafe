"use client";
import { useEffect, useState } from "react";
import style from "./searchbar.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function Searchbar({
  cafeId,
  size,
}: {
  cafeId: string;
  size: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  // q값이 있으면 q사용 없으면 빈문자열 사용
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (size == "S") {
      if (!search || q === search) return; // 검색어가 없거나 현재 페이지와 같은 검색어 일경우 리턴
      router.push(`/search/${cafeId}?keyword=${search}`);
    } else {
      if (!search || q === search) {
        router.push(`/menus/${cafeId}`);
      } else {
        router.push(`/search/${cafeId}?keyword=${search}`);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="키워드로 검색"
        style={{
          width: size === "S" ? "300px" : "1300px",
        }}
      />
    </div>
  );
}
