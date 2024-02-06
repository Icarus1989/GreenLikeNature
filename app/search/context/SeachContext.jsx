// da gestire qui:
// - ricette completate
// -- leggere da localStorage (global) per lista
// -- leggere da localStorage (id) per impostazione complete.confirm
// -- salvare su localStorage a completamento (id) su lista
// --

// Qui verrà scritto Context e export Provider

import { createContext, useReducer } from "react";

export const SearchContext = createContext();

function searchReducer(variable, action) {
	if (action.type === "change") {
	}
}

// export function SearchProvider({ children, data }) {
// 	const [completeRecipes, dispatch] = useReducer(searchReducer, ___);
// }
