export const calcSeasonalListIDs = (listObjs, data) => {
	const listNames = Array.from(Object.keys(listObjs));
	const list = new Set();
	for (let name of listNames) {
		const ids = calcRecipesIds(data, name);
		for (let idElem of ids) {
			list.add(idElem);
		}
	}
	return takeEightSeasonal(Array.from(list));
};

function takeEightSeasonal(list) {
	const arrLength = 8;
	const minIndex = Math.floor(Math.random() * list.length - 1);
	const maxIndex =
		minIndex + arrLength > list.length - 1
			? arrLength - (list.length - 1 - minIndex)
			: minIndex + arrLength;
	return list.slice(minIndex, maxIndex);
}

function calcRecipesIds(data, name) {
	const filteredList = data.map((elem) => {
		return {
			[elem.id]: elem.extendedIngredients
		};
	});

	const cleanName = name[name.length - 1] === "s" ? name.slice(0, -1) : name;

	const filteredIds = filteredList.filter((recipeObj) => {
		const recipeIngrsArr = Object.values(recipeObj)[0];
		const recipeIngrsNames = recipeIngrsArr.map((ingr) =>
			ingr.name.toLowerCase()
		);
		const includesList = recipeIngrsNames.filter((ingrName) => {
			return ingrName.includes(cleanName.toLowerCase());
		});
		if (includesList.length > 0) {
			return true;
		} else {
			return false;
		}
	});

	return filteredIds.map((obj) => Object.keys(obj)[0]);
}
