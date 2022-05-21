import React from "react";
import linkImage from "../assets/images/link.png";
import styles from "./NormalButton.module.css";

export default function NormalButton({ link }) {
  return (
    <a className={styles.button} href={link} target="_blank" rel="noreferrer">
      <img src={linkImage.src} /> <span>Link</span>
    </a>
  );
}
