"use client";
import { useEffect, useState } from "react";
import style from "./searchbar.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function Searchbar({ cafeId }: { cafeId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("keyword");

  // q값이 있으면 q사용 없으면 빈문자열 사용
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) {
      router.push(`/menus/${cafeId}`);
    } else {
      router.push(`/search/${cafeId}?keyword=${search}`);
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
        placeholder="🔍"
      />
    </div>
  );
}
