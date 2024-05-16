"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { FaArrowLeft } from "react-icons/fa";

export default function ErrorPageId({ error }) {
	console.log(error);
	return (
		<section>
			<div className={styles["container"]}>
				<div className={styles["modal-message"]}>
					<h2 className={styles["modal-title"]}>
						Ooops something wrong on Single Recipe!
					</h2>
					<div className={styles["details-container"]}>
						<details className={styles["error-details"]}>
							<summary
								className={styles["error-summary"]}
							>{`Error in Spoonacular data request`}</summary>
							{error}
						</details>
					</div>
					<button className={styles["undo-btn"]}>
						<Link href="/search">
							<FaArrowLeft className={styles["undo-icon"]} />
						</Link>
					</button>
				</div>
			</div>
		</section>
	);
}
