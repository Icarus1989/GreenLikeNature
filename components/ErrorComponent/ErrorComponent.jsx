"use client";

import { motion } from "framer-motion";
import styles from "./ErrorComponent.module.css";

export default function ErrorComponent({ error, reset }) {
	return (
		<div className={styles["error-module"]}>
			<h2>Something went wrong...</h2>
			<motion.button onClick={() => reset()} className={styles["reload-btn"]}>
				<motion.svg
					whileTap={{ rotate: 360 }}
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					className={styles["spinner-svg"]}
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
					<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
				</motion.svg>
			</motion.button>
		</div>
	);
}
