"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import {
	initializeList,
	initializeRecipes
} from "@/lib/features/recipes/recipesSlice";

// Usare localStorage quando pronto per inizializzare
// lista allergeni

export default function StoreProvider({
	recipes,
	list,
	getSpoonData,
	children
}) {
	const storeRef = useRef();
	if (!storeRef.current) {
		storeRef.current = makeStore();
		console.log(storeRef.current.getState());
		storeRef.current.dispatch(initializeList(list));
		storeRef.current.dispatch(initializeRecipes(recipes));
		// Inizializzare così ? -->
		// storeRef.current.dispatch(initializeRecipes([]));
		// Svantaggi: lento - doppia richiesta forse per Strict mode
		// -
	}
	return <Provider store={storeRef.current}>{children}</Provider>;
}
