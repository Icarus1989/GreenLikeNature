"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Fragment, useState, useRef } from "react";
import { useAppSelector } from "@/lib/hooks";
import RecipeSummary from "../RecipeSummary/RecipeSummary";

import styles from "./ArticlesSection.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { GoSearch } from "react-icons/go";

export default function ArticlesSection({
	recipes,
	name = "",
	varieties,
	searchByName
}) {
	const nameStrg =
		name[name.length - 1] === "s" ? name.slice(0, name.length - 1) : name;
	// console.log(name.length);
	// console.log(recipes);
	const [idsList, setIdsList] = useState(calcRecipesIds(recipes));
	const btnRef = useRef(null);

	const recipesIds = recipes.map((recipe) => recipe.id);
	const ingrsLists = recipes.map((recipe) => recipe.extendedIngredients);

	const { t } = useTranslation();

	const { recipesList } = useAppSelector((state) => state.recipes);

	function calcRecipesIds(data) {
		const filteredList = data.map((elem) => {
			return {
				[elem.id]: elem.extendedIngredients
			};
		});

		const filteredIds = filteredList.filter((recipeObj) => {
			const recipeIngrsArr = Object.values(recipeObj)[0];
			const recipeIngrsNames = recipeIngrsArr.map((ingr) => ingr.name);
			const includesList = recipeIngrsNames.filter((ingrName) => {
				return ingrName.includes(nameStrg);
			});
			if (includesList.length > 0) {
				return true;
			} else {
				return false;
			}
		});

		return filteredIds.map((obj) => Object.keys(obj)[0]);
	}

	const suggestedList = [];
	for (let recipe of recipes) {
		for (let id of idsList) {
			if (String(id) === String(recipe.id)) {
				suggestedList.push(recipe);
			}
		}
	}

	// console.log(suggestedList);

	return (
		<div className={styles["articles-section"]}>
			{name ? (
				<>
					<h3 className={styles["section-title"]}>
						{t("variety_label_1")}{" "}
						<span className={styles["seasonal-name"]}>{name}</span>{" "}
						{t("variety_label_2")}{" "}
						<span className={styles["seasonal-name"]}>{varieties[0]}</span>
					</h3>
					{/* qui if suggestedList > 0 ? _ : _ */}
					{suggestedList.length > 0 ? (
						<div className={styles["articles-container"]} dir="ltr">
							{suggestedList.map((recipe) => {
								const recipePresence =
									recipesList.filter(
										(elem) => String(recipe.id) === String(elem.id)
									).length > 0;
								return (
									<Fragment key={recipe.id}>
										<Link
											className={styles["recipe-link"]}
											href={`/search/${recipe.id}${
												recipePresence ? "/saved" : ""
											}`}
										>
											<RecipeSummary
												title={recipe.title}
												image={recipe.image}
												ingredients={recipe.extendedIngredients}
												rating={recipe.likes}
											/>
										</Link>
									</Fragment>
								);
							})}
						</div>
					) : (
						<Fragment key={name}>
							<div className={styles["articles-container"]} dir="ltr">
								<button
									form="search-form"
									type="submit"
									onClick={() => searchByName(btnRef.current, name)}
									className={styles["rel-search-btn"]}
									ref={btnRef}
								>
									Cerca ricette con:{" "}
									<span className={styles["seasonal-name"]}>{name}</span>{" "}
									<GoSearch />
								</button>
							</div>
						</Fragment>
					)}
				</>
			) : (
				<>
					<h3 className={styles["section-title"]}>
						<span className={styles["seasonal-name"]}>{t("label_recent")}</span>
					</h3>
					<div className={styles["articles-container"]} dir="ltr">
						{recipes.map((recipe) => {
							const recipePresence =
								recipesList.filter(
									(elem) => String(recipe.id) === String(elem.id)
								).length > 0;
							return (
								<Fragment key={recipe.id}>
									<Link
										className={styles["recipe-link"]}
										href={`/search/${recipe.id}${
											recipePresence ? "/saved" : ""
										}`}
									>
										<RecipeSummary
											title={recipe.title}
											image={recipe.image}
											ingredients={recipe.extendedIngredients}
											rating={recipe.likes}
										/>
									</Link>
								</Fragment>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
