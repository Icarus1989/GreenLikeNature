"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Fragment, useState, useRef, useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import RecipeSummary from "../RecipeSummary/RecipeSummary";

import styles from "./ArticlesSection.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { calcSingular } from "@/app/utils/strings/stringUtilities";

export default function ArticlesSection({
	recipes,
	name = "",
	nameTransl = "",
	varieties,
	searchBySeasonal,
	handleSubmit
}) {
	const nameStrg = name[name.length - 1] === "s" ? calcSingular(name) : name;

	const [idsList, setIdsList] = useState(calcRecipesIds(recipes));
	const btnRef = useRef(null);

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

	const [submitSeasonal, setSubmitSeasonal] = useState(false);

	useEffect(() => {
		let ignore = false;
		if (submitSeasonal === true && !ignore) {
			submitQuery();
		}

		async function submitQuery() {
			searchBySeasonal(nameStrg);
			await handleSubmit(null, nameStrg);
		}
		return () => {
			ignore = true;
			setSubmitSeasonal(false);
		};
	}, [submitSeasonal]);

	return (
		<div className={styles["articles-section"]}>
			{name ? (
				<>
					<h3 className={styles["section-title"]}>
						{t("variety_label_1")}{" "}
						<span className={styles["seasonal-name"]}>
							{nameTransl.length > 0 ? nameTransl : name}
						</span>{" "}
						{t("variety_label_2")}{" "}
						<span className={styles["seasonal-name"]}>{varieties[0]}</span>
					</h3>
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
									form="searchForm"
									type="submit"
									ref={btnRef}
									onClick={() => {
										setSubmitSeasonal(true);
									}}
									className={styles["rel-search-btn"]}
								>
									{/* Tradurre i18 ---> */}
									{/* HERE */}
									{t("find_recipes")}{" "}
									<span className={styles["seasonal-name"]}>
										{nameTransl.length > 0 ? nameTransl : name}
									</span>{" "}
									<GoSearch className={styles["search-icon"]} />
									<IoIosArrowForward className={styles["arrow-icon"]} />
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
