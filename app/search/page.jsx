"use client";

import { Fragment, useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./page.module.css";
import { TbWorldHeart } from "react-icons/tb";
// import { GrRestaurant } from "react-icons/gr";
import { LuClock12, LuChefHat } from "react-icons/lu";
import RapidLink from "@/components/RapidLink/RapidLink";

import GeneralLoading from "../loading";
import SearchLoading from "./loading";
import PreferencesLoading from "../profile/loading";

import RecipeSummary from "@/components/RecipeSummary/RecipeSummary";
// import { getData, seasonalFrtAndVgt } from "../ServerComponent";

import ArticlesSection from "@/components/ArticlesSection/ArticlesSection";
import recipes from "../../spoonTempData/tempData.json";

const recipesTemp = recipes.slice(0, 3);
// console.log(recipesTemp);main

export default function SearchPage() {
	// const [text, setText] = useState("hello");

	const [hide, setHide] = useState(false);
	const [recipesList, setRecipesList] = useState([]);

	const seasonalFrtAndVegFromContextOrRedux = ["Pears", "Peppers"];
	// const now = new Date();
	// const data = await getData();
	// const seasonalData = await seasonalFrtAndVgt(data, now);
	// const firstfrtAndVeg = recipes.filter((elem) => {
	// 	return elem === "oneFromSeasonalList";
	// });

	function handleFocus() {
		setHide(true);
	}

	function handleBlur() {
		if (recipesList.length === 0) {
			setHide(false);
		}
	}

	function handleChange(target) {
		console.log(target.value);
	}

	return (
		<main className={styles["container"]}>
			<div className={styles["search-part"]}>
				{/* <h2>Search Page</h2> */}
				<SearchBar
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
					position="static"
				/>
			</div>
			<div className={styles["results-part"]}>
				{/* <ArticlesSection recipes={recipes} /> */}
				{/* <div className={styles["articles-section"]}> */}
				{/* <h3 className={styles["section-title"]}>Suggerite di stagione</h3> */}
				{/* <ArticlesContainer recipes={recipes} /> */}
				{hide === false ? (
					seasonalFrtAndVegFromContextOrRedux.map((elem) => {
						return (
							<Fragment key={elem}>
								<ArticlesSection recipes={recipes} name={elem} />
							</Fragment>
						);
					})
				) : (
					<div></div>
				)}
				{/* <div className={styles["articles-container"]} dir="ltr">
						{recipes.map((recipe) => {
							const ingredients = [
								...recipe.usedIngredients,
								...recipe.missedIngredients
							];
							return (
								<Fragment key={recipe.id}>
									<RecipeSummary
										title={recipe.title}
										image={recipe.image}
										ingredients={ingredients}
										rating={recipe.likes}
									/>
								</Fragment>
							);
						})}
					</div> */}
				{/* </div> */}
				{/* <div className={styles["articles-section"]}>
					<h3 className={styles["section-title"]}>Meglio recensite</h3>
				</div> */}
			</div>
			{/* <PreferencesLoading /> */}
			{/* GeneralLoading Testing */}
		</main>
	);
}
