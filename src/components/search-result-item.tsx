import { SearchResultMenuItem } from "@/types";
import Image from "next/image";
import style from "./search-result-item.module.css";

interface Props {
  items: SearchResultMenuItem[];
}
export default function SearchResultItem({ items }: Props) {
  return (
    <div className={style.menuList}>
      {items.map((data, idx) => (
        <div key={idx}>
          <Image
            src={data.img}
            width={200}
            height={200}
            alt={`${data.nameKr}의 표지 이미지`}
            style={{ objectFit: "contain" }}
          />
          <div className={style.title}>{data.nameKr}</div>
        </div>
      ))}
    </div>
  );
}
