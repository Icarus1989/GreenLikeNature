import MainPrimary from "@/components/MainPrimary/MainPrimary";
import { getData, seasonalFrtAndVgt, seasonalData } from "./ServerComponent";
import newRecipes from "../spoonTempData/tempData.json";
import testSeasonalList from "../spoonTempData/testingSeasonalList.json";
import styles from "./page.module.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const apiKey = process.env.APIKEYSPOONTWO;

export async function searchByQuery(text, allergens, intols) {
	"use server";
	const excludeIngredients =
		allergens.length > 0
			? `&excludeIngredients=${allergens
					.map((elem) => elem.toLowerCase())
					.join(",")}`
			: "";

	const intolerances =
		intols.length > 0
			? `&intolerances=${intols.map((elem) => elem.toLowerCase()).join(",")}`
			: "";

	// const url = `https://api.spoonacular.com/recipes/complexSearch?query=${text.toLowerCase()}&diet=vegetarian&fillIngredients=true${excludeIngredients}&number=50&instructionsRequired=true&addRecipeInformation=true&apiKey=${apiKey}`;
	const url = `https://api.spoonacular.com/recipes/complexSearch?query=${text.toLowerCase()}&diet=vegetarian${excludeIngredients}${intolerances}&number=50&apiKey=${apiKey}`;
	const res = await fetch(url);
	const json = await res.json();
	return json;
}

export default async function HomePage() {
	const now = new Date();

	// ATTENZIONE DETERMINARE seasonalList da lista completa
	// nel Redux Context

	return (
		<main className={styles["main-element"]}>
			<MainPrimary recipes={testSeasonalList} searchByQuery={searchByQuery} />
		</main>
	);
}
