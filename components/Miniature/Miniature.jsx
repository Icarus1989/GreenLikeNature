"use client";

// import React, { useState } from "react";
import styles from "./Miniature.module.css";

export default function Miniature({ imageUrl }) {
	return (
		<>
			<div className={styles.dinnerMiniature}>
				<img src={imageUrl} className={styles.miniatureImage} />
				<h5 className={styles.miniatureTitle}>Title</h5>
			</div>
		</>
	);
}
