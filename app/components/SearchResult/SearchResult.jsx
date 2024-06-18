"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import styles from "./SearchResult.module.css";
import fallbackImg from "@/public/tableNapkin.svg";

export default function SearchResult({ id, title, image, saved }) {
	const [urlError, setUrlError] = useState(false);
	return (
		<li className={styles["recipe"]} key={id}>
			<Link
				className={styles["recipe-link"]}
				href={`/search/${id}${saved ? "/saved" : ""}`}
			>
				<span className={styles["recipe-title"]}>
					{title.length > 50 ? `${title.slice(0, 51)}...` : title}
				</span>
				{/* <svg viewBox="0 0 20 10" className={styles["recipe-image-container"]}>
					<circle
						cx="18%"
						cy="50%"
						r="60%"
						fill="url(#myCircleGradient)"
						stroke="url(#myCircleGradient)"
					/>
					<defs>
						<linearGradient id="myCircleGradient">
							<stop offset="0%" stopColor="#0f8b0f" />
							<stop offset="80%" stopColor="#232323" />
						</linearGradient>
					</defs>
				</svg> */}
				<div className={styles["recipe-image-container"]}>
					<div className={styles["recipe-image-circle"]}>
						<Image
							className={styles["recipe-image"]}
							src={urlError ? fallbackImg : image}
							alt={`${title} image`}
							// style={{ overflow: "hidden" }}
							// width={312}
							// height={231}
							onError={() => {
								// console.error(event.target);
								return setUrlError(true);
							}}
							quality={100}
							fill
							sizes="100%"
							style={{
								objectFit: "cover"
							}}
						/>
					</div>
				</div>
			</Link>
		</li>
	);
}
