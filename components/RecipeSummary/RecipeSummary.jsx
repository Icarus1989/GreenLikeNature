"use client";

import React, { useState, useEffect } from "react";
import styles from "./RecipeSummary.module.css";
import { GoBookmark, GoThumbsup } from "react-icons/go";
import { firstRecipeData } from "@/spoonTempData/singleRecipeData";

export default function RecipeSummary({ title, image, ingredients, rating }) {
	return (
		<article
			onClick={() => console.log("Go to single recipe")}
			className={styles["summary-container"]}
		>
			<div className={styles["save-indicator-section"]}>
				<button
					className={styles["summary-save-btn"]}
					onClick={(event) => {
						event.stopPropagation();
						return console.log("save click.");
					}}
				>
					<GoBookmark />
				</button>
			</div>
			<div className={styles["summary-data-section"]}>
				<div className={styles["circular-image-section"]}>
					<img src={image} className={styles["summary-image"]} />
				</div>
				<div className={styles["summary-rating"]}>
					<GoThumbsup />
					{rating}
				</div>
				<div className={styles["secondary-text-section"]}>
					<p className={styles["summary-list-label"]}>Ingredienti:</p>
					<ul className={styles["summary-ingredients-list"]}>
						{ingredients.map((ingredient) => {
							return (
								<li key={ingredient.id} className={styles["list-ingredient"]}>
									{ingredient.name.length > 23
										? `${ingredient.name.slice(0, 22)}...`
										: ingredient.name}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className={styles["primary-text-section"]}>
				<h2 className={styles["summary-title"]}>
					{title.length > 28 ? `${title.slice(0, 27)}...` : title}
				</h2>
			</div>
		</article>
	);
}
