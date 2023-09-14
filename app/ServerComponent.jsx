const now = new Date();

const actualDate = `${setZero(now.getDate())}/${setZero(
	now.getMonth() + 1
)}/${now.getFullYear()}`;
const pastDate = `${setZero(now.getDate())}/${setZero(now.getMonth() + 1)}/${
	now.getFullYear() - 2
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

async function getData() {
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
						last_data: secondYearDataByVariety[0]
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
	console.log(data);
	return data;
}

export default async function List() {
	const data = await getData();
	return (
		<ul>
			{data.map((elem) => {
				return <p>{Object.keys(elem)}</p>;
			})}
		</ul>
	);
}
