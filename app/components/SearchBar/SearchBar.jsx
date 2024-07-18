"use client";

import { useTranslation } from "react-i18next";
import { GoSearch } from "react-icons/go";

import styles from "./SearchBar.module.css";

export default function SearchBar({ value, position, handleChange }) {
	const { t } = useTranslation();

	return (
		<div style={{ position: position }} className={styles["search-bar"]}>
			<GoSearch className={styles["input-icon"]} />
			<input
				id="input-bar"
				type="text"
				value={value}
				onChange={(event) => handleChange(event)}
				className={styles["input-bar"]}
				placeholder={t("search_placeholder")}
			/>
		</div>
	);
}
