import styles from "./RapidLink.module.css";

export default function RapidLink({ title, icon }) {
	return (
		<button className={styles["rapid-link-container"]}>
			<div className={styles["rapid-link-circle"]}>{icon}</div>
			<h5 className={styles["rapid-link-title"]}>{title}</h5>
		</button>
	);
}
