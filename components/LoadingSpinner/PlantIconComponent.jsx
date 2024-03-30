import styles from "./LoadingSpinner.module.css";

export default function PlantIconComponent() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={styles["plant-icon"]}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				stroke="rgba(230, 230, 230, 0.9)"
				strokeWidth="1px"
				className={styles["leaf-path"]}
				d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3"
			/>
			<path
				stroke="rgba(230, 230, 230, 0.9)"
				strokeWidth="1px"
				className={styles["leaf-path"]}
				d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3"
			/>
			<path
				stroke="rgba(230, 230, 230, 0.9)"
				strokeWidth="1px"
				className={styles["leaf-path"]}
				d="M12 20l0 -10"
			/>
		</svg>
	);
}

// clean
