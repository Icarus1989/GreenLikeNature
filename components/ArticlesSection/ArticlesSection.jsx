"use client";

import Link from "next/link";
import { Fragment } from "react";
import RecipeSummary from "../RecipeSummary/RecipeSummary";
import styles from "./ArticlesSection.module.css";

export default function ArticlesSection({ recipes, name }) {
	return (
		<div className={styles["articles-section"]}>
			<h3 className={styles["section-title"]}>
				Suggerite di stagione | {name}
			</h3>
			{/* <ArticlesContainer recipes={recipes} /> */}
			{/* {seasonalFrtAndVegFromContextOrRedux.map((elem) => {
						return <ArticlesContainer recipes={recipes} />;
					})} */}
			<div className={styles["articles-container"]} dir="ltr">
				{recipes.map((recipe) => {
					const ingredients = [
						...recipe.usedIngredients,
						...recipe.missedIngredients
					];
					return (
						<Fragment key={recipe.id}>
							<Link
								className={styles["recipe-link"]}
								href={`/search/${recipe.id}`}
							>
								<RecipeSummary
									title={recipe.title}
									image={recipe.image}
									ingredients={ingredients}
									rating={recipe.likes}
								/>
							</Link>
						</Fragment>
					);
				})}
			</div>
		</div>
	);
}
