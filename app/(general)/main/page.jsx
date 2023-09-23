"use client";

import CarouselsContainer from "@/components/carouselContainer/CarouselsContainer";
import styles from "./page.module.css";

export default function Main() {
	return (
		<>
			<main className={styles.mainElement}>
				<CarouselsContainer />
			</main>
		</>
	);
}
