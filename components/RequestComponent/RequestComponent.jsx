"use client";

import { useState, useContext, useEffect } from "react";

import GeneralProvider from "@/app/generalContext/GeneralContext";
// import { NavigationEvents } from "./utils/navigation/NavigationEvents";

import StoreProvider from "@/app/reduxContext/StoreProvider";
import {
	GeneralContext,
	GeneralDispatchContext
} from "@/app/generalContext/GeneralContext";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	initializeList,
	initializeRecipes,
	reInitializeRecipes
} from "@/lib/features/recipes/recipesSlice";

export default function RequestComponent({ children, getSpoonData }) {
	const [recipes, setRecipes] = useState([]);

	const settings = useContext(GeneralContext);
	const intolerancesList = settings["tomato-settings"]["intolerances-list"];
	const allergiesList = settings["tomato-settings"]["allergens-list"];
	// Inizializzare e salvare in e da LocalStorage in GeneralContext

	const { recipesList } = useAppSelector((state) => state.recipes);
	const reduxDispatch = useAppDispatch();

	function elaborateList(list) {
		if (list.length > 0) {
			return list.length > 1 ? list.join(",") : list[0];
		} else {
			return "";
		}
	}

	async function getData(inclList, intolList, allergList, num, offset) {
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

	useEffect(() => {
		let ignore = false;
		// if (pathname === "/profile" && intolerancesSettings.length > 0) {
		console.log("FIRST REQUEST EFFECT");

		console.log(intolerancesList);

		async function createList() {
			const requestList = await getData(
				[],
				intolerancesList,
				allergiesList,
				100,
				0
			);

			console.log(requestList["results"]);
			// const totalList = [...list, ...requestList["results"]];
			// const completeList = getUniqueElem(totalList);

			if (!ignore) {
				// setNewList((prevList) => {
				// 	return (prevList = requestList["results"]);
				// });
				// Attenzione Rerender
				// setRecipes((prevList) => {
				// 	return (prevList = requestList["results"]);
				// });
				reduxDispatch(reInitializeRecipes(requestList["results"]));
			}
		}
		if (recipesList.length === 0) {
			createList();
		}
		return () => {
			ignore = true;
		};
	}, []);

	useEffect(() => {
		console.log("Testing rerendering");
	}, []);

	return <>{children}</>;
}
