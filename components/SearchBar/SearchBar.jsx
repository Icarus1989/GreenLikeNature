"use client";

import styles from "./SearchBar.module.css";
import { GoSearch } from "react-icons/go";
import Miniature from "../Miniature/Miniature";

export default function SearchBar() {
	return (
		<div className={styles["search-bar"]}>
			<GoSearch className={styles.inputIcon} />
			<input className={styles.inputBar} placeholder="Cerca ricetta..." />
		</div>
	);
}
