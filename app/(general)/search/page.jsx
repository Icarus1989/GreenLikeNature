"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./page.module.css";

export default function SearchPage() {
	const [text, setText] = useState("hello");
	// Here
	return (
		<section className={styles["container"]}>
			<div className={styles["search-part"]}>
				{/* <h2>Search Page</h2> */}
				<SearchBar />
			</div>
			<div className={styles["results-part"]}></div>
		</section>
	);
}
