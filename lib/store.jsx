import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./features/recipes/recipesSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			recipes: recipesReducer
		}
	});
};
