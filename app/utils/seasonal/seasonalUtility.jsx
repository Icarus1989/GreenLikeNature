export const calcSeasonalListIDs = (listObjs, data) => {
	const listNames = Array.from(Object.keys(listObjs));
	// console.log(listNames);
	const list = new Set();
	for (let name of listNames) {
		const ids = calcRecipesIds(data, name);
		for (let idElem of ids) {
			list.add(idElem);
		}
	}
	// console.log(takeEightSeasonal(Array.from(list)));
	return takeEightSeasonal(Array.from(list));
	// const list = listNames.map((name) => {
	// 	return calcRecipesIds(data, name);
	// })
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
	// console.log(name);
	const filteredList = data.map((elem) => {
		return {
			[elem.id]: elem.extendedIngredients
		};
	});

	const cleanName = name[name.length - 1] === "s" ? name.slice(0, -1) : name;

	// console.log(name.slice(0, -1));

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

	// console.log(filteredIds.map((obj) => Object.keys(obj)));

	return filteredIds.map((obj) => Object.keys(obj)[0]);
}
// test
