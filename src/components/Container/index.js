import React from "react";
import cn from "classnames";
import s from "./Container.module.css";

const Container = ({ children, className }) => (
  <div className={cn(s.container, className)}>{children}</div>
);

export default Container;
