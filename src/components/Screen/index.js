import React from "react";
import s from "./Screen.module.css";

const Screen = ({ children }) => <div className={s.screen}>{children}</div>;

export default Screen;
