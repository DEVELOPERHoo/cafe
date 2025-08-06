import { MenuData } from "@/types";
import style from "./category-tab.module.css";

export default function CategoryTab(data: MenuData) {
  console.log();
  return (
    <li className={style.container}>
      <div
        key={data.category.name}
        //onClick={() => setSelectedIndex(idx)}
        style={{
          padding: "8px 16px",
          //borderBottom: selectedIndex === idx ? "2px solid black" : "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        {data.category.name}
      </div>
    </li>
  );
}
