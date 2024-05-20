"use client";

import { createContext, useReducer, useState, useEffect } from "react";

export const GeneralContext = createContext(null);
export const GeneralDispatchContext = createContext(null);

export default function GeneralProvider({ children }) {
	const [initialSettings, setInitialSettings] = useState({
		"title-animation": false,
		"saved-recipes": [],
		"recent-recipes": [],
		"complete-recipes": [],
		"tomato-settings": {
			"recipes-type": "seasonal",
			"allergens-list": [],
			"intolerances-list": []
		}
	});

	const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

	useEffect(() => {
		const localStorageSettings = window.localStorage.getItem("settings");

		if (localStorageSettings) {
			dispatch({
				type: "set_context"
			});
		} else {
			window.localStorage.setItem("settings", JSON.stringify(initialSettings));
		}
		// }
	}, [initialSettings]);

	function settingsReducer(state, action) {
		if (action.type === "set_context") {
			const settingsLocal = JSON.parse(window.localStorage.getItem("settings"));
			return {
				...state,
				["saved-recipes"]: settingsLocal["saved-recipes"],
				["recent-recipes"]: settingsLocal["recent-recipes"],
				["complete-recipes"]: settingsLocal["complete-recipes"],
				["tomato-settings"]: {
					...state["tomato-settings"],
					["allergens-list"]:
						settingsLocal["tomato-settings"]["allergens-list"],
					["intolerances-list"]:
						settingsLocal["tomato-settings"]["intolerances-list"]
				}
			};
		} else if (action.type === "add_recent") {
			if (
				state["recent-recipes"].find(
					(recipe) => String(recipe.id) === String(action.recipe.id)
				)
			) {
				return {
					...state
				};
			} else {
				localStorage.setItem(
					"settings",
					JSON.stringify({
						...state,
						"recent-recipes": [...state["recent-recipes"], action.recipe]
					})
				);
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
				localStorage.setItem(
					"settings",
					JSON.stringify({
						...state,
						["saved-recipes"]: [...state["saved-recipes"], action.recipe]
					})
				);
				return {
					...state,
					"saved-recipes": [...state["saved-recipes"], action.recipe]
				};
			}
		} else if (action.type === "rewrite") {
			localStorage.setItem(
				"settings",
				JSON.stringify({
					...state,
					"saved-recipes": action.list
				})
			);
			return {
				...state,
				"saved-recipes": action.list
			};
		} else if (action.type === "delete") {
			localStorage.setItem(
				"settings",
				JSON.stringify({
					...state,
					"saved-recipes": state["saved-recipes"].filter(
						(recipe) => recipe.id !== action.id
					)
				})
			);
			return {
				...state,
				"saved-recipes": state["saved-recipes"].filter(
					(recipe) => recipe.id !== action.id
				)
			};
		} else if (action.type === "clear") {
			localStorage.setItem(
				"settings",
				JSON.stringify({
					...state,
					"saved-recipes": []
				})
			);
			return {
				...state,
				"saved-recipes": []
			};
		} else if (action.type === "complete_recipe") {
			localStorage.setItem(
				"settings",
				JSON.stringify({
					...state,
					"complete-recipes": [...state["complete-recipes"], action.id]
				})
			);
			return {
				...state,
				"complete-recipes": [...state["complete-recipes"], action.id]
			};
		} else if (action.type === "reset_recipe") {
			localStorage.setItem(
				"settings",
				JSON.stringify({
					...state,
					"complete-recipes": state["complete-recipes"].filter(
						(elem) => String(elem) !== String(action.id)
					)
				})
			);
			return {
				...state,
				"complete-recipes": state["complete-recipes"].filter(
					(elem) => String(elem) !== String(action.id)
				)
			};
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
				localStorage.setItem(
					"settings",
					JSON.stringify({
						...state,
						"tomato-settings": {
							...state["tomato-settings"],
							"allergens-list": [
								...state["tomato-settings"]["allergens-list"],
								action.name
							]
						}
					})
				);
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
				localStorage.setItem(
					"settings",
					JSON.stringify({
						...state,
						"tomato-settings": {
							...state["tomato-settings"],
							"intolerances-list": [
								...state["tomato-settings"]["intolerances-list"],
								action.name
							]
						}
					})
				);
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
			localStorage.setItem(
				"settings",
				JSON.stringify({
					...state,
					"tomato-settings": {
						...state["tomato-settings"],
						"allergens-list": state["tomato-settings"]["allergens-list"].filter(
							(allergen) => {
								return allergen !== action.name;
							}
						)
					}
				})
			);
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
			localStorage.setItem(
				"settings",
				JSON.stringify({
					...state,
					"tomato-settings": {
						...state["tomato-settings"],
						"intolerances-list": state["tomato-settings"][
							"intolerances-list"
						].filter((allergen) => {
							return allergen !== action.name;
						})
					}
				})
			);
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
		} else if (action.type === "title_animated") {
			return { ...state, "title-animation": true };
		}
	}

	return (
		<GeneralContext.Provider value={settings}>
			<GeneralDispatchContext.Provider value={dispatch}>
				{children}
			</GeneralDispatchContext.Provider>
		</GeneralContext.Provider>
	);
}
