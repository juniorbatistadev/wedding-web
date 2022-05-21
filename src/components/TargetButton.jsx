import React from "react";
import targetImage from "../assets/images/target.png";
import styles from "./TargetButton.module.css";

export default function TargetButton({ link }) {
  return (
    <a className={styles.button} href={link} target="_blank">
      <img src={targetImage.src} /> <span>Get On Target</span>
    </a>
  );
}
