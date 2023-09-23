"use client";

import React, { useState, useEffect, useRef, Fragment } from "react";
import styles from "./CarouselContainer.module.css";
import { GoSearch, GoDotFill } from "react-icons/go";

import Miniature from "../Miniature/Miniature";
import RecipeSummary from "../RecipeSummary/RecipeSummary";
// import Navbar from "../Navbar/Navbar";
import { firstRecipeData } from "../../spoonTempData/singleRecipeData";
import { secondRecipeData } from "../../spoonTempData/secondRecipeData";
import { thirdRecipeData } from "../../spoonTempData/thirdRecipeData";

export default function CarouselsContainer() {
	const dataImages = [
		"https://spoonacular.com/recipeImages/637187-556x370.jpg",
		"https://spoonacular.com/recipeImages/715551-556x370.jpg",
		"https://spoonacular.com/recipeImages/775585-556x370.jpg",
		"https://spoonacular.com/recipeImages/716426-556x370.jpg",
		"https://spoonacular.com/recipeImages/715381-556x370.jpg"
	];

	const [isActive, setIsActive] = useState(0);

	// const id = recipe.id;
	// const url = `https://api.spoonacular.com/recipes/${id}/information`;

	// const url =
	// 	"https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&number=30&sort=popularity&apiKey=0911606a226b458f98c843dad909f409";

	// const [data, setData] = useState([]);
	// useEffect(() => {
	// 	let ignore = false;

	// 	async function fetchData(url) {
	// 		try {
	// 			const response = await fetch(url);
	// 			const json = await response.json();
	// 			console.log(json);
	// 			if (!ignore) {
	// 				setData(json["results"]);
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

	const recipeRef = useRef(null);

	const dataArray = [firstRecipeData, secondRecipeData, thirdRecipeData];

	const recipesSumm = dataArray.map((data, index) => {
		return (
			<RecipeSummary
				key={index}
				data={data}
				ref={(node) => {
					const map = getMap();
					if (node) {
						map.set(index, node);
					} else {
						map.delete(index);
					}
				}}
			/>
		);
	});

	function scrollToId(target, id) {
		if (target.closest("button")) {
			setIsActive(id);
			const mapObj = getMap();
			const node = mapObj.get(id);
			node.scrollIntoView({
				behaviour: "smooth",
				block: "nearest"
			});
		}
	}

	function getMap() {
		if (!recipeRef.current) {
			recipeRef.current = new Map();
		}
		return recipeRef.current;
	}

	function handleScroll(event) {
		const goTo = (
			100 /
			(event.currentTarget.scrollWidth / event.currentTarget.scrollLeft) /
			(1 / recipesSumm.length) /
			100
		).toFixed(1);

		if (goTo >= 0 && goTo < 0.2) {
			setIsActive(0);
		} else if (goTo > 0.2 && goTo <= 1) {
			setIsActive(1);
		} else if (goTo > 1 && goTo < 2) {
			setIsActive(2);
		}
	}

	return (
		<>
			<section className={styles["container"]}>
				<div className={styles.logoSection}></div>
				<div className={styles["search-bar"]}>
					<GoSearch className={styles.inputIcon} />
					<input className={styles.inputBar} placeholder="Cerca ricetta..." />
				</div>
				<div className={styles["carousel-container"]}>
					<div
						onScroll={handleScroll}
						className={styles.dailyCarousel}
						dir="ltr"
					>
						{/* {recipesSumm}
					<div className={styles.dotsContainer}>
						{recipesSumm.map((elem, index) => {
							const activeElem = isActive === index;
							return (
								<Fragment key={index}>
									<button
										className={styles.dotBtn}
										onClick={(event) => scrollToId(event.target, index)}
									>
										<GoDotFill
											className={
												activeElem
													? `${styles.dot} ${styles.dotActive}`
													: `${styles.dot}`
											}
										/>
									</button>
								</Fragment>
							);
						})} */}
						{/* </div> */}
						<div className={styles.circularContainer}></div>
					</div>
				</div>

				<div className={styles.favoriteCarousel}>
					{/* localStorage Access */}
					<h4 className={styles.carouselTitle}>Saved Recipes</h4>
					<Miniature imageUrl={dataImages[0]} />
					<Miniature imageUrl={dataImages[1]} />
					<Miniature imageUrl={dataImages[2]} />
					<Miniature imageUrl={dataImages[3]} />
					<Miniature imageUrl={dataImages[4]} />
				</div>
				{/* <Navbar /> */}
			</section>
		</>
	);
}
