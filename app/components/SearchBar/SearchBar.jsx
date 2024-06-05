"use client";

// import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { GoSearch } from "react-icons/go";

import styles from "./SearchBar.module.css";

export default function SearchBar({ value, position, handleChange }) {
	const { t } = useTranslation();
	// const inputRef = useRef(null);

	return (
		<div style={{ position: position }} className={styles["search-bar"]}>
			<GoSearch className={styles.inputIcon} />
			<input
				id="input-bar"
				type="text"
				// ref={inputRef}
				value={value}
				onChange={(event) => handleChange(event)}
				// onSubmit={() => {
				// 	console.log("submit");
				// 	return inputRef.current.blur();
				// }}

				className={styles["input-bar"]}
				placeholder={t("search_placeholder")}
			/>
		</div>
	);
}

// cambiare nome prop in entrata da onBlur a handleBlur
