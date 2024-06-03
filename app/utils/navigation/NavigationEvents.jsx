"use client";

import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	reInitializeRecipes,
	filterByAllergens,
	setError
} from "@/lib/features/recipes/recipesSlice";

import { GeneralContext } from "@/app/generalContext/GeneralContext";

export function NavigationEvents({ getSpoonData }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const settings = useContext(GeneralContext);

	const intolerancesSettings = settings["tomato-settings"]["intolerances-list"];
	const allergiesSettings = settings["tomato-settings"]["allergens-list"];

	const { recipesList, initialList, errorsReport } = useAppSelector(
		(state) => state.recipes
	);
	const reduxDispatch = useAppDispatch();

	function elaborateList(list) {
		if (list.length > 0) {
			return list.length > 1 ? list.join(",") : list[0];
		} else {
			return "";
		}
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

	const [lastPath, setLastPath] = useState("");

	// async function createList() {
	// 	const requestList = await getNewList(
	// 		[],
	// 		intolerancesSettings,
	// 		allergiesSettings,
	// 		50,
	// 		100
	// 	);
	// 	if (requestList?.error) {
	// 		reduxDispatch(
	// 			setError({ name: "recipes", message: requestList["error"] })
	// 		);
	// 	} else {
	// 		reduxDispatch(reInitializeRecipes(requestList["results"]));
	// 	}
	// }

	// provare useCallback domani --->

	const createList = useCallback(async () => {
		const requestList = await getNewList(
			[],
			intolerancesSettings,
			allergiesSettings,
			30,
			80
		);
		if (requestList?.error) {
			reduxDispatch(
				setError({ name: "recipes", message: requestList["error"] })
			);
		} else {
			reduxDispatch(reInitializeRecipes(requestList["results"]));
		}
	}, [allergiesSettings, intolerancesSettings, getNewList]);

	useEffect(() => {
		let ignore = false;

		// async function createList() {
		// 	const requestList = await getNewList(
		// 		[],
		// 		intolerancesSettings,
		// 		allergiesSettings,
		// 		50,
		// 		100
		// 	);
		// 	if (requestList?.error) {
		// 		reduxDispatch(
		// 			setError({ name: "recipes", message: requestList["error"] })
		// 		);
		// 	}

		// 	if (!ignore) {
		// 		reduxDispatch(reInitializeRecipes(requestList["results"]));
		// 	}
		// }

		if (
			pathname !== "/profile" &&
			recipesList.length > 0 &&
			recipesList.length < 80 &&
			!ignore
		) {
			// console.log("UPDATE FROM NAVIGATION...");
			createList();
		}

		return () => {
			ignore = true;
		};
	}, [pathname, lastPath, recipesList.length, createList]);

	// rerender (spostare) -->
	// useEffect(() => {
	// 	// if (pathname === "/profile") {
	// 	// console.log("filtered");

	// 	reduxDispatch(
	// 		filterByAllergens({
	// 			intolerances: intolerancesSettings,
	// 			allergies: allergiesSettings
	// 		})
	// 	);
	// 	// }
	// }, [intolerancesSettings, allergiesSettings]);

	useEffect(() => {
		if (navigator.onLine && errorsReport?.network?.message !== null) {
			reduxDispatch(setError({ name: "network", message: null }));
		} else if (!navigator.onLine) {
			reduxDispatch(
				setError({ name: "network", message: "Check network connection." })
			);
		}
	}, [pathname, searchParams, errorsReport?.network?.message]);

	// console.log(recipesList);

	return null;
}
