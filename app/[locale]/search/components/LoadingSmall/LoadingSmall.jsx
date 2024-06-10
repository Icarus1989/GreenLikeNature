"use client";

import styles from "./LoadingSmall.module.css";

export default function LoadingSmall() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className={styles["spinner-svg"]}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
			<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
		</svg>
	);
}