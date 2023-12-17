"use client";

import styles from "./SearchBar.module.css";
import { GoSearch } from "react-icons/go";
import Miniature from "../Miniature/Miniature";

export default function SearchBar({ position, onFocus, onBlur, onChange }) {
	return (
		<div style={{ position: position }} className={styles["search-bar"]}>
			<GoSearch className={styles.inputIcon} />
			<input
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={(event) => onChange(event.target)}
				className={styles.inputBar}
				placeholder="Cerca ricetta..."
			/>
		</div>
	);
}
