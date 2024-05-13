function getData(datas) {
	// const res = await fetch(process.env.TEMPURL, { next: { revalidate: 86400 } });
	// const json = await res.json();
	const json = datas;

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
	return data;
}

function seasonalFrtAndVgt(arr, date) {
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

			// console.log(
			// 	`${productName}: ${variety[varietyName]["2022_seasonality"].beginSeason} --> ${variety[varietyName]["2022_seasonality"].endSeason} | ${variety[varietyName]["2023_seasonality"].beginSeason} --> ${variety[varietyName]["2023_seasonality"].endSeason}`
			// );

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

				// console.log(
				// 	`${firstYearBeginTimestamp} --> ${firstYearEndTimestamp} | ${secondYearBeginTimestamp} --> ${secondYearEndTimestamp}`
				// );

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

	const today = now.getTime();

	// Calcolare qui frutti e verdure di stagione ora

	function calculateActualFrtAndVgt(data, timestamp) {
		const actualFrtAndVgt = [];
		data.map((prod) => {
			return prod.map((variety) => {
				const varietyName = Object.keys(variety)[0];
				const varietyData = variety[varietyName].seasonality;

				// console.log(Object.entries(varietyData));
				Object.entries(varietyData).map((elem) => {
					// console.log(elem[0]);
					// console.log("---");
					// console.log(elem[1]);

					if (timestamp >= elem[1].from && timestamp <= elem[1].to) {
						actualFrtAndVgt.push({
							product: varietyName.split(" - ")[0],
							variety: varietyName.split(" - ")[1],
							seasonal: true,
							phase: elem[0]
						});
					} else {
						// actualFrtAndVgt.push({
						// 	product: prod,
						// 	variety: varietyName,
						// 	seasonal: false
						// });
						return;
					}
				});
			});
		});
		return actualFrtAndVgt;
	}

	return calculateActualFrtAndVgt(frtAndVgt, today);
}

const now = new Date();

// Client side

// const deg = useMotionValue(0);
// const smoothEffect = useSpring(deg, {
// 	stiffness: 100,
// 	damping: 10,
// 	restDelta: 0.001
// });

// const degVelocity = useVelocity(smoothEffect);

// console.log(degVelocity);

// const rotation = useTransform(degVelocity, [-3000, 0, 3000], [0, 360, 0], {
// 	clamp: false
// });
// const angleVelocity = useTransform(xVelocity, [0, 1000], [0, 360], {
// 	clamp: false
// });
// angle.set(
// 	angle.get() + -Number(xVelocity.current.toFixed(3)) / (360 / Math.PI)
// );

// x.on("change", (latest) => {
// 	return angle.set;
// });

// useEffect(() => {
// 	return xVelocity.on("change", (latestVelocity) => {
// 		// angle.set(angle.get() + Math.abs(latestVelocity).toFixed(2));
// 		// console.log(angle);

// 		// console.log("Velocity", Number(Math.abs(latestVelocity).toFixed(3)));
// 		angle.set(
// 			angle.get() + -Number(latestVelocity.toFixed(3)) / (360 / Math.PI)
// 		);
// 		// console.log(angle.current);
// 		// if (angle.current >= 90) {
// 		// 	dragRef.current.style.transform = "translateX(0px)";
// 		// 	x.set(0);
// 		// }
// 	});
// }, []);

// if (
// 	lastValue > sectionRef.current.clientWidth - 100 ||
// 	lastValue < -sectionRef.current.clientWidth + 100
// ) {
// 	// x.set(0);
// 	// console.log(menuRef.current.style.rotateZ);
// 	const actualAngle = angle.get();
// 	x.set(0);
// 	// angle.set(actualAngle);
// 	angle.set(
// 		actualAngle + -Number(xVelocity.current.toFixed(3)) / (360 / Math.PI)
// 	);
// }
// const dragControls = useDragControls();

// function endDrag(event) {
// 	dragControls.start(event, { dragSnapToOrigin: true });
// }

// const angularVelocity = useMotionValue(0);
// const rotation =

// const xAcceleration = useVelocity(xVelocity);

// const xAcceleration = useTransform();

// const rotateZ = useTransform(xVelocity, (latest) => latest + angle);

// const rotation = useTransform(
// 	xVelocity,
// 	[0, 10000],
// 	[0, 360],
// 	{ clamp: false }
// 	// [-100, 0, 100],
// 	// (latest) => latest + angle
// 	// (latest) => latest * (Math.PI / 4) * (180 / Math.PI) * (recipes.length - 1)
// );

// const rotation = useTransform(() => xSmooth.get() + angle.get());

// console.log(rotation);
// Prossimo test -> ricavare accelerezione o usare velocità
// per sommare o moltiplicare con la value della rotation

// In alternativa usare scostamento x per impostare una rotation

// const rotateZ = useTransform(
// 	rotation,
// 	(latest) => latest * (Math.PI / 4) * (180 / Math.PI) * (recipes.length - 1)
// );
// console.log(xVelocity);

// useEffect(() => {}, []);

// ----->
// AGGIORNAMENTO: integrare Velocity con useVelocity su
// circular-container? utilizzare rotazione ottenuta con
// whileTap sulla property rotate
// <-----

// console.log(rotateZ);
// const labelRef = useRef(null);
// console.log(labelRef.current);

// useEffect(() => {
// 	const initialRotation = rotateZ;
// 	if (rotateZ !== initialRotation) {
// 		console.log(rotateZ);
// 	}
// 	console.log(rotateZ);
// }, [rotateZ]);
// function setNewIndex(value) {
// 	if (value === 0) {
// 		return 0;
// 	} else if (value > 0) {
// 		return -value - 1;
// 	}
// }
// useEffect(() => {

// }, [])
{
	/* <ul
					ref={scrollRef}
					style={{ width: `${recipes.length}00vw` }}
					className={styles["invisible-scroll"]}
					dir="rtl"
				>
					{recipes.map((elem, index) => {
						if (index === 0) {
							return (
								<li
									key={elem.title}
									className={styles["invisible-element"]}
								></li>
							);
						} else if (index === recipes.length - 1) {
							return (
								<li
									key={elem.title}
									className={styles["invisible-element"]}
								></li>
							);
						} else {
							return (
								<li
									key={elem.title}
									className={styles["invisible-element"]}
								></li>
);
						}
						// return (
						// 	<li key={elem.title} className={styles["invisible-element"]}></li>
						// );

						// console.log(recipes[index + 2]);
					})}
				</ul> */
}
// onClick={console.log("click")}
// onPanStart={(event, info) => {
// 	console.log("start");

// 	return console.log(info.point);
// }}
// onPanEnd={(event, info) => {
// 	console.log("end");
// 	return console.log(info.point);
// }}
// canc -->
// whileTap={{ rotateZ: rotation }}
// onPan={(event, info) => {
// 	return console.log(info);
// }}
// onTapCancel={(event, info) => {
// 	return console.log("Stop: " + info.point.x, info.point.y);
// }}

// ---> Funzionante x CarouselContainer
// const { scrollXProgress } = useScroll({
// 	container: sectionRef,
// 	target: menuRef
// });

// const rotation = useTransform(
// 	scrollXProgress,
// 	(latest) => latest * (Math.PI / 4) * (180 / Math.PI) * (recipes.length - 1)
// );

// const rotateZ = useSpring(rotation, {
// 	stiffness: 100,
// 	damping: 10,
// 	restDelta: 0.001
// });

// <--- Funzionante

// if (angle.get() > 45 && angle.get < 45.5) {
// 	console.log("");
// 	xVelocity.set(xVelocity.get() - 0.2);
// } else if (angle.get() > 90 && angle.get < 90.5) {
// 	console.log("");
// 	xVelocity.set(xVelocity.get() - 0.2);
// } else if (angle.get() > 135 && angle.get < 135.5) {
// 	console.log("");
// 	xVelocity.set(xVelocity.get() - 0.2);
// } else if (angle.get() > 180 && angle.get < 180.5) {
// 	console.log("");
// 	xVelocity.set(xVelocity.get() - 0.2);
// }

// function ranges(arr, minVel) {
// 	for (let i = 0; i < arr.length; i++) {
// 		if (vel <= minVel) {
// 			if (deg.get() > arr[i] && deg.get() < arr[i] + 1) {
// 				vel.set(0.3);
// 				deg.set(arr[i]);
// 				vel.set(0);
// 			}
// 		}
// 	}
// }

// <-- Alt -->

// function detLowerElem() {
// 	// const low = Math.sin(angle) ?
// }

// if (lastAngle > 0 && lastAngle < theta[1] * (180 / Math.PI)) {
// 	console.log("Elem 0");
// } else if (
// 	lastAngle > theta[1] * (180 / Math.PI) &&
// 	lastAngle < theta[2] * (180 / Math.PI) &&
// 	Math.round(angle.get()) % 45 === 0
// ) {
// 	console.log("Elem 1");
// 	// x.set(x.get());
// 	xVelocity.set(0);
// 	angle.set(theta[1] * (180 / Math.PI));
// 	setRecipeTitle((prevTitle) => {
// 		console.log(prevTitle);
// 		if (invertedRecipes[1].title !== prevTitle) {
// 			return (prevTitle = invertedRecipes[1].title);
// 		} else {
// 			return prevTitle;
// 		}
// 	});
// } else if (
// 	lastAngle > theta[2] * (180 / Math.PI) &&
// 	lastAngle < theta[3] * (180 / Math.PI) &&
// 	Math.round(angle.get()) % 45 === 0
// ) {
// 	console.log("Elem 2");
// 	x.set(x.get());
// 	xVelocity.set(0);
// 	angle.set(theta[2] * (180 / Math.PI));
// 	setRecipeTitle((prevTitle) => {
// 		console.log(prevTitle);
// 		if (invertedRecipes[2].title !== prevTitle) {
// 			return (prevTitle = invertedRecipes[2].title);
// 		} else {
// 			return prevTitle;
// 		}
// 	});
// }

// else if ()
// else if (Math.round(angle.get()) === 0 || Math.round(lastAngle) === 0) {
// 	angle.set(0);
// }

// theta.map((piSection, index) => {
// 	// console.log(index);
// 	if (
// 		lastAngle >= 0 &&
// 		// piSection >= minRadians &&
// 		// piSection <= maxRadians
// 		lastAngle >= theta[index] * (180 / Math.PI) &&
// 		lastAngle < theta[index + 1] * (180 / Math.PI) &&
// 		Math.round(angle.get()) % 22.5 === 0
// 	) {
// 		// console.log(Math.sin(piSection));
// 		// console.log("plus");
// 		// if (xVelocity.get() < 0.05) {
// 		// 	angle.set(piSection * (180 / Math.PI));
// 		// 	xVelocity.set(0);
// 		// }
// 		// -------------------------
// 		// Funziona ma male --->
// 		// setRecipeTitle((prevTitle) => {
// 		// 	if (
// 		// 		recipes[theta.length - index] !== undefined &&
// 		// 		recipes[theta.length - index] !== prevTitle
// 		// 	) {
// 		// 		return recipes[theta.length - index].title;
// 		// 	} else {
// 		// 		return recipes[0].title;
// 		// 	}
// 		// });
// 		// <--- Funziona ma male
// 		// -------------------------
// 		// console.log(invertedRecipes[index]);
// 		// if (
// 		// 	invertedRecipes[index] !== undefined
// 		// 	// invertedRecipes[index].title !== prevTitle
// 		// ) {
// 		// x.set()
// 		// HERE
// 		// x.set(x.get());
// 		// xVelocity.set(0);
// 		// angle.set(theta[index] * (180 / Math.PI));
// 		// setRecipeTitle((prevTitle) => {
// 		// 	console.log(prevTitle);
// 		// 	if (invertedRecipes[index].title !== prevTitle) {
// 		// 		return invertedRecipes[index].title;
// 		// 	} else {
// 		// 		return prevTitle;
// 		// 	}
// 		// });
// 		// HERE
// 		// }
// 		// });
// 		// Da testare --->
// 		// setRecipeData((prevData) => {
// 		// 	if (
// 		// 		recipes[theta.length - index] !== undefined &&
// 		// 		recipes[theta.length - index] !== prevData.title
// 		// 	) {
// 		// 		return {
// 		// 			...prevData,
// 		// 			title: recipes[theta.length - index].title,
// 		// 			index: index
// 		// 		};
// 		// 	} else {
// 		// 		return { ...prevData };
// 		// 	}
// 		// });
// 		// <--- Da testare
// 	} else if (
// 		lastAngle < 0 &&
// 		piSection >= minRadians &&
// 		piSection <= maxRadians
// 	) {
// 		// console.log(recipes[index] || recipes[0]);
// 		// console.log("minus");
// 		// if (xVelocity.get() < -0.05) {
// 		// 	console.log("near");
// 		// 	console.log(xVelocity.get());
// 		// 	// xVelocity.set(0.05);
// 		// 	angle.set(piSection * (180 / Math.PI));
// 		// 	xVelocity.set(0);
// 		// }
// 		// setRecipeTitle((prevTitle) => {
// 		// 	if (recipes[index] !== undefined && recipes[index] !== prevTitle) {
// 		// 		return recipes[index].title;
// 		// 	} else {
// 		// 		return recipes[0].title;
// 		// 	}
// 		// });
// 		// Da testare --->
// 		// setRecipeData((prevData) => {
// 		// 	if (
// 		// 		recipes[theta.length - index] !== undefined &&
// 		// 		recipes[theta.length - index] !== prevData.title
// 		// 	) {
// 		// 		return {
// 		// 			...prevData,
// 		// 			title: recipes[index].title,
// 		// 			index: index
// 		// 		};
// 		// 	} else {
// 		// 		return { ...prevData };
// 		// 	}
// 		// });
// 		// <--- Da testare

if (
	!goDown &&
	scrollYProgress.get() * recipeRef.current.scrollHeight >
		containerRef.current.offsetTop + btnsRef.current.offsetHeight
) {
	// btnsRef.current.style.position = "fixed";
	// btnsRef.current.style.overflow = "hidden";
	// knifeSvg.current.style.opacity = "0.0";
	// forkSvg.current.style.opacity = "0.0";
	// btnsRef.current.style.background = `linear-gradient(to top, transparent, rgba(45, 45, 45, 0.5) 15%, rgba(35, 35, 35, 0.953) 90%, rgb(45, 45, 45) 100%)`;
	// knifeSvg.current.style.zIndex = "0";
	// forkSvg.current.style.zIndex = "0";
	// btnsRef.current.style.zIndex = "14";
	// btnsRef.current.style.background = "#2d2d2db6";
	setGoDown(true);
	// recipeRef.current.style.paddingTop = "15dvh";
} else if (
	goDown &&
	scrollYProgress.get() * recipeRef.current.scrollHeight <
		containerRef.current.offsetTop + btnsRef.current.offsetHeight
) {
	// btnsRef.current.style.position = "relative";
	// btnsRef.current.style.overflow = "visible";
	// btnsRef.current.style.background = "transparent";
	// knifeSvg.current.style.opacity = "1.0";
	// forkSvg.current.style.opacity = "1.0";
	// knifeSvg.current.style.zIndex = "9";
	// forkSvg.current.style.zIndex = "8";

	// btnsRef.current.style.overflowX = "hidden";
	// btnsRef.current.style.zIndex = "10";
	setGoDown(false);
	// recipeRef.current.style.paddingTop = "0dvh";
}

// const limit = btnsRef.current.scrollHeight;

// const limit = useMotionValue(0);

// useEffect(() => {
// 	limit.set(btnsRef.current.offsetHeight);
// 	// return x.on("change", (lastValue) => {
// 	// 	angle.set(
// 	// 		angle.get() + -Number((xVelocity.current / (360 / Math.PI)).toFixed(3))
// 	// 	);
// 	// });
// 	// return scrollYProgress.on("change", (latest) => {
// 	// 	if (
// 	// 		!goDown &&
// 	// 		latest * recipeRef.current.scrollHeight > containerRef.current.offsetTop
// 	// 	) {
// 	// 		btnsRef.current.style.position = "fixed";
// 	// 		setGoDown(true);
// 	// 	} else if (
// 	// 		goDown &&
// 	// 		latest * recipeRef.current.scrollHeight < containerRef.current.offsetTop
// 	// 	) {
// 	// 		btnsRef.current.style.position = "relative";
// 	// 		setGoDown(false);
// 	// 	}
// 	// });
// }, []);

// const correctIngr = prevRecState.ingredients[names.indexOf(ingrName)];
// console.log(prevRecState.ingredients[correctIngr]);

// const newIngr = prevRecState.ingredients.map((ingrObj, index) => {
// 	if (Object.keys(ingrObj)[0] === ingrName) {
// 		return { ...ingrObj, [ingrName]: value };
// 	} else {
// 		return ingrObj;
// 	}
// });

// function handleComplete(value) {
// 	const ts = value ? savedMoment : "none";
// 	// if (ts === "none") {
// 	// 	console.log("scroll");
// 	// 	window.scrollTo({
// 	// 		top: 0,
// 	// 		left: 0,
// 	// 		behavior: "smooth"
// 	// 	});
// 	// } else {
// 	// 	recipeRef.current.scrollIntoView({
// 	// 		behavior: "smooth",
// 	// 		block: "end"
// 	// 	});
// 	// }
// 	setRecipeState(() => {
// 		return {
// 			ingredients: data.extendedIngredients.map((ingredient, index) => {
// 				return { [`${ingredient.name}_${index}`]: value };
// 			}),
// 			steps: data.analyzedInstructions[0].steps.map((step) => {
// 				return { [`step-${step.number}`]: value };
// 			}),
// 			complete: {
// 				confirm: value,
// 				timestamp: ts
// 			}
// 		};
// 	});
// }

// function handleChange(event) {
// 	const target = event.target;
// 	const value = target.checked;
// 	const name = target.name;
// 	const category = name.split("-")[0];
// 	const detail = category === "ingredient" ? name.split("-")[1] : name;
// 	setRecipeState((prevRecState) => {
// 		const key = `${category}s`;
// 		return {
// 			...prevRecState,
// 			[key]: prevRecState[key].map((field) => {
// 				if (Object.keys(field)[0] === detail) {
// 					return { [detail]: value };
// 				} else {
// 					return field;
// 				}
// 			})
// 		};
// 	});
// }

// setRecipeState((prevRecState) => {
// 	return {
// 		...prevRecState,
// 		complete: {
// 			confirm: true,
// 			timestamp: savedMoment
// 		}
// 	};
// });
// setRecipeState((prevRecState) => {
// 	return {
// 		...prevRecState,
// 		complete: {
// 			confirm: false,
// 			timestamp: "none"
// 		}
// 	};
// });

// seasonalString();

// export async function getSingleData(id) {
// 	const apiKey = process.env.APIKEYSPOON;
// 	const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}
// `;
// 	const response = await fetch(url);
// 	if (!response.ok) {
// 		throw new Error("Fetch Failed");
// 	}
// 	return response.json();
// }

// const apiKey = process.env.APIKEYSPOON;

// export async function searchByQuery(text, allergens) {
// 	"use server";
// 	const excludeIngredients =
// 		allergens.length > 0
// 			? `&excludeIngredients=${allergens
// 					.map((elem) => elem.toLowerCase())
// 					.join(",")}`
// 			: "";
// 	// const url = `https://api.spoonacular.com/recipes/complexSearch?query=${text.toLowerCase()}&diet=vegetarian&fillIngredients=true${excludeIngredients}&number=50&instructionsRequired=true&addRecipeInformation=true&apiKey=${apiKey}`;
// 	const url = `https://api.spoonacular.com/recipes/complexSearch?query=${text.toLowerCase()}&diet=vegetarian${excludeIngredients}&number=50&apiKey=${apiKey}`;
// 	const res = await fetch(url);
// 	const json = await res.json();
// 	// console.log(json);
// 	return json;
// }

// export async function seasonalData() {
// 	const data = await getData();
// 	const seasonalFruit = await seasonalFrtAndVgt(data);
// 	// console.log("Here");
// 	// console.log(seasonalFruit);

// 	// console.log(seasonalFruit);
// 	// const frtAndVegArr = seasonalFruit.map((elem) => elem.name);

// 	const orderedList = seasonalFruit.map((elem) => {
// 		const name = elem.split(" - ")[0] || elem;
// 		const variety = elem.split(" - ")[1] || "All";
// 		return {
// 			[name]: [variety]
// 		};
// 	});

// 	const list = {};

// 	for (const elem of Object.values(orderedList)) {
// 		if (!list[Object.keys(elem)[0]]) {
// 			list[Object.keys(elem)[0]] = Object.values(elem)[0];
// 		} else {
// 			list[Object.keys(elem)[0]] = [
// 				...list[Object.keys(elem)[0]],
// 				...Object.values(elem)[0]
// 			];
// 		}
// 	}

// 	// console.log("Here");
// 	// console.log(list);

// 	return list;
// }

// export async function getSpoonData(list) {
// 	"use server";
// 	const apiKey = process.env.APIKEYSPOON;
// 	// const intolerances = "one,two,three,from state?";

// 	const seasonalPresence = true;
// 	// const seasonalIngr = await seasonalData();
// 	// const seasonalString = Object.keys(seasonalIngr)
// 	// 	.map((elem) => elem.toLowerCase())
// 	// 	.join(",");
// 	// console.log(seasonalString);
// 	// TESTARE URL CON LISTA OTTENUTA
// 	// Attenzione --- trasformare tutto in minuscolo
// 	const includeIngredients = list > 0 ? `&includeIngredients=${list}` : "";

// 	console.log("Here 2");
// 	// console.log(includeIngredients);

// 	// const intolerancesPresence = true;
// 	// IMPORTANTE --> CAPIRE come far leggere context o altri
// 	// dati inseriti dall'utente al server component
// 	// NOTA utile anche per ricerca ricette
// 	// const intolerancesListFromContext = ["apples", "eggs", "nuts"];
// 	// const intolerancesStrg = intolerancesListFromContext.join(",");
// 	// const excludeIngredients =
// 	// 	intolerancesListFromContext.length > 0
// 	// 		? `&excludeIngredients=${intolerancesListFromContext.join(",")}`
// 	// 		: "";

// 	const url = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&number=100&instructionsRequired=true&fillIngredients=true${includeIngredients}&addRecipeInformation=true&apiKey=${apiKey}`;

// 	// const strg =
// 	// 	"https://api.spoonacular.com/recipes/findByIngredients?ingredients=pears&number=10&apiKey=977944bb2264474782049f9e558b9143&includeNutrition=true";
// 	// const frtAndVegString = frtAndVeg.join(",");
// 	// const spoonUrl = `"https://api.spoonacular.com/recipes/findByIngredients?ingredients=${frtAndVegString}&diet=vegetarian&intolerances=${intolerances}&number=10&apiKey=${apiKey}&includeNutrition=true`;
// 	try {
// 		const spoonData = await fetch(url);
// 		const json = await spoonData.json();
// 		// console.log(json);
// 		return json;
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// export async function seasonalFrtAndVgt(arr) {
// 	const frtAndVgt = arr.map((item) => {
// 		const product = Object.keys(item);
// 		// console.log(product);
// 		// console.log(item[product]);

// 		// console.log(Object.values(item));
// 		return item[product].map((variety) => {
// 			const varietyName = Object.keys(variety);
// 			// console.log("Here");
// 			// console.log(varietyName[0]);
// 			const varietyAbbr = varietyName[0].toString().split("-")[0];
// 			const productName = `${product
// 				.toString()
// 				.slice(0, 1)
// 				.toUpperCase()}${product.toString().slice(1)}`;

// 			const varietyLabel =
// 				`${varietyName}` === `${productName}: All types and varieties`
// 					? `${productName}`
// 					: `${productName} - ${varietyAbbr}`;

// 			// console.log(varietyLabel);

// 			// Modifcare qui ---> inserire fristYear e secondYear
// 			if (!variety[varietyName]["2022_seasonality"]) {
// 				variety[varietyName]["2022_seasonality"] =
// 					variety[varietyName]["2023_seasonality"];
// 				// Condizione creata per eventuali nuove categorie di dati per prodotto,
// 				// con ovvia mancanza nell'anno precedente
// 			}

// 			const firstYearBeginDate =
// 				variety[varietyName]["2022_seasonality"].beginSeason;

// 			const firstYearEndDate =
// 				variety[varietyName]["2022_seasonality"].endSeason;

// 			const secondYearBeginDate =
// 				variety[varietyName]["2023_seasonality"].beginSeason;

// 			const secondYearEndDate =
// 				variety[varietyName]["2023_seasonality"].endSeason;

// 			// console.log(firstYearBeginDate.toLocale)

// 			function calculateTimestamps(stringDate) {
// 				const dateArray = stringDate.split("/");
// 				const date = new Date();
// 				date.setFullYear(2024);
// 				date.setDate(dateArray[0]);
// 				date.setMonth(Number(dateArray[1]) - 1);
// 				return Number(date.getTime());
// 			}

// 			function calculateRanges() {
// 				const firstYearBeginTimestamp = calculateTimestamps(firstYearBeginDate);
// 				const firstYearEndTimestamp = calculateTimestamps(firstYearEndDate);
// 				const secondYearBeginTimestamp =
// 					calculateTimestamps(secondYearBeginDate);
// 				const secondYearEndTimestamp = calculateTimestamps(secondYearEndDate);

// 				const today = Number(new Date().getTime());

// 				const firstDay = Number(new Date().setFullYear(2024, 0, 1));

// 				function yearCheckSeasonal(begin, end, now) {
// 					if (begin < end) {
// 						if (now >= begin && now <= end) {
// 							return true;
// 						} else if (now >= begin && now <= end) {
// 							return true;
// 						} else if (now < begin || now > end) {
// 							return false;
// 						}
// 					} else if (begin > end) {
// 						if (now >= begin && now <= end) {
// 							return true;
// 						} else if (now < begin || now > end) {
// 							return false;
// 						}
// 					}
// 				}

// 				const firstYearCheck = yearCheckSeasonal(
// 					firstYearBeginTimestamp,
// 					firstYearEndTimestamp,
// 					today
// 				);

// 				const secondYearCheck = yearCheckSeasonal(
// 					secondYearBeginTimestamp,
// 					secondYearEndTimestamp,
// 					today
// 				);

// 				if (firstYearCheck || secondYearCheck) {
// 					return true;
// 				} else {
// 					return false;
// 				}
// 			}
// 			return {
// 				[varietyLabel]: {
// 					"1st_from": firstYearBeginDate,
// 					"1st_to": firstYearEndDate,
// 					"2nd_from": secondYearBeginDate,
// 					"2nd_to": secondYearEndDate,
// 					seasonal: calculateRanges()
// 				}
// 			};
// 		});
// 	});

// 	// console.log("frtAndVgt");
// 	// console.log(frtAndVgt);

// 	// const today = date.getTime();

// 	// Calcolare qui frutti e verdure di stagione ora

// 	function calculateActualFrtAndVgt(data) {
// 		// console.log(data);
// 		const actualFrtAndVgt = [];
// 		data.map((prod) => {
// 			// console.log(prod);
// 			return prod.map((variety) => {
// 				const name = Object.keys(variety)[0];
// 				// console.log(Object.keys(variety)[0]);
// 				// console.log(variety);
// 				if (variety[name].seasonal === true) {
// 					// console.log(name);
// 					actualFrtAndVgt.push(name);
// 				}
// 			});
// 			// return prod.map((variety) => {
// 			// 	const varietyName = Object.keys(variety)[0];
// 			// 	const varietyData = variety[varietyName].seasonality;
// 			// 	Object.entries(varietyData).map((elem) => {
// 			// 		if (timestamp >= elem[1].from && timestamp <= elem[1].to) {
// 			// 			actualFrtAndVgt.push({
// 			// 				product: varietyName.split(" - ")[0],
// 			// 				variety: varietyName.split(" - ")[1] || "All",
// 			// 				seasonal: true,
// 			// 				phase: elem[0]
// 			// 			});
// 			// 		} else {
// 			// 			return;
// 			// 		}
// 			// 	});
// 			// });
// 		});
// 		return actualFrtAndVgt;
// 	}

// 	return calculateActualFrtAndVgt(frtAndVgt);
// }

// console.log(filteredList);

// const listTest = state.initialList.filter((recipe) => {
// 	for (let intol of intolerancesArr) {
// 		if (recipe[`${intol}Free`] === true) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}
// });
// const set = new Set();
// // const newList = [];

// for (let recipe of state.recipesList) {
// 	for (let intol of intolerancesArr) {
// 		if (
// 			// recipe[`${intol}Free`] !== undefined &&
// 			recipe[`${intol}Free`] === true
// 		) {
// 			// newList.push(recipe);
// 			set.add(recipe.id);
// 		}
// 		// else if (recipe[`${intol}Free`] === undefined) {
// 		// 	// Temporaneo
// 		// 	set.add(recipe.id);
// 		// }
// 		// Aggiungere in seguito ad eventuale nuova
// 		// integrazione recipes, o forse no
// 		// else if (recipe[`${intol}Free`] === undefined) {
// 		// 	const ingrList = recipe["extendedIngredients"].map(
// 		// 		(ingr) => ingr.name
// 		// 	);
// 		// 	console.log();
// 		// }
// 	}
// }

// 	if (
// 		(allergiesSettings.length > 0 || intolerancesSettings.length > 0) &&
// 		pathname !== "/profile"
// 		// allergiesSettings.length > 0 ||
// 		// intolerancesSettings.length > 0
// 	) {
// 		// const filterByAllergiesList = allergiesFilter(
// 		// 	recipesList,
// 		// 	allergiesSettings
// 		// );
// 		// const filterByIntolerancesList = intolerancesFilter(
// 		// 	filterByAllergiesList,
// 		// 	intolerancesSettings
// 		// );

// 		// const uniqueRecipesList = getUniqueElem(filterByIntolerancesList);

// 		// console.log(uniqueRecipesList);

// 		if (uniqueRecipesList.length < 80) {
// 			createList(uniqueRecipesList);
// 		} else {
// 			console.log("Filtered only");
// 			// setNewList(uniqueRecipesList);
// 			// dispatchRedux(reInitializeRecipes(uniqueRecipesList));
// 		}

// 		// return filterByIntolerancesList.length <= 80
// 		// 	? createList(filterByIntolerancesList)
// 		// 	: setNewList(filterByIntolerancesList);
// 	}

// filterByAllergy: (state, action) => {
// 			const filteredList = state.recipesList.filter((recipe) => {
// 				// return
// 				const dangIngredients = recipe.extendedIngredients
// 					.map((elem) => elem.name)
// 					.filter((ingr) => String(ingr) === action.name);
// 				if (dangIngredients > 0) {
// 					return false;
// 				} else {
// 					return true;
// 				}
// 				// const check = ingredients.map()
// 			});
// 			return {
// 				...state,
// 				recipesList: filteredList
// 			};
// 		},
// 		filterByAllergies: (state, action) => {
// 			const allergiesList = action.payload;
// 			if (allergiesList.length > 0) {
// 				console.log(allergiesList);

// 				const selectedList = state.recipesList
// 					// .map((recipe) => {
// 					// 	const ingrs = recipe.extendedIngredients.map((ingr) => ingr.name);
// 					// 	const checked = [];
// 					// 	for (let ingr of ingrs) {
// 					// 		for (let allergy of allergiesList) {
// 					// 			if (ingr.includes(allergy)) {
// 					// 				checked.push(allergy);
// 					// 			}
// 					// 		}
// 					// 	}
// 					// 	return {
// 					// 		...recipe,
// 					// 		allergyCheck: checked.length > 0
// 					// 	};
// 					// })
// 					.filter((recipe) => {
// 						const ingrs = recipe.extendedIngredients.map((ingr) => ingr.name);
// 						const danger = [];
// 						// for (let allergy of allergiesList) {
// 						// 	if (ingrs.includes(allergy) || ingrs.includes(`${allergy}s`)) {
// 						// 		danger.push(allergy);
// 						// 	}
// 						// }
// 						for (let ingr of ingrs) {
// 							for (let allergy of allergiesList) {
// 								if (ingr.includes(allergy)) {
// 									danger.push(ingr);
// 								}
// 							}
// 						}
// 						if (danger.length > 0) {
// 							return false;
// 						} else {
// 							return true;
// 						}
// 					});

// 				return {
// 					...state,
// 					recipesList: selectedList
// 				};
// 			}
// 			// else {
// 			// 	return {
// 			// 		...state,
// 			// 		recipesList: state.initialList
// 			// 	};
// 			// }
// 		},
// 		filterByIntolerances: (state, action) => {
// 			console.log(action.payload);
// 			const intolerancesArr = action.payload.intolerances;
// 			const allergiesArr = action.payload.allergies;

// 			if (intolerancesArr.length > 0) {
// 				const filteredList = state.initialList
// 					.map((recipe) => {
// 						const keys = Array.from(Object.keys(recipe));
// 						const intolList = [];
// 						for (let key of keys) {
// 							if (key.includes("Free")) {
// 								if (recipe[key] === true) {
// 									intolList.push(`${key.slice(0, -4)}`);
// 								}
// 							}
// 						}
// 						return {
// 							...recipe,
// 							intolFree: intolList
// 						};
// 					})
// 					.filter((recipe) => {
// 						const check = [];
// 						for (let intol of intolerancesArr) {
// 							if (recipe["intolFree"].includes(intol)) {
// 								check.push(intol);
// 							}
// 						}
// 						if (check.length === intolerancesArr.length) {
// 							return true;
// 						} else {
// 							return false;
// 						}
// 					});

// 				return {
// 					...state,
// 					recipesList: filteredList
// 				};
// 			} else if (intolerancesArr.length === 0) {
// 				return {
// 					...state,
// 					recipesList:
// 						allergiesArr.length > 0
// 							? [...state.recipesList]
// 							: [...state.initialList]
// 				};
// 			}
// 		}

// Inserire chiamata a Server Action translateRecipe
// const summary = await data["summary"];
// const analyzedInstructions = await data["analyzedInstructions"];
// const extendedIngredients = await data["extendedIngredients"];

// const analyzedInstructionsTexts = await analyzedInstructions[0]["steps"].map(
// 	(step) => {
// 		const arrTexts = [];
// 		if (step["step"]) {
// 			arrTexts.push(step["step"]);
// 		}

// 		if (step["equipment"].length > 0) {
// 			step["equipment"].map((tool) => {
// 				return arrTexts.push(
// 					`${tool.name[0].toUpperCase()}${tool.name.slice(1)}`
// 				);
// 			});
// 		}
// 		if (step["ingredients"].length > 0) {
// 			step["ingredients"].map((ingr) => {
// 				return arrTexts.push(
// 					`${ingr.name[0].toUpperCase()}${ingr.name.slice(1)}`
// 				);
// 			});
// 		}
// 		return arrTexts.join(" | ");
// 	}
// );

// const ingredientsNamesList = await extendedIngredients.map((ingredient) => {
// 	return `${ingredient.original[0].toUpperCase()}${ingredient.original.slice(
// 		1
// 	)}`;
// });
// const translateSummary = await deeplTranslate([summary], lang);
// const translateInstructionsText = await deeplTranslate(
// 	analyzedInstructionsTexts,
// 	lang
// );
// const translateIngredients = await deeplTranslate(ingredientsNamesList, lang);

// const instructionsCompleteArr = await translateInstructionsText.map((elem) =>
// 	elem.text.split(" | ")
// );

// const stepsTranslated = await analyzedInstructions[0]["steps"].map(
// 	(step, index) => {
// 		const translatedCompleteStep = instructionsCompleteArr[index];
// 		const equipmentLength = step["equipment"].length;
// 		const ingredientsLength = step["ingredients"].length;

// 		return {
// 			...step,
// 			number: index + 1,
// 			step: translatedCompleteStep[0],
// 			equipment:
// 				step["equipment"].length > 0
// 					? step["equipment"].map((tool, toolIndex) => {
// 							const toolsList = translatedCompleteStep.slice(
// 								1,
// 								translatedCompleteStep.length - ingredientsLength
// 							);
// 							return {
// 								...tool,
// 								name: toolsList[toolIndex]
// 							};
// 					  })
// 					: [],
// 			ingredients:
// 				step["ingredients"].length > 0
// 					? step["ingredients"].map((ingr, ingrIndex) => {
// 							const listIngr = translatedCompleteStep.slice(
// 								equipmentLength + 1,
// 								translatedCompleteStep.length + 1
// 							);
// 							return {
// 								...ingr,
// 								id: ingr.id,
// 								name: listIngr[ingrIndex]
// 							};
// 					  })
// 					: []
// 		};
// 	}
// );

// const extendedIngrsTranslated = await extendedIngredients.map(
// 	(ingrObj, indexIngr) => {
// 		return {
// 			...ingrObj,
// 			original: translateIngredients[indexIngr].text
// 		};
// 	}
// );

// const newData = {
// 	...data,
// 	summary: translateSummary[0].text,
// 	analyzedInstructions: [{ ["steps"]: stepsTranslated }],
// 	extendedIngredients: extendedIngrsTranslated
// };

// const internalData = recipes.filter(
// 	(recipe) => String(recipe.id) === String(params.id)
// );
// if (internalData.length === 0) {
// Salvare ricetta tramite reduxDispatch se non presente
// ...(internalData llo indica) in initialList
// NO, qui non si ha accesso al context, inserire in SinglePage
// se non presente
// }
// console.log(internalData);

// useEffect(() => {
// 	if (settingsType === "saved") {
// 		const localRecipes = JSON.parse(localStorage.getItem("settings"))[
// 			"saved-recipes"
// 		];
// 		console.log(localRecipes);

// 		if (localRecipes.length >= 0) {
// 			// const saved = [
// 			// 	...defaultRecipes.map((elem, index) => {
// 			// 		if (localRecipes[index]) {
// 			// 			return localRecipes.at(index);
// 			// 		} else {
// 			// 			return {
// 			// 				...elem,
// 			// 				id: Number(`-${elem.id}`),
// 			// 				title: emptyInd[index],
// 			// 				image: altImage
// 			// 				// readyInMinutes: 0,
// 			// 				// extendedIngredients: [],
// 			// 				// likes: 0
// 			// 			};
// 			// 		}
// 			// 	})
// 			// ];
// 			const savedList = createSavedList(localRecipes, defaultRecipes);
// 			console.log(savedList);

// 			setRecipes(() => {
// 				return [...savedList];
// 			});
// 		} else {
// 			return;
// 		}
// 	}
// }, [settingsType]);

// useEffect(() => {
// 	if (settingsType === "saved") {
// 		const localSettings = localStorage.getItem("settings");
// 		const localParsed = JSON.parse(localSettings);
// 		if (localSettings && localParsed["saved-recipes"].length > 0) {
// 			// dispatch({
// 			// 	type: "set_context",
// 			// 	payload: localSettings["saved-recipes"]
// 			// });
// 			// const savedRec = defaultRecipes.map((elem, index) => {
// 			// 	if (localParsed["saved-recipes"][index]) {
// 			// 		return { ...localParsed["saved-recipes"].at(index) };
// 			// 	} else {
// 			// 		return {
// 			// 			...elem,
// 			// 			id: emptyInd[index],
// 			// 			title: emptyInd[index]
// 			// 			// image: elem.image,
// 			// 			// readyInMinutes: 0,
// 			// 			// extendedIngredients: [],
// 			// 			// likes: 0
// 			// 		};
// 			// 	}
// 			// });
// 			setRecState(() => {
// 				return [...localParsed["saved-recipes"]];
// 			});
// 		}
// 	}
// }, []);

// useEffect(() => {
// 	// if (settingsType === "seasonal") {
// 	// 	setRecipes(() => {
// 	// 		return seasonalRecipes;
// 	// 	});
// 	// } else
// 	if (settingsType === "saved") {
// 		const saved = defaultRecipes.map((elem, index) => {
// 			if (recState[index]) {
// 				return recState.at(index);
// 			} else {
// 				return {
// 					...elem,
// 					id: emptyInd[index],
// 					title: emptyInd[index],
// 					image: altImage
// 					// readyInMinutes: 0,
// 					// extendedIngredients: [],
// 					// likes: 0
// 				};
// 			}
// 		});
// 		console.log("saved");
// 		setRecipes(() => {
// 			return [...saved];
// 		});
// 	}
// }, [recState]);

// useEffect(() => {
// 	const localStorageSettings = window.localStorage.getItem("settings")
// 		? JSON.parse(window.localStorage.getItem("settings"))
// 		: null;
// 	const localSaved = localStorageSettings["saved-recipes"];
// 	if (localSaved.length > 0) {
// 		console.log("true");
// 		// dispatch({
// 		// 	type: "set_context",
// 		// 	payload: localStorageSettings
// 		// });
// 		setRecipes((prevValue) => {
// 			return [
// 				...prevValue.map((elem, index) => {
// 					if (localSaved[index]) {
// 						return localSaved.at(index);
// 					} else {
// 						return {
// 							...elem
// 							// id: emptyInd[index],
// 							// title: emptyInd[index]
// 							// image: elem.image,
// 							// readyInMinutes: 0,
// 							// extendedIngredients: [],
// 							// likes: 0
// 						};
// 					}
// 				})
// 			];
// 		});
// 	}
// }, []);

// const [recipes, setRecipes] = useState([...defaultRecipes]);
// <--- aggiungere defaultRecipes se saved 0
// <--- modificare savedRecipes in modo che se >=1 o < 8...
// si aggiunga indicazione al salvataggio e search come link
// nel Modal

// useEffect(() => {
// 	const localSettings = JSON.parse(localStorage.getItem("settings"));
// 	console.log(localSettings);
// 	const type = localSettings["tomato-settings"]["recipes-type"];
// 	const saved = localSettings["saved-recipes"];

// 	if (type === "seasonal") {
// 		setRecipes(() => {
// 			return [...seasonalRecipes];
// 		});
// 	} else if (type === "saved") {
// const savedRecipesComplete = [
// 	...emptyInd.map((elem, index) => {
// 		if (saved[index]) {
// 			return saved[index];
// 		} else {
// 			return {
// 				id: elem,
// 				title: elem,
// 				image: altImage,
// 				readyInMinutes: 0,
// 				extendedIngredients: [],
// 				likes: 0
// 			};
// 		}
// 	})
// ];
// 		console.log("savedComplete");

// 		console.log(savedRecipesComplete);
// 		setRecipes(() => {
// 			return savedRecipesComplete;
// 		});
// 	}
// }, []);

// localStorage / saved Effect
// useEffect(() => {
// 	const settings = JSON.parse(localStorage.getItem("settings"));
// 	console.log(settings);
// 	if (settings["tomato-settings"]["recipes-type"] === "saved") {
// 		const savedRecipesComplete = [
// 			...emptyInd.map((elem, index) => {
// 				if (settings["saved-recipes"][index]) {
// 					return settings["saved-recipes"];
// 				} else {
// 					return {
// 						id: elem,
// 						title: elem,
// 						image: altImage,
// 						readyInMinutes: 0,
// 						extendedIngredients: [],
// 						likes: 0
// 					};
// 				}
// 			})
// 		];
// 		setRecipes(() => {
// 			return savedRecipesComplete;
// 		});
// 	}
// }, []);

// const [saved, setSaved] = useState([
// 	...defaultRecipes.map((elem, index) => {
// 		if (recState[index]) {
// 			return recState.at(index);
// 		} else {
// 			return {
// 				// ...elem,
// 				id: Number(`-${elem.id}`),
// 				title: emptyInd[index],
// 				image: altImage
// 				// readyInMinutes: 0,
// 				// extendedIngredients: [],
// 				// likes: 0
// 			};
// 		}
// 	})
// ]);

// const savedRecipes = settings["saved-recipes"];
// const [savedRecipes, setSavedRecipes] = useState([...defaultRecipes]);

// for (let i = 0; i <= 8; i++) {
// 	if (list[i]) {
// 		savedSet.add(list[i]);
// 	} else {
// 		const emptyElem = {
// 			...defaultRecipes[i],
// 			id: Number(`-${defaultRecipes[i].id}`),
// 			title: emptyInd[i],
// 			image: altImage.src
// 		};
// 		console.log(emptyElem);

// 		savedSet.add(emptyElem);
// 		return;
// 	}
// }

// const savedRecipesComplete = [...new Array(8)].map((elem, index) => {
// 	return savedRecipes[index] !== undefined || savedRecipes[index] !== null
// 		? savedRecipes[index]
// 		: {
// 				id: `${self.crypto.randomUUID()}`,
// 				title: emptyIndications[index],
// 				image: altImage,
// 				readyInMinutes: 0,
// 				extendedIngredients: [].length,
// 				likes: 0
// 		  };
// });

// const [savedRecipesComplete, setSavedRecipesComplete] = useState([
// 	...emptyInd.map((elem, index) => {
// 		if (savedRecipes[index]) {
// 			return savedRecipes[index];
// 		} else {
// 			return {
// 				id: elem,
// 				title: elem,
// 				image: altImage,
// 				readyInMinutes: 0,
// 				extendedIngredients: [],
// 				likes: 0
// 			};
// 		}
// 	})
// ]);

// const emptySavedList = [...new Array(8)].map((elem, index) => {
// 	return {
// 		id: emptyIndications[index].length + index,
// 		title: emptyIndications[index],
// 		image: altImage,
// 		readyInMinutes: 0,
// 		extendedIngredients: [].length,
// 		likes: 0
// 	};
// });

// const [saved, setSaved] = useState(
// 	[...new Array(8)].map((elem, index) => {
// 		return savedRecipes[index] !== undefined || savedRecipes[index] !== null
// 			? savedRecipes[index]
// 			: {
// 					id: emptyIndications[index],
// 					title: emptyIndications[index],
// 					image: altImage,
// 					readyInMinutes: 0,
// 					extendedIngredients: [].length,
// 					likes: 0
// 			  };
// 	})
// );
// const [recState, setRecState] = useState([]);

// const savedRecipesComplete = defaultRecipes;
// console.log(savedRecipesComplete);

// console.log("seasonal recipes");
// console.log(
// 	cleanList.find((recipe) => Number(seasonalListIDs[0]) === recipe.id)
// );
// console.log(seasonalRecipes);

// test

// const cleanList = completeList["results"].map((recipe) => {
// 	const {
// 		id,
// 		title,
// 		aggregateLikes,
// 		analyzedInstructions,
// 		diaryFree,
// 		extendedIngredients,
// 		glutenFree,
// 		image,
// 		readyInMinutes,
// 		servings,
// 		summary,
// 		vegan,
// 		vegetarian
// 	} = recipe;

// 	const ingrsNames = extendedIngredients.map((ingr) => ingr.name);

// 	function detectIntolerance(name) {
// 		const intolList = intolerancesObj[name];
// 		const detected = [];
// 		for (let name of ingrsNames) {
// 			for (let intol of intolList) {
// 				if (String(name).includes(intol)) {
// 					detected.push(intol);
// 				}
// 			}
// 		}
// 		if (detected.length > 0) {
// 			return false;
// 		} else {
// 			return true;
// 		}
// 	}

// 	const eggFree = detectIntolerance("egg");
// 	const grainFree = detectIntolerance("grain");
// 	const peanutFree = detectIntolerance("peanut");
// 	const seafoodFree = detectIntolerance("seafood");
// 	const sesameFree = detectIntolerance("sesame");
// 	const shellfishFree = detectIntolerance("shellfish");
// 	const soyFree = detectIntolerance("soy");
// 	const sulfiteFree = detectIntolerance("sulfite");
// 	const treeNutFree = detectIntolerance("treeNut");
// 	const wheatFree = detectIntolerance("wheat");

// 	return {
// 		...recipe,
// 		id: id,
// 		title: title,
// 		aggregateLikes: aggregateLikes,
// 		analyzedInstructions: analyzedInstructions,
// 		diaryFree: diaryFree,
// 		extendedIngredients: extendedIngredients,
// 		glutenFree: glutenFree,
// 		eggFree: eggFree,
// 		grainFree: grainFree,
// 		peanutFree: peanutFree,
// 		seafoodFree: seafoodFree,
// 		sesameFree: sesameFree,
// 		shellfishFree: shellfishFree,
// 		soyFree: soyFree,
// 		sulfiteFree: sulfiteFree,
// 		treeNutFree: treeNutFree,
// 		wheatFree: wheatFree,
// 		image: image,
// 		readyInMinutes: readyInMinutes,
// 		servings: servings,
// 		summary: summary,
// 		vegan: vegan,
// 		vegetarian: vegetarian
// 	};
// });

// old

// useEffect(() => {
// 	let ignore = false;
// 	console.log("LOcal");
// 	async function setLocalStorage() {
// 		const localStorageSettings = await window.localStorage.getItem(
// 			"settings"
// 		);
// 		if (!ignore) {
// 			if (!localStorageSettings) {
// 				dispatch({
// 					type: "set_context",
// 					payload: initialSettings
// 				});
// 				window.localStorage.setItem("settings", JSON.stringify(settings));
// 			} else {
// 				dispatch({
// 					type: "set_context",
// 					payload: await JSON.parse(localStorageSettings)
// 				});
// 			}
// 		}
// 	}
// 	setLocalStorage();
// 	return () => {
// 		ignore = true;
// 	};
// }, []);

// old GeneralContext

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

// const initialValue = localStorage.getItem("settings")
// 	? localStorage.getItem("settings")
// 	: initialSettings;

// const emptyIndications = [
// 	"Cerca una ricetta...",
// 	"Search for a recipe...",
// 	"Nach einem Rezept suchen...",
// 	"Zoek een recept...",
// 	"Rechercher une recette...",
// 	"Busca una receta...",
// 	"Procure uma receita...",
// 	"Sök efter ett recept..."
// ];

// const emptySavedList = [...new Array(8)].map((elem, index) => {
// 	return {
// 		id: emptyIndications[index].length + index,
// 		title: emptyIndications[index],
// 		image: altImage,
// 		readyInMinutes: 0,
// 		extendedIngredients: [].length,
// 		likes: 0
// 	};
// });

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

// const localStorageSettings = JSON.parse()
// ? JSON.parse(window.localStorage.getItem("settings"))
// : null;
// if (localStorageSettings["tomato-settings"]["recipes-type"] === "saved") {

// test

// const initialSettings = {};

// test
// console.log(local);

// const [localData, setLocalData] = useState(initialSettings);

// const initialValue = JSON.parse(window.localStorage.getItem("settings"));
// const initial = initialValue ? initialValue : initialSettings;

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

// Da NavigationEvents

// function intolerancesFilter(list, intolerancesArr) {
// 	// const checkedList = list.filter((recipe) => {
// 	// 	for (let intol of intolerancesArr) {
// 	// 		console.log("Intol -> " + intol);
// 	// 		if (recipe[`${intol}Free`] !== undefined) {
// 	// 			if (recipe[`${intol}Free`] === false) {
// 	// 				return false;
// 	// 			} else {
// 	// 				return true;
// 	// 			}
// 	// 		} else {
// 	// 			return true;
// 	// 		}
// 	// 	}
// 	// });
// 	// // return checkedList;

// 	// const filtered
// 	// for (let recipe of list) {
// 	// 	const checked = intolerancesArr.filter((intol) => {
// 	// 		return recipe[`${intol}Free`] === true;
// 	// 	});
// 	// }
// 	// const existFilter =

// 	const newList = [];

// 	for (let recipe of list) {
// 		for (let intol of intolerancesArr) {
// 			if (
// 				recipe[`${intol}Free`] !== undefined &&
// 				recipe[`${intol}Free`] === true
// 			) {
// 				newList.push(recipe);
// 			} else if (recipe[`${intol}Free`] === undefined) {
// 				// Temporaneo
// 				newList.push(recipe);
// 			}
// 			// Aggiungere in seguito ad eventuale nuova
// 			// integrazione recipes, o forse no
// 			// else if (recipe[`${intol}Free`] === undefined) {
// 			// 	const ingrList = recipe["extendedIngredients"].map(
// 			// 		(ingr) => ingr.name
// 			// 	);
// 			// 	console.log();
// 			// }
// 		}
// 	}
// 	return newList;
// }

// function getUniqueElem(arr) {
// 	const set = new Set();

// 	for (let item of arr) {
// 		set.add(item.id);
// 	}

// 	const list = Array.from(set).map((id) => {
// 		return { ...arr.filter((item) => String(item.id) === String(id))[0] };
// 	});
// 	return list;
// }

// ---------- From Navigation

// function allergiesFilter(list, paramsArr) {
// 	const selectedList = list
// 		.map((recipe) => {
// 			const ingrs = recipe.extendedIngredients.map((ingr) => ingr.name);
// 			const checked = [];
// 			for (let ingr of ingrs) {
// 				for (let param of paramsArr) {
// 					if (ingr.includes(param)) {
// 						checked.push(param);
// 					}
// 				}
// 			}
// 			return {
// 				...recipe,
// 				allergyCheck: checked.length > 0
// 			};
// 		})
// 		.filter((elem) => elem.allergyCheck === false);
// 	return selectedList;
// }
