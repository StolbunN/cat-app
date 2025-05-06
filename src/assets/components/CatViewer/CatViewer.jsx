import styles from "./CatViewer.module.css"

function CatViewer({url}) {
  return (
    <div className={styles["img-wrapper"]}>
      <img src={url} alt="" />
    </div>
  )
}

export default CatViewer;