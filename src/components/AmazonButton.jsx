import React from "react";
import amazonImage from "../assets/images/amazon.png";
import styles from "./AmazonButton.module.css";

export default function AmazonButton({ link }) {
  return (
    <a className={styles.button} href={link} target="_blank" rel="noreferrer">
      <img src={amazonImage.src} /> <span>Get On Amazon</span>
    </a>
  );
}
