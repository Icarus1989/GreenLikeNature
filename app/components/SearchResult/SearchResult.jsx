"use client";

import Link from "next/link";
import Image from "next/image";

import styles from "./SearchResult.module.css";

export default function SearchResult({ id, title, image, saved }) {
	return (
		<li className={styles["recipe"]} key={id}>
			<svg viewBox="0 0 20 10" className={styles["recipe-image-container"]}>
				<circle
					cx="18%"
					cy="50%"
					r="60%"
					fill="url(#myCircleGradient)"
					stroke="url(#myCircleGradient)"
				/>
				<defs>
					<linearGradient id="myCircleGradient">
						<stop offset="0%" stopColor="green" />
						<stop offset="70%" stopColor="#232323" />
					</linearGradient>
				</defs>
			</svg>
			<Image
				className={styles["recipe-image"]}
				src={image}
				alt={`${title} image`}
				style={{ overflow: "hidden" }}
				width={312}
				height={231}
			/>

			<Link
				className={styles["recipe-link"]}
				href={`/search/${id}${saved ? "/saved" : ""}`}
			>
				<span className={styles["recipe-title"]}>
					{title.length > 50 ? `${title.slice(0, 51)}...` : title}
				</span>
			</Link>
		</li>
	);
}
