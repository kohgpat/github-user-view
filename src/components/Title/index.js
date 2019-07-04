import React from "react";
import s from "./Title.module.css";

const Title = ({ children }) => <h1 className={s.title}>{children}</h1>;

export default Title;
