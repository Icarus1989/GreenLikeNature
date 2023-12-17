"use client";

import { useState } from "react";
import TomatoLeaf from "../TomatoLeaf/TomatoLeaf";
import styles from "./SavedRecipes.module.css";
import { GoX, GoBookmark } from "react-icons/go";

export default function SavedRecipes({ onClick }) {
	const [recipeList, setRecipeList] = useState([
		{ name: "recipe_1", id: "recipe_1" },
		{ name: "recipe_2", id: "recipe_2" },
		{ name: "recipe_3", id: "recipe_3" },
		{ name: "recipe_4", id: "recipe_4" },
		{ name: "recipe_5", id: "recipe_5" },
		{ name: "recipe_6", id: "recipe_6" },
		{ name: "recipe_7", id: "recipe_7" }
	]);

	function handleRemove(id) {
		const newList = recipeList.filter((recipe) => recipe.id !== id);
		setRecipeList(newList);
	}

	function handleClear() {
		return setRecipeList([]);
	}

	// // per eventuale spostamento ricette in su e giù:

	// function handleClick() {
	// 	const insertAt = 1;
	// 	// può essere ogni index
	// 	const nextArtists = [
	// 		// items prima del punto di inserimento
	// 		...artists.slice(0, insertAt),
	// 		// nuovo item
	// 		{ id: nextId++, name: name },
	// 		// Items dopo il punto di inserimento
	// 		...artists.slice(insertAt)
	// 	];
	// 	setArtists(nextArtists);
	// 	setName("");
	// }

	return (
		<div className={styles["saved-recipes-container"]} onClick={onClick}>
			<fieldset className={styles["saved-recipes-fieldset"]}>
				<legend className={styles["saved-recipes-legend"]}>
					<TomatoLeaf />
					{<GoBookmark className={styles["legend-svg"]} />}
				</legend>
				{recipeList.length > 0 ? (
					<>
						<p className={styles["description"]}>
							Gestisci le Ricette Salvate:
						</p>
						<ul className={styles["saved-recipes-list"]}>
							{/* <ul> */}
							{recipeList.map((recipe) => (
								<li id={recipe.id} key={recipe.name}>
									<div className={styles["recipe-img-container"]}></div>
									<span>
										{recipe.name === "recipe_1" ||
										recipe.name === "recipe_3" ||
										recipe.name === "recipe_4"
											? `${recipe.name} ${recipe.name}`
											: recipe.name}
									</span>
									<button
										onClick={() => {
											return handleRemove(recipe.id);
										}}
									>
										<GoX />
									</button>
								</li>
							))}
						</ul>
						<div className={styles["clear-list-container"]}>
							<button
								className={styles["clear-recipes-list"]}
								onClick={() => {
									// onClick();
									return handleClear();
								}}
							>
								<GoX /> Cancella Lista
							</button>
						</div>
					</>
				) : (
					<p className={styles["description"]}>
						Nessuna ricetta é stata ancora salvata.
						<br />
						<br />
						Cerca tra le ricette disponibili le tue preferite fino ad un massimo
						di 7.
					</p>
				)}
			</fieldset>
		</div>
	);
}
