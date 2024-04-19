"use client";

import { createContext, useReducer, useState, useEffect } from "react";
import useLocalStorage from "../utils/hooks/useLocalStorage";

export const GeneralContext = createContext(null);
export const GeneralDispatchContext = createContext(null);

export default function GeneralProvider({ children }) {
	// const [dataFromLocal, setDataFromLocal] = useState(initialSettings);
	// if (!localStorage.getItem("settings")) {

	// Provare a leggere localStorage da redux --> importare...
	// redux useAppSelector e usare localStorage --> fare leggere
	// come initialValue del context qui

	// const [local, setLocal] = useState(initialSettings);
	// const value = localStorage.getItem("settings") || initialSettings;
	// let initialValue = initialSettings;
	// if (typeof window !== undefined) {
	// 	initialValue = JSON.parse(window.localStorage.getItem("settings"));
	// }
	// try {
	// 	initialValue = JSON.parse(window.localStorage.getItem("settings"));
	// } catch (error) {
	// 	console.log("error load localStorage");
	// 	console.log(error);
	// }

	console.log("local");
	// console.log(local);

	// const [localData, setLocalData] = useState(initialSettings);

	// const initialValue = JSON.parse(window.localStorage.getItem("settings"));
	const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

	// } else {
	// 	const [settings, dispatch] = useReducer(
	// 		settingsReducer,
	// 		localStorage.getItem("settings")
	// 	);
	// }

	// console.log(settings);

	// const [local, setLocal] = useLocalStorage(
	// 	"settings",
	// 	JSON.stringify(settings)
	// );
	// setLocal();
	// console.log(window.localStorage.getItem("settings"));

	useEffect(() => {
		// console.log("pre");
		// console.log(JSON.parse(localStorage.getItem("settings")));

		// if (!localStorage.getItem("settings")) {
		// 	console.log("Here");
		// 	setLocal(initialSettings);
		// 	// console.log(JSON.parse(localStorage.getItem("settings")));
		// } else {
		// 	console.log("Here 2");
		// setLocal(() => {
		// 	return JSON.parse(window.localStorage.getItem("settings"));
		// });
		console.log("LOcal");
		// console.log(window.localStorage.getItem("settings"));
		// localStorage.setItem("settings", JSON.stringify(local));
		// console.log(JSON.parse(localStorage.getItem("settings")));
		// }
		if (!window.localStorage.getItem("settings")) {
			window.localStorage.setItem("settings", JSON.stringify(settings));
			dispatch({
				type: "set_context",
				payload: initialSettings
			});
		} else {
			dispatch({
				type: "set_context",
				payload: JSON.parse(window.localStorage.getItem("settings"))
			});
		}
	}, []);

	// useEffect(() => {
	// 	// window.localStorage.setItem("settings", JSON.stringify(settings));
	// 	setLocalData(JSON.parse(window.localStorage.getItem("settings")));
	// }, [settings]);

	// useEffect(() => {
	// 	console.log("change");
	// 	// window.localStorage.setItem("settings", )
	// 	setLocalData(settings);
	// }, [settings]);

	// useEffect(() => {
	// 	window.localStorage.setItem("settings", JSON.stringify(localData));
	// }, [localData]);

	// useEffect(() => {
	// 	console.log(JSON.parse(localStorage.getItem("settings")));
	// }, [settings]);

	// console.log(localData);

	function settingsReducer(state, action) {
		if (action.type === "set_context") {
			return {
				...action.payload
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
				// -->
				// creare array saved base con empty objs
				// se array < 8 inserire empty obj -> in delete
				// se array > 8 levare ultimo

				// visualizzare nella lista saved solo se non empty

				// const newSaved = state["saved-recipes"].length
				localStorage.setItem(
					"settings",
					JSON.stringify({
						...state,
						"saved-recipes": [...state["saved-recipes"], action.recipe]
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
			// } else if (action.type === "set_seasonal") {
		} else if (action.type === "select_type") {
			localStorage.setItem(
				"settings",
				JSON.stringify({
					...state,
					"tomato-settings": {
						...state["tomato-settings"],
						"recipes-type": action.value
					}
				})
			);
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
		}
	}

	return (
		<GeneralContext.Provider value={settings}>
			<GeneralDispatchContext.Provider
				value={dispatch}
				// onLoad={() =>

				// }
			>
				{children}
			</GeneralDispatchContext.Provider>
		</GeneralContext.Provider>
	);
}

// const initialValue = localStorage.getItem("settings")
// 	? localStorage.getItem("settings")
// 	: initialSettings;

const emptyIndications = [
	"Cerca una ricetta...",
	"Search for a recipe...",
	"Nach einem Rezept suchen...",
	"Zoek een recept...",
	"Rechercher une recette...",
	"Busca una receta...",
	"Procure uma receita...",
	"Sök efter ett recept..."
];

const emptySavedList = [...new Array(8)].map((elem, index) => {
	return {
		id: emptyIndications[index].length + index,
		title: emptyIndications[index],
		image: altImage,
		readyInMinutes: 0,
		extendedIngredients: [].length,
		likes: 0
	};
});

const initialSettings = {
	"seasonal-recipes": [], // <--- spostare Redux
	"saved-recipes": [...emptySavedList], // <--- salvare con timestamp per filter
	"recent-recipes": [],
	"complete-recipes": [], // <--- da SingleRecipe, salvare solo ID
	"tomato-settings": {
		"recipes-type": "seasonal",
		"allergens-list": [],
		"intolerances-list": []
	}
};
// <--- arriverà da localStorage

// const [saved, setSaved] = useState(
// 		[...new Array(8)].map((elem, index) => {
// 			return savedRecipes[index] !== undefined
// 				? savedRecipes[index]
// 				: {
// 						id: emptyIndications[index],
// 						title: emptyIndications[index],
// 						image: altImage,
// 						readyInMinutes: 0,
// 						extendedIngredients: [].length,
// 						likes: 0
// 				  };
// 		})
// 	);
