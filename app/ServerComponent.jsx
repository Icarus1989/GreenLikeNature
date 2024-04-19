import * as deepl from "deepl-node";
// import { intolerancesObj } from "./utils/intolerances/intolerancesObj";
import { intolerancesObj } from "./utils/intolerances/intolerancesObj";

const now = new Date();

const actualDate = `${setZero(now.getDate())}/${setZero(
	now.getMonth() + 1
)}/${now.getFullYear()}`;
// const pastDate = `${setZero(now.getDate())}/${setZero(now.getMonth() + 1)}/${
// 	now.getFullYear() - 2
// }`;
const pastDate = `01/01/${now.getFullYear() - 2}`;

function setZero(num) {
	if (num < 10) {
		return `0${num}`;
	} else {
		return `${num}`;
	}
}

const firstYear = now.getFullYear() - 2;
const secondYear = now.getFullYear() - 1;

// console.log(actualDate);
// console.log(now.getFullYear() - 1);
// console.log(pastDate);

// Nota: Nel prossimo aggiornamento l'Url coprirà un periodo di due anni completi
// precendenti alla data odierna, restituendo così dei risultati più precisi.
// E' stata necessaria questa scelta a causa di una evidente parzialità dei
// dati forniti prima del 2022. In assenza di altri dati open source disponibili
// ho deciso di usare i dati dell'anno corrente 2023 nonostante ancora
// evidentemente incompleti. Tuttavia nella maggior parte dei casi i risultati rispecchiano
// l'effettiva stagionalità dei prodotti ortofrutticoli e quindi possono essere utilizzati
// in un progetto di studio.

const baseUrl = process.env.BASEURL;
const completeUrl =
	"https://ec.europa.eu/agrifood/api/fruitAndVegetable/prices?memberStateCodes=IT&months=1,2,3,4,5,6,7,8,9,10,11,12&beginDate=01/01/2022&endDate=20/02/2024";

// Comporre Url usando Date reali

export async function getData() {
	// Aggiornare con Axios
	try {
		const res = await fetch(completeUrl, { next: { revalidate: 86400 } });
		const json = await res.json();

		const newSet = new Set();
		for (let item of json) {
			newSet.add(item.product);
		}
		const fruitAndVegetableList = Array.from(newSet);

		const arr = json.map((elem) => {
			return {
				beginDate: elem.beginDate,
				endDate: elem.endDate,
				price: elem.price,
				product: elem.product,
				unit: elem.unit,
				weekNumber: elem.weekNumber,
				variety: elem.variety
			};
		});

		const data = fruitAndVegetableList.map((elem) => {
			const productData = arr.filter((item) => {
				return item.product === elem;
			});

			const firstYearProdData = productData.filter(
				(elem) => Number(elem.beginDate.slice(6)) === firstYear
			);

			const secondYearProdData = productData.filter(
				(elem) => Number(elem.beginDate.slice(6)) === secondYear
			);

			const varieties = new Set();

			secondYearProdData.map((prodData) => {
				return varieties.add(prodData.variety);
			});

			const uniqueVarieties = Array.from(varieties);

			return {
				[elem]: uniqueVarieties.map((uniqueVariety) => {
					const variety = uniqueVariety;

					const firstYearDataByVariety = filterByVariety(
						firstYearProdData,
						variety
					);

					const secondYearDataByVariety = filterByVariety(
						secondYearProdData,
						variety
					);

					const firstYearBetterPrices = calcYearBetterPrices(
						firstYearDataByVariety.map((item) => item.price)
					);

					const secondYearBetterPrices = calcYearBetterPrices(
						secondYearDataByVariety.map((item) => item.price)
					);

					const maxWeek = Math.max(
						...secondYearDataByVariety.map((item) => item.weekNumber)
					);

					const lastData = secondYearDataByVariety.filter(
						(item) => item.weekNumber === maxWeek
					);

					return {
						[variety]: {
							[`${firstYear}_seasonality`]: seasonalityData(
								firstYearDataByVariety,
								firstYearBetterPrices
							),
							[`${secondYear}_seasonality`]: seasonalityData(
								secondYearDataByVariety,
								secondYearBetterPrices
							),
							last_data: lastData
						}
					};
				})
			};
		});

		function filterByVariety(data, variety) {
			return data.filter((item) => item.variety === variety);
		}

		function calcYearBetterPrices(prices) {
			const numPrices = prices.map((price) => parseFloat(price.slice(1)));
			const highestPrice = Math.max(...numPrices);
			const lowestPrice = Math.min(...numPrices);
			const sortedPrices = numPrices.sort((a, b) => {
				if (a > b) {
					return 1;
				}
				if (a === b) {
					return 0;
				}
				if (a < b) {
					return -1;
				}
			});

			// <--- Ricontrollo

			// console.log(sortedPrices);
			// modificare sliceNumber?
			// const sliceNumber = 2;
			// const betterPrices = sortedPrices.slice(0, sliceNumber);

			// levato il primo risultato più basso perché dall'osservazione risulta
			// non in linea con il resto dei dati, capire se tenere ---->
			// return sortedPrices.slice(1);
			return sortedPrices;
		}

		function seasonalityData(data, betterPrices) {
			const numPrices = betterPrices;

			const firstPrice = numPrices[0];
			const secondPrice = numPrices[1];
			const thirdPrice = numPrices[2];

			const targetData = data.filter((elem) => {
				return Number(elem.price.slice(1)) === Number(firstPrice);
			});

			const secondTarget = data.filter((elem) => {
				return parseFloat(elem.price.slice(1)) === secondPrice;
			});

			const seasonData = [...targetData, ...secondTarget];

			const dates = seasonData
				.sort((a, b) => {
					if (a.weekNumber > b.weekNumber) {
						return 1;
					} else if (a.weekNumber === b.weekNumber) {
						return 0;
					} else if (a.weekNumber < b.weekNumber) {
						return -1;
					}
				})
				.map((elem) => {
					return {
						begin: elem.beginDate,
						end: elem.endDate
					};
				});

			const beginWeek = dates[0] || { begin: "--/--/2023", end: "--/--/2023" };

			const endWeek = dates[dates.length - 1] || {
				begin: "--/--/2023",
				end: "--/--/2023"
			};

			const beginSeason = beginWeek.begin;
			const endSeason = endWeek.end;

			const beginSeasonData = seasonData.filter(
				(elem) => elem.beginDate === beginWeek.begin
			);
			const endSeasonData = seasonData.filter(
				(elem) => elem.endDate === endWeek.end
			);

			return {
				beginSeason: beginSeason,
				endSeason: endSeason,
				beginSeasonData: beginSeasonData,
				endSeasonData: endSeasonData
			};
		}
		return data;
	} catch (error) {
		console.log(error);
		// Gestire eventuale errore
	}
}

export async function seasonalFrtAndVgt(arr) {
	const frtAndVgt = arr.map((item) => {
		const product = Object.keys(item);

		return item[product].map((variety) => {
			const varietyName = Object.keys(variety);
			const varietyAbbr = varietyName[0].toString().split("-")[0];
			const productName = `${product
				.toString()
				.slice(0, 1)
				.toUpperCase()}${product.toString().slice(1)}`;

			const varietyLabel =
				`${varietyName}` === `${productName}: All types and varieties`
					? `${productName}`
					: `${productName} - ${varietyAbbr}`;

			// Modifcare qui ---> inserire fristYear e secondYear
			if (!variety[varietyName]["2022_seasonality"]) {
				variety[varietyName]["2022_seasonality"] =
					variety[varietyName]["2023_seasonality"];
				// Condizione creata per eventuali nuove categorie di dati per prodotto,
				// con ovvia mancanza nell'anno precedente
			}

			const firstYearBeginDate =
				variety[varietyName]["2022_seasonality"].beginSeason;

			const firstYearEndDate =
				variety[varietyName]["2022_seasonality"].endSeason;

			const secondYearBeginDate =
				variety[varietyName]["2023_seasonality"].beginSeason;

			const secondYearEndDate =
				variety[varietyName]["2023_seasonality"].endSeason;

			function calculateTimestamps(stringDate) {
				const dateArray = stringDate.split("/");
				const date = new Date();
				date.setFullYear(2024);
				date.setDate(dateArray[0]);
				date.setMonth(Number(dateArray[1]) - 1);
				return Number(date.getTime());
			}

			function calculateRanges() {
				const firstYearBeginTimestamp = calculateTimestamps(firstYearBeginDate);
				const firstYearEndTimestamp = calculateTimestamps(firstYearEndDate);
				const secondYearBeginTimestamp =
					calculateTimestamps(secondYearBeginDate);
				const secondYearEndTimestamp = calculateTimestamps(secondYearEndDate);

				const today = Number(new Date().getTime());

				const firstDay = Number(new Date().setFullYear(2024, 0, 1));

				function yearCheckSeasonal(begin, end, now) {
					if (begin < end) {
						if (now >= begin && now <= end) {
							return true;
						} else if (now >= begin && now <= end) {
							return true;
						} else if (now < begin || now > end) {
							return false;
						}
					} else if (begin > end) {
						if (now >= begin && now <= end) {
							return true;
						} else if (now < begin || now > end) {
							return false;
						}
					}
				}

				const firstYearCheck = yearCheckSeasonal(
					firstYearBeginTimestamp,
					firstYearEndTimestamp,
					today
				);

				const secondYearCheck = yearCheckSeasonal(
					secondYearBeginTimestamp,
					secondYearEndTimestamp,
					today
				);

				if (firstYearCheck || secondYearCheck) {
					return true;
				} else {
					return false;
				}
			}
			return {
				[varietyLabel]: {
					"1st_from": firstYearBeginDate,
					"1st_to": firstYearEndDate,
					"2nd_from": secondYearBeginDate,
					"2nd_to": secondYearEndDate,
					seasonal: calculateRanges()
				}
			};
		});
	});

	function calculateActualFrtAndVgt(data) {
		const actualFrtAndVgt = [];
		data.map((prod) => {
			return prod.map((variety) => {
				const name = Object.keys(variety)[0];

				if (variety[name].seasonal === true) {
					actualFrtAndVgt.push(name);
				}
			});
		});
		return actualFrtAndVgt;
	}

	return calculateActualFrtAndVgt(frtAndVgt);
}

export function detectIntolerance(allergen, list) {
	const intolList = intolerancesObj[allergen];
	const detected = [];
	for (let name of list) {
		for (let intol of intolList) {
			if (String(name).includes(intol)) {
				detected.push(intol);
			}
		}
	}
	if (detected.length > 0) {
		return false;
	} else {
		return true;
	}
}

export async function getSpoonData(
	inclList,
	exclList,
	intolList,
	elems = 100,
	offset = 0
) {
	"use server";

	const apiKey = process.env.APIKEYSPOONTWO;

	const includeIngredients =
		inclList.length > 0 ? `&includeIngredients=${inclList}` : "";

	const excludeIngredients =
		exclList.length > 0 ? `&excludeIngredients=${exclList}` : "";

	const intolerancesList =
		intolList.length > 0 ? `&intolerances=${intolList}` : "";

	const offsetNum = offset > 0 ? `&offset=${offset}` : "";

	const url = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&number=${elems}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true${includeIngredients}${excludeIngredients}${intolerancesList}${offsetNum}&apiKey=${apiKey}`;

	console.log(url);
	try {
		const spoonData = await fetch(url);
		const json = await spoonData.json();

		const results = await json["results"].map((recipe) => {
			const {
				id,
				title,
				aggregateLikes,
				analyzedInstructions,
				diaryFree,
				extendedIngredients,
				glutenFree,
				image,
				readyInMinutes,
				servings,
				summary,
				vegan,
				vegetarian
			} = recipe;

			const ingrsNames = extendedIngredients.map((ingr) => ingr.name);

			const eggFree = detectIntolerance("egg", ingrsNames);
			const grainFree = detectIntolerance("grain", ingrsNames);
			const peanutFree = detectIntolerance("peanut", ingrsNames);
			const seafoodFree = detectIntolerance("seafood", ingrsNames);
			const sesameFree = detectIntolerance("sesame", ingrsNames);
			const shellfishFree = detectIntolerance("shellfish", ingrsNames);
			const soyFree = detectIntolerance("soy", ingrsNames);
			const sulfiteFree = detectIntolerance("sulfite", ingrsNames);
			const treeNutFree = detectIntolerance("treeNut", ingrsNames);
			const wheatFree = detectIntolerance("wheat", ingrsNames);

			return {
				// ...recipe, // <--- forse eliminare le altre properties per alleggerire
				id: id,
				title: title,
				aggregateLikes: aggregateLikes,
				analyzedInstructions: analyzedInstructions,
				diaryFree: diaryFree,
				extendedIngredients: extendedIngredients,
				glutenFree: glutenFree,
				eggFree: eggFree,
				grainFree: grainFree,
				peanutFree: peanutFree,
				seafoodFree: seafoodFree,
				sesameFree: sesameFree,
				shellfishFree: shellfishFree,
				soyFree: soyFree,
				sulfiteFree: sulfiteFree,
				treeNutFree: treeNutFree,
				wheatFree: wheatFree,
				image: image,
				readyInMinutes: readyInMinutes,
				servings: servings,
				summary: summary,
				vegan: vegan,
				vegetarian: vegetarian
			};
		});

		return { results: [...results] };
		// return json;
	} catch (error) {
		console.error(error);
	}
}

export async function seasonalData() {
	"use server";
	const data = await getData();
	const seasonalFruit = await seasonalFrtAndVgt(data);
	const orderedList = seasonalFruit.map((elem) => {
		const name = elem.split(" - ")[0] || elem;
		const variety = elem.split(" - ")[1] || "All";
		return {
			[name]: [variety]
		};
	});

	const list = {};

	for (const elem of Object.values(orderedList)) {
		if (!list[Object.keys(elem)[0]]) {
			list[Object.keys(elem)[0]] = Object.values(elem)[0];
		} else {
			list[Object.keys(elem)[0]] = [
				...list[Object.keys(elem)[0]],
				...Object.values(elem)[0]
			];
		}
	}

	return list;
}

const deeplAuthKey = process.env.APIKEYDEEPLTWO;
const translator = new deepl.Translator(deeplAuthKey);

export async function deeplTranslate(textArr, lang) {
	"use server";
	console.log(textArr);
	if (lang !== "en") {
		try {
			const result = await translator.translateText(textArr, "en", lang, {
				split_sentences: "0"
			});
			console.log(result);
			return result;
		} catch (error) {
			console.log(error);
		}
	} else {
		const result = textArr.map((text) => {
			return { text: text };
		});
		// const result = [{ text: text }];
		// const result = textArr;
		return result;
	}
}

export async function translateRecipe(data, lang) {
	"use server";

	const title = await data["title"];
	const summary = await data["summary"];
	const analyzedInstructions = await data["analyzedInstructions"];
	const extendedIngredients = await data["extendedIngredients"];

	const analyzedInstructionsTexts = await analyzedInstructions[0]["steps"].map(
		(step) => {
			const arrTexts = [];
			if (step["step"]) {
				arrTexts.push(step["step"]);
			}

			if (step["equipment"].length > 0) {
				step["equipment"].map((tool) => {
					return arrTexts.push(
						`${tool.name[0].toUpperCase()}${tool.name.slice(1)}`
					);
				});
			}
			if (step["ingredients"].length > 0) {
				step["ingredients"].map((ingr) => {
					return arrTexts.push(
						`${ingr.name[0].toUpperCase()}${ingr.name.slice(1)}`
					);
				});
			}
			return arrTexts.join(" | ");
		}
	);

	const ingredientsNamesList = await extendedIngredients.map((ingredient) => {
		return `${ingredient.original[0].toUpperCase()}${ingredient.original.slice(
			1
		)}`;
	});

	const translateTitle = await deeplTranslate([title], lang);
	const translateSummary = await deeplTranslate([summary], lang);
	const translateInstructionsText = await deeplTranslate(
		analyzedInstructionsTexts,
		lang
	);
	const translateIngredients = await deeplTranslate(ingredientsNamesList, lang);

	const instructionsCompleteArr = await translateInstructionsText.map((elem) =>
		elem.text.split(" | ")
	);

	const stepsTranslated = await analyzedInstructions[0]["steps"].map(
		(step, index) => {
			const translatedCompleteStep = instructionsCompleteArr[index];
			const equipmentLength = step["equipment"].length;
			const ingredientsLength = step["ingredients"].length;

			return {
				...step,
				number: index + 1,
				step: translatedCompleteStep[0],
				equipment:
					step["equipment"].length > 0
						? step["equipment"].map((tool, toolIndex) => {
								const toolsList = translatedCompleteStep.slice(
									1,
									translatedCompleteStep.length - ingredientsLength
								);
								return {
									...tool,
									name: toolsList[toolIndex]
								};
						  })
						: [],
				ingredients:
					step["ingredients"].length > 0
						? step["ingredients"].map((ingr, ingrIndex) => {
								const listIngr = translatedCompleteStep.slice(
									equipmentLength + 1,
									translatedCompleteStep.length + 1
								);
								return {
									...ingr,
									id: ingr.id,
									name: listIngr[ingrIndex]
								};
						  })
						: []
			};
		}
	);

	const extendedIngrsTranslated = await extendedIngredients.map(
		(ingrObj, indexIngr) => {
			return {
				...ingrObj,
				original: translateIngredients[indexIngr].text
			};
		}
	);

	const newData = {
		...data,
		title: translateTitle[0].text,
		summary: translateSummary[0].text,
		analyzedInstructions: [{ ["steps"]: stepsTranslated }],
		extendedIngredients: extendedIngrsTranslated
	};

	return newData;
}

export async function translateToEng(word, lang) {
	"use server";

	const deeplAuthKey = process.env.APIKEYDEEPL;
	const translator = new deepl.Translator(deeplAuthKey);

	const textArr = [word];
	if (lang !== "en") {
		try {
			const result = await translator.translateText(textArr, lang, "en-GB", {
				split_sentences: "0"
			});
			// console.log(result);
			return result[0];
		} catch (error) {
			console.log(error);
			return { text: word };
		}
	} else {
		return { text: word };
	}
}

export async function translateList(list, lang) {
	"use server";
	const deeplAuthKey = process.env.APIKEYDEEPLTWO;
	const translator = new deepl.Translator(deeplAuthKey);

	if (lang !== "en") {
		try {
			const resultsArr = await translator.translateText(list, "en", lang, {
				split_sentences: "0"
			});
			console.log("Results ---> ");
			console.log(resultsArr);
			return resultsArr.map((elem) => elem.text);
		} catch (error) {
			console.log(error);
			return list;
		}
	} else {
		return list;
	}
}
