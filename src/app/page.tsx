import CafeItem from "@/components/cafe-item";
import type { CafeData } from "@/types";
import style from "./page.module.css";

async function AllCafes() {
  const response = await fetch("http://13.125.124.101:12040/cafes", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allCafes = await response.json();

  return (
    <div>
      {allCafes.map((cafe: CafeData) => (
        <CafeItem key={cafe.id} {...cafe} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <AllCafes />
      </section>
    </div>
  );
}
