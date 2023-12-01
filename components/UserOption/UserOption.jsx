"use client";

import styles from "./UserOption.module.css";

export default function UserOption({ children }) {
	return <section className={styles["user-option"]}>{children}</section>;
}
