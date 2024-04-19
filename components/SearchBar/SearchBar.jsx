"use client";

import { useTranslation } from "react-i18next";
import { GoSearch } from "react-icons/go";

import styles from "./SearchBar.module.css";

export default function SearchBar({ value, position, onBlur, onChange }) {
	const { t } = useTranslation();

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
				placeholder={t("search_placeholder")}
			/>
		</div>
	);
}

// cambiare nome prop in entrata da onBlur a handleBlur
