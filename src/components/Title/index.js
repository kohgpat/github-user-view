import React from "react";
import cn from "classnames";
import s from "./Title.module.css";

const Title = ({ children, secondary, className }) => (
  <h1 className={cn([s.title, secondary ? s.secondary : null, className])}>
    {children}
  </h1>
);

export default Title;
