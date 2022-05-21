import styles from "./Store.module.css";

export default function Store({ name, link, description, coverImageSrc }) {
  return (
    <div className={styles.container}>
      <a href={link} target="_blank" rel="noreferrer">
        <img src={coverImageSrc} className={styles.image} />
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.description}>{description}</p>
      </a>
    </div>
  );
}
