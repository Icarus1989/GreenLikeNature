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
				setError({
					name: "recipes",
					message: `API Data not available -  ${requestList["error"]}`
				})
			);
			return;
		} else {
			reduxDispatch(reInitializeRecipes(requestList["results"]));
		}
	}, [allergiesSettings, intolerancesSettings]);

	useEffect(() => {
		let ignore = false;

		if (
			pathname !== "/profile" &&
			recipesList.length > 0 &&
			recipesList.length < 80 &&
			!ignore
		) {
			createList();
		}

		return () => {
			ignore = true;
		};
	}, [pathname, lastPath, recipesList.length, createList]);

	useEffect(() => {
		if (navigator.onLine && errorsReport?.network?.message !== null) {
			reduxDispatch(setError({ name: "network", message: null }));
		} else if (!navigator.onLine) {
			reduxDispatch(
				setError({ name: "network", message: "Check network connection." })
			);
		}
	}, [pathname, searchParams, errorsReport?.network?.message]);

	useEffect(() => {
		function resizeView() {
			if (pathname.length > 3) {
				return;
			} else if (pathname.length === 3) {
				console.log("reload");
				window.location.reload();
			}
		}
		window.addEventListener("resize", resizeView);

		return () => {
			window.removeEventListener("resize", resizeView);
		};
	}, [pathname]);

	return null;
}
