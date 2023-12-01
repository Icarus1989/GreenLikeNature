import CarouselsContainer from "@/components/carouselContainer/CarouselsContainer";
import { getData, seasonalFrtAndVgt } from "./ServerComponent";
import newRecipes from "../spoonTempData/tempData.json";
import styles from "./page.module.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
	const now = new Date();
	const data = await getData();
	const seasonalData = await seasonalFrtAndVgt(data, now);

	// console.log(data);
	return (
		<main className={styles["main-element"]}>
			{/* {children} */}
			<CarouselsContainer data={seasonalData} recipes={newRecipes} />
			{/* <List /> */}
		</main>
	);
}
