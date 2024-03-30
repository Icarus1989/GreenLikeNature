"use client";

import styles from "./SearchBar.module.css";
import { GoSearch } from "react-icons/go";
import Miniature from "../Miniature/Miniature";

export default function SearchBar({ value, position, onBlur, onChange }) {
	return (
		<div style={{ position: position }} className={styles["search-bar"]}>
			<GoSearch className={styles.inputIcon} />
			<input
				id="input-bar"
				type="text"
				value={value}
				onBlur={onBlur}
				onChange={(event) => onChange(event)}
				className={styles["input-bar"]}
				placeholder="Cerca una ricetta..."
			/>
		</div>
	);
}

// cambiare nome prop in entrata da onBlur a handleBlur
