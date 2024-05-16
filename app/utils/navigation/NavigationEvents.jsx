"use client";

import { useState, useEffect, useContext } from "react";
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

	const { recipesList, errorsReport } = useAppSelector(
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

	useEffect(() => {
		let ignore = false;

		async function createList() {
			const requestList = await getNewList(
				[],
				intolerancesSettings,
				allergiesSettings,
				50,
				100
			);
			if (requestList?.error) {
				reduxDispatch(
					setError({ name: "recipes", message: requestList["error"] })
				);
			}

			if (!ignore) {
				reduxDispatch(reInitializeRecipes(requestList["results"]));
			}
		}

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
			reduxDispatch(
				filterByAllergens({
					intolerances: intolerancesSettings,
					allergies: allergiesSettings
				})
			);
		}
	}, [intolerancesSettings, allergiesSettings, pathname]);

	useEffect(() => {
		if (navigator.onLine && errorsReport?.network) {
			reduxDispatch(setError({ name: "network", message: null }));
		}
	}, [pathname, searchParams]);

	return null;
}
