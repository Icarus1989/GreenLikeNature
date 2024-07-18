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
				<div className={styles["recipe-image-container"]}>
					<div className={styles["recipe-image-circle"]}>
						<Image
							className={styles["recipe-image"]}
							src={urlError ? fallbackImg : image}
							alt={`${title} image`}
							onError={() => {
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
