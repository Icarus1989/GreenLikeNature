const now = new Date();

const actualDate = `${setZero(now.getDate())}/${setZero(
	now.getMonth() + 1
)}/${now.getFullYear()}`;
const pastDate = `${setZero(now.getDate())}/${setZero(now.getMonth() + 1)}/${
	now.getFullYear() - 1
}`;

function setZero(num) {
	if (num < 10) {
		return `0${num}`;
	} else {
		return `${num}`;
	}
}

// Nota: Nel prossimo aggiornamento l'Url coprirà un periodo di due anni completi
// precendenti alla data odierna, restituendo così dei risultati più precisi.
// E' stata necessaria questa scelta a causa di una evidente parzialità dei
// dati forniti prima del 2022. In assenza di altri dati open source disponibili
// ho deciso di usare i dati dell'anno corrente 2023 nonostante ancora
// evidentemente incompleti. Tuttavia nella maggior parte dei casi i risultati rispecchiano
// l'effettiva stagionalità dei prodotti ortofrutticoli e quindi possono essere utilizzati
// in un progetto di studio.

const baseUrl = process.env.BASEURL;
const completeUrl = process.env.TEMPURL;

// Comporre Url usando Date reali

export async function getData() {
	// Aggiornare con Axios
	const res = await fetch(process.env.TEMPURL, { next: { revalidate: 86400 } });
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

		const firstYear = Math.min(
			...productData.map((elem) => {
				return Number(elem.beginDate.slice(6));
			})
		);
		const secondYear = Math.max(
			...productData.map((elem) => {
				return Number(elem.beginDate.slice(6));
			})
		);

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
						// [firstYear]: [
						// { [`${firstYear}_data`]: firstYearDataByVariety },
						// {
						// 	[`${firstYear}_prices`]: firstYearBetterPrices
						// },
						// {
						[`${firstYear}_seasonality`]: seasonalityData(
							firstYearDataByVariety,
							firstYearBetterPrices
						),
						// }
						// ],
						// [secondYear]: [
						// { [`${secondYear}_data`]: secondYearDataByVariety },
						// {
						// 	[`${secondYear}_prices`]: secondYearBetterPrices
						// },
						// {
						[`${secondYear}_seasonality`]: seasonalityData(
							secondYearDataByVariety,
							secondYearBetterPrices
						),
						// }
						// ],
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
		// console.log(sortedPrices);
		return sortedPrices.slice(1);
	}

	function seasonalityData(data, betterPrices) {
		const numPrices = betterPrices;

		const firstPrice = numPrices[0];
		const secondPrice = numPrices[1];
		const thirdPrice = numPrices[2];

		const seasonData = data.filter((elem) => {
			return (
				parseFloat(elem.price.slice(1)) === firstPrice ||
				parseFloat(elem.price.slice(1)) === secondPrice ||
				parseFloat(elem.price.slice(1)) === thirdPrice
			);
		});

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
	// console.log(data);
	return data;
}

export async function seasonalFrtAndVgt(arr, date) {
	const frtAndVgt = arr.map((item) => {
		const product = Object.keys(item);
		// console.log(Object.values(item));
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

			// MODIFICARE QUI PRIMA DELLA PRODUCTION, USARE now E NON DATE FISSE

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

			// console.log(firstYearBeginDate.toLocale)

			function calculateTimestamps(stringDate) {
				const dateArray = stringDate.split("/");
				const date = new Date();
				date.setDate(dateArray[0]);
				date.setMonth(Number(dateArray[1]) - 1);
				if (dateArray[2] === "2022") {
					date.setYear(Number(dateArray[2]) + 1);
				} else if (dateArray[2] === "2023") {
					date.setYear(Number(dateArray[2]));
				}
				return Number(date.getTime());
			}

			function calculateRanges() {
				const firstYearBeginTimestamp = calculateTimestamps(firstYearBeginDate);
				const firstYearEndTimestamp = calculateTimestamps(firstYearEndDate);
				const secondYearBeginTimestamp =
					calculateTimestamps(secondYearBeginDate);
				const secondYearEndTimestamp = calculateTimestamps(secondYearEndDate);

				const zeroDate = Math.min(
					firstYearBeginTimestamp,
					secondYearBeginTimestamp
				);

				if (
					zeroDate === firstYearBeginTimestamp &&
					secondYearBeginTimestamp < firstYearEndTimestamp &&
					secondYearEndTimestamp > firstYearEndTimestamp
				) {
					return {
						up: {
							from: zeroDate,
							to: secondYearBeginTimestamp
						},
						top: {
							from: secondYearBeginTimestamp,
							to: firstYearEndTimestamp
						},
						down: {
							from: firstYearEndTimestamp,
							to: secondYearEndTimestamp
						}
					};
				} else if (
					zeroDate === firstYearBeginTimestamp &&
					secondYearBeginTimestamp < firstYearEndTimestamp &&
					firstYearEndTimestamp > secondYearEndTimestamp
				) {
					return {
						up: {
							from: zeroDate,
							to: secondYearBeginTimestamp
						},
						top: {
							from: secondYearBeginTimestamp,
							to: secondYearEndTimestamp
						},
						down: {
							from: secondYearEndTimestamp,
							to: firstYearEndTimestamp
						}
					};
				} else if (
					zeroDate === firstYearBeginTimestamp &&
					zeroDate === secondYearBeginTimestamp &&
					firstYearEndTimestamp > secondYearEndTimestamp
				) {
					return {
						top: {
							from: firstYearBeginTimestamp,
							to: secondYearEndTimestamp
						},
						down: {
							from: secondYearEndTimestamp,
							to: firstYearEndTimestamp
						}
					};
				} else if (
					zeroDate === firstYearBeginTimestamp &&
					zeroDate === secondYearBeginTimestamp &&
					firstYearEndTimestamp < secondYearEndTimestamp
				) {
					return {
						top: {
							from: firstYearBeginTimestamp,
							to: secondYearEndTimestamp
						},
						down: {
							from: firstYearEndTimestamp,
							to: secondYearEndTimestamp
						}
					};
				} else if (
					zeroDate === firstYearBeginTimestamp &&
					firstYearEndTimestamp < secondYearBeginTimestamp &&
					firstYearEndTimestamp < secondYearEndTimestamp
				) {
					return {
						up: {
							from: firstYearBeginTimestamp,
							to: firstYearEndTimestamp
						},
						down: {
							from: secondYearBeginTimestamp,
							to: secondYearEndTimestamp
						}
					};
				} else if (
					zeroDate === secondYearBeginTimestamp &&
					firstYearBeginTimestamp < secondYearEndTimestamp &&
					secondYearEndTimestamp < firstYearEndTimestamp
				) {
					return {
						up: {
							from: zeroDate,
							to: firstYearBeginTimestamp
						},
						top: {
							from: firstYearBeginTimestamp,
							to: secondYearEndTimestamp
						},
						down: {
							from: secondYearEndTimestamp,
							to: firstYearEndTimestamp
						}
					};
				} else if (
					zeroDate === secondYearBeginTimestamp &&
					firstYearBeginTimestamp < secondYearEndTimestamp &&
					firstYearEndTimestamp < secondYearEndTimestamp
				) {
					return {
						up: {
							from: zeroDate,
							to: firstYearBeginTimestamp
						},
						top: {
							from: firstYearBeginTimestamp,
							to: firstYearEndTimestamp
						},
						down: {
							from: firstYearEndTimestamp,
							to: secondYearEndTimestamp
						}
					};
				} else if (
					zeroDate === secondYearBeginTimestamp &&
					secondYearEndTimestamp < firstYearBeginTimestamp &&
					secondYearEndTimestamp < firstYearEndTimestamp
				) {
					return {
						up: {
							from: secondYearBeginTimestamp,
							to: secondYearEndTimestamp
						},
						down: {
							from: firstYearBeginTimestamp,
							to: firstYearEndTimestamp
						}
					};
				} else if (
					zeroDate === secondYearBeginTimestamp &&
					secondYearEndTimestamp < firstYearBeginTimestamp &&
					secondYearEndTimestamp > firstYearEndTimestamp &&
					secondYearBeginTimestamp < firstYearBeginTimestamp
				) {
					return {
						up: {
							from: secondYearBeginTimestamp,
							to: secondYearEndTimestamp
						},
						down: {
							from: firstYearBeginTimestamp,
							to: firstYearEndTimestamp
						}
					};
				} else {
					// Da eliminare dopo vari controlli, così sembra tutto funzionante
					// e restituisce risultati soddisfacenti
					return {
						eq: "limit-case"
					};
				}
			}
			return {
				[varietyLabel]: {
					seasonality: calculateRanges()
				}
			};
		});
	});

	const today = date.getTime();

	// Calcolare qui frutti e verdure di stagione ora

	function calculateActualFrtAndVgt(data, timestamp) {
		const actualFrtAndVgt = [];
		data.map((prod) => {
			return prod.map((variety) => {
				const varietyName = Object.keys(variety)[0];
				const varietyData = variety[varietyName].seasonality;
				Object.entries(varietyData).map((elem) => {
					if (timestamp >= elem[1].from && timestamp <= elem[1].to) {
						actualFrtAndVgt.push({
							product: varietyName.split(" - ")[0],
							variety: varietyName.split(" - ")[1] || "All",
							seasonal: true,
							phase: elem[0]
						});
					} else {
						return;
					}
				});
			});
		});
		console.log(actualFrtAndVgt);
		return actualFrtAndVgt;
	}

	return calculateActualFrtAndVgt(frtAndVgt, today);
}

export async function getSpoonData(frtAndVeg) {
	const apiKey = "977944bb2264474782049f9e558b9143";
	const intolerances = "one,two,three,from state?";
	const strg =
		"https://api.spoonacular.com/recipes/findByIngredients?ingredients=pears&number=10&apiKey=977944bb2264474782049f9e558b9143&includeNutrition=true";
	const frtAndVegString = frtAndVeg.join(",");
	const spoonUrl = `"https://api.spoonacular.com/recipes/findByIngredients?ingredients=${frtAndVegString}&diet=vegetarian&intolerances=${intolerances}&number=10&apiKey=${apiKey}&includeNutrition=true`;
	try {
		const spoonData = await fetch();
		const json = await spoonData.json();
		console.log(json);
	} catch (error) {
		console.log(error);
	}
}

// export default async function List() {
// 	const data = await getData();
// 	const test = await seasonalFrtAndVgt(data, now);
// 	console.log(test);

// 	return (
// 		<ul>
// 			{test.map((elem) => {
// 				return (
// 					<p>
// 						{elem.product} | variety: {elem.variety}
// 					</p>
// 				);
// 			})}
// 		</ul>
// 	);
// }
