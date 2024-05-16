"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	recipesList: [],
	initialList: [],
	seasonalRecipes: [],
	ingrList: [],
	errorsReport: {}
};

const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {
		initializeList: (state, action) => {
			return { ...state, ingrList: action.payload };
		},
		initializeRecipes: (state, action) => {
			return {
				...state,
				recipesList: action.payload,
				initialList: action.payload
			};
		},
		initializeErrors: (state, action) => {
			return {
				...state,
				errorsReport: action.payload
			};
		},
		reInitializeRecipes: (state, action) => {
			const addsArr = action.payload;
			const totalRecipeList = state.recipesList.concat(addsArr);
			const totalInitialList = state.initialList.concat(addsArr);

			return {
				...state,
				recipesList: getUniqueElems(totalRecipeList),
				initialList: getUniqueElems(totalInitialList)
			};
		},
		initializeSeasonal: (state, action) => {
			return {
				...state,
				seasonalRecipes: action.payload
			};
		},
		addRecipe: (state, action) => {
			const checkRecipesList =
				state.recipesList.filter((recipe) => recipe.id === action.payload.id)
					.length > 0;
			const checkInitialList =
				state.initialList.filter((recipe) => recipe.id === action.payload.id)
					.length > 0;
			return {
				...state,
				recipesList: checkRecipesList
					? state.recipesList
					: getUniqueElems([...state.recipesList, action.payload]),
				initialList: checkInitialList
					? state.initialList
					: getUniqueElems([...state.initialList, action.payload])
			};
		},
		filterByAllergens: (state, action) => {
			const intolerancesArr = action.payload.intolerances;
			const allergiesArr = action.payload.allergies;

			const listWithIndic = state.initialList.map((recipe) => {
				const keys = Array.from(Object.keys(recipe));
				const intolList = [];
				for (let key of keys) {
					if (key.includes("Free")) {
						if (recipe[key] === true) {
							intolList.push(`${key.slice(0, -4)}`);
						}
					}
				}

				const ingrs = recipe.extendedIngredients.map((ingr) => ingr.name);

				return {
					...recipe,
					intolFree: intolList,
					ingredients: ingrs
				};
			});

			const filteredByIntol = listWithIndic.filter((recipe) => {
				if (intolerancesArr.length > 0) {
					const check = [];
					for (let intol of intolerancesArr) {
						if (recipe["intolFree"].includes(intol)) {
							check.push(intol);
						}
					}
					if (check.length === intolerancesArr.length) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			});

			const filterByAllergy = filteredByIntol.filter((recipe) => {
				const ingrs = recipe["ingredients"];
				if (allergiesArr.length > 0) {
					const danger = [];
					for (let ingr of ingrs) {
						for (let allergy of allergiesArr) {
							if (ingr.includes(allergy)) {
								danger.push(ingr);
							}
						}
					}
					if (danger.length > 0) {
						return false;
					} else {
						return true;
					}
				} else {
					return true;
				}
			});

			return {
				...state,
				recipesList: filterByAllergy
			};
		},
		setError: (state, action) => {
			return {
				...state,
				errorsReport: {
					...state.errorsReport,
					[action.payload.name]: action.payload.message
				}
			};
		}
	}
});

function getUniqueElems(arr) {
	const set = new Set();

	for (let item of arr) {
		set.add(item.id);
	}

	const list = Array.from(set).map((id) => {
		return { ...arr.filter((item) => String(item.id) === String(id))[0] };
	});
	return list;
}

export const {
	addRecipe,
	addSeasonalRecipes,
	initializeList,
	initializeRecipes,
	initializeSeasonal,
	initializeErrors,
	reInitializeRecipes,
	filterByAllergens,
	setError
} = recipesSlice.actions;

export default recipesSlice.reducer;
