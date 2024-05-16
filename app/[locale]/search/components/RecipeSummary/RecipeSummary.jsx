"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./RecipeSummary.module.css";
import fallbackImg from "@/public/tableNapkin.svg";

export default function RecipeSummary({
	title,
	image,
	fallback = fallbackImg
}) {
	const [loadError, setLoadError] = useState(false);

	useEffect(() => {
		if (!navigator.onLine) {
			setLoadError(() => {
				return true;
			});
		}
	}, []);

	return (
		<article className={styles["summary-container"]}>
			<h2 className={styles["summary-title"]}>
				{title.length > 42 ? `${title.slice(0, 40)}...` : title}
			</h2>
			<div className={styles["circular-image-section"]}>
				<Image
					src={loadError ? fallback : image}
					className={styles["summary-image"]}
					alt={`${title} image`}
					width="556"
					height="370"
					onError={() => {
						return setLoadError(() => {
							return true;
						});
					}}
				/>
				<svg viewBox="0 0 20 10" className={styles["recipe-image-container"]}>
					<circle
						cx="18%"
						cy="50%"
						r="60%"
						fill="url(#myGradient)"
						stroke="url(#myGradient)"
					/>
					<defs>
						<linearGradient id="myGradient" gradientTransform="rotate(0)">
							<stop offset="3%" stopColor="#0b6d0be1" />
							<stop offset="50%" stopColor="#014201" />
							<stop offset="80%" stopColor="#012301" />
						</linearGradient>
					</defs>
				</svg>
			</div>
		</article>
	);
}
