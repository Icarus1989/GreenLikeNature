"use client";

import React, { useState, useEffect, forwardRef } from "react";
import styles from "./RecipeSummary.module.css";
import { firstRecipeData } from "@/spoonTempData/singleRecipeData";

const RecipeSummary = forwardRef(({ data }, ref) => {
	// console.log(data);
	const { title, image, readyInMinutes } = data;

	// console.log(title.split(/(?=[A-Z])/));

	// const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=0911606a226b458f98c843dad909f409`;
	// // console.log(url);

	// // console.log(title.split(" "));
	// const [data, setData] = useState([]);
	// useEffect(() => {
	// 	let ignore = false;

	// 	async function fetchData(data) {
	// 		try {
	// 			const response = await fetch(url);
	// 			const json = await response.json();
	// 			console.log(json);
	// 			if (!ignore) {
	// 				setData(json);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	fetchData(url);

	// 	return () => {
	// 		ignore = true;
	// 	};
	// }, []);

	return (
		<section className={styles.recipeSection}>
			<div className={styles.circleContainer}></div>
		</section>
	);

	// return (
	// 	<section className={styles.recipeSection} ref={ref}>
	// 		<div className={styles.textSection}>
	// 			<h4 className={styles.recipeTitle}>{title}</h4>
	// 			<p className={styles.recipeDetails}>
	// 				<span className={styles.recipeDifficult}>Pronto in</span>
	// 				<span className={styles.recipeTime}> {readyInMinutes} min.</span>
	// 			</p>
	// 		</div>
	// 		<div className={styles.recipeImageMask}></div>
	// 		<img
	// 			sizes="(max-width: 600px) 200px, 50vw"
	// 			className={styles.recipeImage}
	// 			src={image}
	// 		/>
	// 	</section>
	// );
});

export default RecipeSummary;
