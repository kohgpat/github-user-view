import React from "react";
import s from "./Subtitle.module.css";

const Subtitle = ({ children }) => <h4 className={s.subtitle}>{children}</h4>;

export default Subtitle;
