import type { CafeData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import style from "./cafe-item.module.css";
export default function CafeItem({ id, name, img, url }: CafeData) {
  return (
    <Link href={`/menus/${id}`} className={style.container}>
      <Image
        src={img}
        width={150}
        height={175}
        alt={`카페 ${name}의 표지 이미지`}
        style={{ objectFit: "contain" }}
      />
      <div>
        <div className={style.title}>{name}</div>
      </div>
    </Link>
  );
}
