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
