import React from "react";
import s from "./Label.module.css";

const Label = ({ children }) => <div className={s.label}>{children}</div>;

export default Label;
