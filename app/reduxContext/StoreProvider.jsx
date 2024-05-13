"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import {
	initializeList,
	initializeRecipes,
	initializeSeasonal,
	initializeErrors
} from "@/lib/features/recipes/recipesSlice";

export default function StoreProvider({
	recipes,
	list,
	seasonal,
	errors,
	children
}) {
	const storeRef = useRef();
	if (!storeRef.current) {
		storeRef.current = makeStore();
		storeRef.current.dispatch(initializeList(list));
		storeRef.current.dispatch(initializeRecipes(recipes));
		storeRef.current.dispatch(initializeSeasonal(seasonal));
		storeRef.current.dispatch(initializeErrors(errors));
	}
	return <Provider store={storeRef.current}>{children}</Provider>;
}
