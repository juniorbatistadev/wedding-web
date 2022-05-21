import React from "react";
import styles from "./CheckForm.module.css";

export default function CheckForm() {
  return (
    <div>
      <form className={styles.form}>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your email" />
        <input type="submit" value="Save as Checked" />
      </form>
    </div>
  );
}
