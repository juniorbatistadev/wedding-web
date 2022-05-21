import styles from "./Product.module.css";
import ImageGallery from "react-image-gallery";
import AmazonButton from "./AmazonButton";
import TargetButton from "./TargetButton";
import NormalButton from "./NormalButton";
import Swal from "sweetalert2";
import MySwal from "./Swal";
import CheckForm from "./CheckForm";

export default function Product({ data }) {
  const {
    name,
    description,
    images,
    amazonLink,
    amazonLink2,
    targetLink,
    targetLink2,
    otherLink,
    otherLink2,
    row,
    checked,
  } = data;

  const formartImages = (images) => {
    const data = images?.split(",");
    return data
      ? data.map((src) => {
          return {
            originalWidth: 200,
            originalHeight: 200,
            original: src,
          };
        })
      : [];
  };

  const handleClick = async () => {
    const { value: formValues } = await MySwal.fire({
      title: <p>Mark &quot;`{name}&quot;` as bought.</p>,
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Your name" type="text">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Your email" type="email">',
      focusConfirm: false,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Save As Checked",
      confirmButtonColor: "#571F31",
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      //validate data
      if (!formValues[0] || !/\S+@\S+\.\S+/.test(formValues[1])) {
        Swal.fire({
          icon: "error",
          html: "Please enter a valid email and name",
        });

        return;
      }

      await fetch(
        `/api/hello?name=${formValues[0]}&email=${formValues[1]}&row=${row}`
      ).then(() =>
        Swal.fire({
          icon: "success",
          html: "Checked",
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSlider}>
        <ImageGallery
          items={formartImages(images)}
          showPlayButton={false}
          // autoPlay={true}
          showBullets={true}
          showFullscreenButton={false}
        />
      </div>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.optionsText}>Options We Like:</p>
      <div className={styles.buttons}>
        {amazonLink && <AmazonButton link={amazonLink} />}
        {amazonLink2 && <AmazonButton link={amazonLink2} />}
        {targetLink && <TargetButton link={targetLink} />}
        {targetLink2 && <TargetButton link={targetLink2} />}
        {otherLink && <NormalButton link={otherLink} />}
        {otherLink2 && <NormalButton link={otherLink2} />}
      </div>
      <button
        style={{
          backgroundColor: checked === "YES" ? "gray" : "var(--accent-color)",
          cursor: checked === "YES" ? "normal" : "pointer",
        }}
        className={styles.button}
        onClick={handleClick}
        disabled={checked === "YES"}
      >
        {checked === "YES" ? "Already Bought" : "Check As Bought"}
      </button>
    </div>
  );
}
