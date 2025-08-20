import { CafeData } from "@/types";
import style from "./banner-image.module.css";

import Image from "next/image";
export default function BannerImage({ id, name, img, banner, url }: CafeData) {
  return (
    <div className={style.container}>
      <Image
        src={banner}
        width={1100}
        height={250}
        alt={`카페 ${name}의 배너 이미지`}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
