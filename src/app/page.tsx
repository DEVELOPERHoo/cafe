import CafeItem from "@/components/cafe-item";
import type { CafeData } from "@/types";
import style from "./page.module.css";

async function AllCafes() {
  const response = await fetch(`${process.env.CAFE_API_SERVER_URL}/cafes`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allCafes = await response.json();

  return (
    <>
      {allCafes.map((cafe: CafeData) => (
        <CafeItem key={cafe.id} {...cafe} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <AllCafes />
    </div>
  );
}
