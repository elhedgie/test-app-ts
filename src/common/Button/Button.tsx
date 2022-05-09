import React from "react";
import style from "./button.module.css";
function Button(props: {
  type: "submit" | "button";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
}) {
  return (
    <button onClick={props.onClick} type={props.type} className={style.button}>
      {props.children}
    </button>
  );
}

export default Button;
