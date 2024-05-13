"use client";

import { motion } from "framer-motion";
import styles from "./ErrorComponent.module.css";

export default function ErrorComponent({ error, reset, value = "" }) {
	return (
		<div className={styles["error-module"]}>
			<div className={styles["container"]}>
				<div className={styles["modal-message"]}>
					<h2 className={styles["modal-title"]}>{`Ooops something wrong${
						value.length > 0 ? `in ${value} page` : ""
					}!`}</h2>
					<div className={styles["details-container"]}>
						<details className={styles["error-details"]}>
							<summary className={styles["error-summary"]}>{`Error loading ${
								value.length > 0 ? ` ${value} page` : "App"
							}`}</summary>
							{error.message}
						</details>
					</div>
					<button onClick={() => reset()} className={styles["reset-btn"]}>
						<motion.svg
							whileTap={{ rotate: 360 }}
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							className={styles["reset-icon"]}
						>
							<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
							<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
						</motion.svg>
					</button>
				</div>
			</div>
		</div>
	);
}
