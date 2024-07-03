"use client";

import { IoIosClose } from "react-icons/io";
import styles from "./ErrorModal.module.css";

export default function ErrorModal({ errorsList, onClick }) {
	return (
		<div className={styles["container"]}>
			<div className={styles["modal-message"]}>
				<h2 className={styles["modal-title"]}>Ooops something wrong!</h2>
				{errorsList.length > 1 ? (
					<ul className={styles["errors-list"]}>
						{errorsList.map((err) => {
							return (
								<li key={err.from} className={"error-elem"}>
									<div className={styles["details-container"]}>
										<details className={styles["error-details"]}>
											<summary
												className={styles["error-summary"]}
											>{`Error in ${err.from}`}</summary>
											{err.message}
										</details>
									</div>
								</li>
							);
						})}
					</ul>
				) : (
					<div className={styles["details-container"]}>
						<details className={styles["error-details"]}>
							<summary
								className={styles["error-summary"]}
							>{`Error in ${errorsList[0].from} request`}</summary>
							{errorsList[0].message}
						</details>
					</div>
				)}
				<button className={styles["close-btn"]} onClick={onClick}>
					<IoIosClose className={styles["close-icon"]} />
				</button>
			</div>
		</div>
	);
}
