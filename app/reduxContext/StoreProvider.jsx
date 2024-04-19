"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import {
	initializeList,
	initializeRecipes,
	initializeSeasonal
} from "@/lib/features/recipes/recipesSlice";

// Usare localStorage quando pronto per inizializzare
// lista allergeni

export default function StoreProvider({ recipes, list, seasonal, children }) {
	// console.log(seasonal);
	// const baseData = {
	// 	"seasonal-recipes": [], // <--- spostare Redux
	// 	"saved-recipes": [], // <--- salvare con timestamp per filter
	// 	"recent-recipes": [],
	// 	"complete-recipes": [], // <--- da SingleRecipe, salvare solo ID
	// 	"tomato-settings": {
	// 		"recipes-type": "seasonal",
	// 		"allergens-list": ["apple"],
	// 		"intolerances-list": ["gluten"]
	// 	}
	// };
	// const initialData = window.localStorage.getItem("settings")
	// 	? JSON.parse(window.localStorage.getItem("settings"))
	// 	: baseData;
	const storeRef = useRef();
	if (!storeRef.current) {
		storeRef.current = makeStore();
		// console.log(recipes);
		storeRef.current.dispatch(initializeList(list));
		storeRef.current.dispatch(initializeRecipes(recipes));
		storeRef.current.dispatch(initializeSeasonal(seasonal));
		// storeRef.current.dispatch(initializeLocal(initialData));
		// Inizializzare così ? -->
		// storeRef.current.dispatch(initializeRecipes([]));
		// Svantaggi: lento - doppia richiesta forse per Strict mode
		// -
	}
	return <Provider store={storeRef.current}>{children}</Provider>;
}
