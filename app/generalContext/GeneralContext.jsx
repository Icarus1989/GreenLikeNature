"use client";

import { createContext, useReducer } from "react";

export const GeneralContext = createContext(null);
export const GeneralDispatchContext = createContext(null);

export default function GeneralProvider({ children }) {
	const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

	return (
		<GeneralContext.Provider value={settings}>
			<GeneralDispatchContext.Provider value={dispatch}>
				{children}
			</GeneralDispatchContext.Provider>
		</GeneralContext.Provider>
	);
}

const initialSettings = {
	"seasonal-recipes": [], // <--- spostare Redux
	"saved-recipes": [], // <--- salvare con timestamp per filter
	"recent-recipes": [],
	"complete-recipes": [], // <--- da SingleRecipe, salvare solo ID
	"tomato-settings": {
		"recipes-type": "seasonal",
		"allergens-list": [],
		"intolerances-list": ["gluten"]
	}
};
// <--- arriverà da localStorage

function settingsReducer(state, action) {
	if (action.type === "add_recent") {
		if (
			state["recent-recipes"].find(
				(recipe) => String(recipe.id) === String(action.recipe.id)
			)
		) {
			return {
				...state
			};
		} else {
			return {
				...state,
				"recent-recipes": [...state["recent-recipes"], action.recipe]
			};
		}
	} else if (action.type === "save") {
		if (
			state["saved-recipes"].find(
				(recipe) => String(recipe.id) === String(action.recipe.id)
			)
		) {
			return {
				...state
			};
		} else {
			return {
				...state,
				"saved-recipes": [...state["saved-recipes"], action.recipe]
			};
		}
	} else if (action.type === "rewrite") {
		return {
			...state,
			"saved-recipes": action.list
		};
	} else if (action.type === "delete") {
		return {
			...state,
			"saved-recipes": state["saved-recipes"].filter(
				(recipe) => recipe.id !== action.id
			)
		};
	} else if (action.type === "clear") {
		return {
			...state,
			"saved-recipes": []
		};
	} else if (action.type === "complete_recipe") {
		return {
			...state,
			"complete-recipes": [...state["complete-recipes"], action.id]
		};
	} else if (action.type === "reset_recipe") {
		return {
			...state,
			"complete-recipes": state["complete-recipes"].filter(
				(elem) => String(elem) !== String(action.id)
			)
		};
		// } else if (action.type === "set_seasonal") {
	} else if (action.type === "select_type") {
		return {
			...state,
			"tomato-settings": {
				...state["tomato-settings"],
				"recipes-type": action.value
			}
		};
	} else if (action.type === "add_allergen") {
		if (
			state["tomato-settings"]["allergens-list"].find(
				(allergen) => String(allergen) === String(action.name)
			)
		) {
			return {
				...state
			};
		} else {
			return {
				...state,
				"tomato-settings": {
					...state["tomato-settings"],
					"allergens-list": [
						...state["tomato-settings"]["allergens-list"],
						action.name
					]
				}
			};
		}
	} else if (action.type === "add_intolerance") {
		if (
			state["tomato-settings"]["intolerances-list"].find(
				(allergen) => String(allergen) === String(action.name)
			)
		) {
			return {
				...state
			};
		} else {
			return {
				...state,
				"tomato-settings": {
					...state["tomato-settings"],
					"intolerances-list": [
						...state["tomato-settings"]["intolerances-list"],
						action.name
					]
				}
			};
		}
	} else if (action.type === "remove_allergen") {
		return {
			...state,
			"tomato-settings": {
				...state["tomato-settings"],
				"allergens-list": state["tomato-settings"]["allergens-list"].filter(
					(allergen) => {
						return allergen !== action.name;
					}
				)
			}
		};
	} else if (action.type === "remove_intolerance") {
		return {
			...state,
			"tomato-settings": {
				...state["tomato-settings"],
				"intolerances-list": state["tomato-settings"][
					"intolerances-list"
				].filter((allergen) => {
					return allergen !== action.name;
				})
			}
		};
	}
}
