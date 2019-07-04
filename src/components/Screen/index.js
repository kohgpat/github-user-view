import React from "react";
import cn from "classnames";
import s from "./Screen.module.css";

const Screen = ({ children, landing }) => {
  if (landing) {
    return <div className={cn([s.screen, s.landing])}>{children}</div>;
  }

  return <div className={s.screen}>{children}</div>;
};

export default Screen;
