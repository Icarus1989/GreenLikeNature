"use client";

import { useState, useEffect, useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	reInitializeRecipes,
	// filterByAllergies,
	// filterByIntolerances,
	filterByAllergens
} from "@/lib/features/recipes/recipesSlice";

// import { getSpoonData } from "@/app/ServerComponent";

import {
	GeneralContext,
	GeneralDispatchContext
} from "@/app/generalContext/GeneralContext";

export function NavigationEvents({ getSpoonData }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// const []

	// const generalDispatch = useContext(GeneralDispatchContext);
	const settings = useContext(GeneralContext);

	const intolerancesSettings = settings["tomato-settings"]["intolerances-list"];
	const allergiesSettings = settings["tomato-settings"]["allergens-list"];

	const { recipesList } = useAppSelector((state) => state.recipes);
	const reduxDispatch = useAppDispatch();

	const startAllergiesFromLocalStorage = "";

	function elaborateList(list) {
		if (list.length > 0) {
			return list.length > 1 ? list.join(",") : list[0];
		} else {
			return "";
		}
	}

	function allergiesFilter(list, paramsArr) {
		const selectedList = list
			.map((recipe) => {
				const ingrs = recipe.extendedIngredients.map((ingr) => ingr.name);
				const checked = [];
				for (let ingr of ingrs) {
					for (let param of paramsArr) {
						if (ingr.includes(param)) {
							checked.push(param);
						}
					}
				}
				return {
					...recipe,
					allergyCheck: checked.length > 0
				};
			})
			.filter((elem) => elem.allergyCheck === false);
		return selectedList;
	}

	function intolerancesFilter(list, intolerancesArr) {
		// const checkedList = list.filter((recipe) => {
		// 	for (let intol of intolerancesArr) {
		// 		console.log("Intol -> " + intol);
		// 		if (recipe[`${intol}Free`] !== undefined) {
		// 			if (recipe[`${intol}Free`] === false) {
		// 				return false;
		// 			} else {
		// 				return true;
		// 			}
		// 		} else {
		// 			return true;
		// 		}
		// 	}
		// });
		// // return checkedList;

		// const filtered
		// for (let recipe of list) {
		// 	const checked = intolerancesArr.filter((intol) => {
		// 		return recipe[`${intol}Free`] === true;
		// 	});
		// }
		// const existFilter =

		const newList = [];

		for (let recipe of list) {
			for (let intol of intolerancesArr) {
				if (
					recipe[`${intol}Free`] !== undefined &&
					recipe[`${intol}Free`] === true
				) {
					newList.push(recipe);
				} else if (recipe[`${intol}Free`] === undefined) {
					// Temporaneo
					newList.push(recipe);
				}
				// Aggiungere in seguito ad eventuale nuova
				// integrazione recipes, o forse no
				// else if (recipe[`${intol}Free`] === undefined) {
				// 	const ingrList = recipe["extendedIngredients"].map(
				// 		(ingr) => ingr.name
				// 	);
				// 	console.log();
				// }
			}
		}
		return newList;
	}

	async function getNewList(inclList, intolList, allergList, num, offset) {
		const includes = elaborateList(inclList);
		const intolerances = elaborateList(intolList);
		const allergies = elaborateList(allergList);
		const data = await getSpoonData(
			includes,
			allergies,
			intolerances,
			num,
			offset
		);
		return data;
	}

	function getUniqueElem(arr) {
		const set = new Set();

		for (let item of arr) {
			set.add(item.id);
		}

		const list = Array.from(set).map((id) => {
			return { ...arr.filter((item) => String(item.id) === String(id))[0] };
		});
		return list;
	}

	const [lastPath, setLastPath] = useState("");

	// QUI ---->
	useEffect(() => {
		let ignore = false;

		console.log("UPDATE LIST EFFECT");

		async function createList() {
			const requestList = await getNewList(
				[],
				intolerancesSettings,
				allergiesSettings,
				50,
				100
			);

			if (!ignore) {
				// Attenzione Rerender
				reduxDispatch(reInitializeRecipes(requestList["results"]));
			}
		}

		// Riattivare per provare --->
		if (
			pathname !== "/profile" &&
			recipesList.length > 0 &&
			recipesList.length <= 80
		) {
			console.log("UPDATE FROM NAVIGATION...");
			createList();
		}

		return () => {
			ignore = true;
		};
	}, [pathname, lastPath]);

	useEffect(() => {
		if (pathname === "/profile") {
			console.log("FILTER EFFECT NAVIGATION");
			reduxDispatch(
				filterByAllergens({
					intolerances: intolerancesSettings,
					allergies: allergiesSettings
				})
			);
		}
	}, [intolerancesSettings, allergiesSettings, pathname]);

	useEffect(() => {
		const url =
			searchParams.length > 0 ? `${pathname}?${searchParams}` : `${pathname}`;

		console.log(pathname);
		// se diversi da start request - setting redux list -
		// - save localStorage

		return () => {
			// console.log("Saved on localStorage");
			// salvataggio localStorage qui
		};
	}, [pathname, searchParams]);

	return null;
}
