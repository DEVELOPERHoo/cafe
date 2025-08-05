import { MenuData } from "@/types";
import style from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

async function MenuList({ cafeId }: { cafeId: string }) {
  const response = await fetch(`https://king-seungkyu.shop/menus/${cafeId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allMenus = await response.json();
  console.log(allMenus);
  return (
    <></>
    // <div className={style.container}>
    //   {allMenus.map((menu: MenuData) => (
    //     <div className={style.menu_img_container} key={menu.id}>
    //       <Image
    //         src={menu.img}
    //         width={85}
    //         height={105}
    //         alt={`메뉴 ${menu.name}의 이미지`}
    //       />
    //       <div>
    //         <div>{menu.name}</div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <MenuList cafeId={(await params).id} />
    </div>
  );
}
