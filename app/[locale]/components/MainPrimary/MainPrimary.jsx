"use client";

import {
	useState,
	useEffect,
	useRef,
	useContext,
	Fragment,
	useCallback,
	Suspense
} from "react";

// import { useOrientation } from "react-use";

import Image from "next/image";

import { useTranslation } from "react-i18next";

import {
	GeneralContext,
	GeneralDispatchContext
} from "@/app/generalContext/GeneralContext";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setError } from "@/lib/features/recipes/recipesSlice";

import {
	motion,
	AnimatePresence,
	useMotionValue,
	useVelocity,
	useMotionValueEvent,
	useMotionTemplate,
	useAnimate,
	usePresence,
	transform,
	stagger
} from "framer-motion";

import AnimatedText from "@/app/[locale]/components/AnimatedText/AnimatedText";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import SearchResult from "@/app/components/SearchResult/SearchResult";
import Flower from "@/app/[locale]/components/FlowerComponent/Flower";
import { Modal } from "@/app/[locale]/components/Modal/Modal";
import ErrorModal from "@/app/components/ErrorModal/ErrorModal";

import { great_vibes } from "@/app/utils/fonts/fonts";
import styles from "./MainPrimary.module.css";

import bkgImage from "@/public/retina-wood.svg";
// import bkgImage from "@/public/treeSection.svg";
// import bkgImage from "@/public/testrunk.svg";

import altImage from "@/public/plusCircleTrans.svg";
import fallbackImg from "@/public/tableNapkin.svg";
import { GoX } from "react-icons/go";
import { useRouter } from "next/navigation";

export default function MainPrimary({ defaultRecipes, searchByQuery }) {
	const { recipesList, seasonalRecipes, errorsReport } = useAppSelector(
		(state) => state.recipes
	);
	const reduxDispatch = useAppDispatch();

	const { t } = useTranslation();

	const generalDispatch = useContext(GeneralDispatchContext);
	const settings = useContext(GeneralContext);

	const allergens =
		settings["tomato-settings"]["allergens-list"].length > 0
			? settings["tomato-settings"]["allergens-list"].map((elem) =>
					elem.toLowerCase()
			  )
			: [];

	const intolerances =
		settings["tomato-settings"]["intolerances-list"].length > 0
			? settings["tomato-settings"]["intolerances-list"].map((elem) =>
					elem.toLowerCase()
			  )
			: [];

	const [emptyInd, setEmptyInd] = useState([
		"Cerca una ricetta...",
		"Search for a recipe...",
		"Nach einem Rezept suchen...",
		"Zoek een recept...",
		"Rechercher une recette...",
		"Busca una receta...",
		"Procure uma receita...",
		"Sök efter ett recept..."
	]);

	const savedSettings = settings["saved-recipes"];
	const savedRecipes = createSavedList(savedSettings, defaultRecipes);

	const settingsType = settings["tomato-settings"]["recipes-type"];

	const [recipes, setRecipes] = useState(
		settingsType === "seasonal"
			? seasonalRecipes.length > 0
				? [...seasonalRecipes]
				: [...defaultRecipes]
			: savedRecipes
	);

	const [recipeData, setRecipeData] = useState({
		id: recipes[0]?.id,
		title: recipes[0]?.title,
		time: recipes[0]?.readyInMinutes,
		ingrNum: recipes[0]?.extendedIngredients.length,
		likes: recipes[0]?.likes
	});
	const [showModal, setShowModal] = useState(false);

	const [view, setView] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const [searchData, setSearchData] = useState({
		type: "default",
		results: []
	});

	const errorsValues = Array.from(Object.values(errorsReport));
	const errorCheck = errorsValues.filter((elem) => elem !== null)[0] || null;
	const errorsMsgs = [];
	if (errorCheck) {
		for (const [key, value] of Object.entries(errorsReport)) {
			if (value !== null) {
				errorsMsgs.push({ from: key, message: value });
			}
		}
	}

	const [showError, setShowError] = useState(Boolean(errorCheck));

	const formRef = useRef(null);
	const carouselRef = useRef(null);
	// const flowerRef = useRef(null);

	const recipeRef = useRef(null);
	// const menuRef = useRef(null);
	const internal = useRef(null);

	const sectionRef = useRef(null);
	const moveRef = useRef(null);
	const titleRef = useRef(null);

	const circHole = useRef(null);

	const filteredList = recipesList.filter((recipe) =>
		recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const theta = [
		0,
		Math.PI / 4,
		Math.PI / 2,
		3 * (Math.PI / 4),
		Math.PI,
		5 * (Math.PI / 4),
		3 * (Math.PI / 2),
		7 * (Math.PI / 4)
	];

	function createSavedList(list, defaultList) {
		const savedSet = new Set();

		defaultList.map((elem, index) => {
			if (list.at(index)) {
				savedSet.add(list.at(index));
			} else {
				const emptyElem = {
					...elem,
					id: Number(`-${elem.id}`),
					title: emptyInd[index],
					image: altImage.src
				};

				savedSet.add(emptyElem);
				return;
			}
		});
		return Array.from(savedSet);
	}

	function handleChange(event) {
		if (event.target.value.length > 0) {
			setView(true);
		} else {
			setView(false);
		}
		setSearchTerm(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (searchTerm.length > 0 && navigator.onLine) {
			try {
				const response = await searchByQuery(
					searchTerm,
					allergens,
					intolerances
				);
				if (response?.error) {
					reduxDispatch(setError({ name: "query", message: response.error }));
				}
				if (response["totalResults"] > 0) {
					setSearchData({ type: "positive", results: response["results"] });
				} else {
					setSearchData({ type: "empty", results: response["results"] });
				}
			} catch (error) {
				reduxDispatch(setError({ name: "submit", message: error.message }));
			}
		} else if (!navigator.onLine) {
			setShowError(true);
		} else {
			return;
		}
		formRef.current.children[0].children[1].blur();
		// console.log(formRef.current.children[0].children[1]);
	}

	const handleCloseTab = useCallback(() => {
		if (searchData.results.length > 0) {
			setSearchData({ type: "default", results: [] });
		}
		setSearchTerm("");
		setView(() => {
			return false;
		});
	}, [searchData.results.length]);

	function getMap() {
		if (!recipeRef.current) {
			recipeRef.current = new Map();
		}
		return recipeRef.current;
	}

	function handleOpenDetails() {
		const actualRecipe = recipes.filter(
			(recipe) => recipe.title === titleRef.current.textContent
		)[0];
		setRecipeData({
			id: actualRecipe.id,
			title: actualRecipe.title,
			time: actualRecipe.readyInMinutes,
			ingrNum: actualRecipe.extendedIngredients.length,
			likes: actualRecipe.aggregateLikes
		});
		setShowModal(true);
	}

	function handleCloseDetails(text) {
		titleRef.current.textContent = text;
		setShowModal(false);
	}

	const angle = useMotionValue(0);
	const x = useMotionValue(0);
	const xVelocity = useVelocity(x);

	const [resize, setResize] = useState(false);

	// Positioning Effect

	const [platesScope, animatePlates] = useAnimate();

	useEffect(() => {
		// console.log("resize effect");
		// if (!resize) {
		const sectionDim = sectionRef.current.getBoundingClientRect();
		const searchbarDim = formRef.current.children[0].getBoundingClientRect();
		const searchbarCenterX =
			sectionDim.x + searchbarDim.left + searchbarDim.width / 2;
		const searchbarCenterY = searchbarDim.top + searchbarDim.height / 2;
		const carouselDim = carouselRef.current.getBoundingClientRect();
		const flowerDim = flowerRef.current.getBoundingClientRect();

		moveRef.current.style.top =
			formRef.current.getBoundingClientRect().bottom + "px";
		moveRef.current.style.height =
			titleRef.current.parentElement.getBoundingClientRect().bottom -
			formRef.current.getBoundingClientRect().bottom +
			"px";

		flowerRef.current.style.top =
			searchbarCenterY - flowerDim.height / 2 - 3 + "px";
		flowerRef.current.style.left =
			searchbarCenterX - flowerDim.width / 2 + "px";
		carouselRef.current.style.top =
			searchbarCenterY - carouselDim.height / 2 - 3 + "px";

		// const measuresContainer = menuRef.current.getBoundingClientRect();
		// const measuresInternal = internal.current.getBoundingClientRect();

		// const hypY =
		// 	(measuresContainer.height / 2 + measuresInternal.height / 2) / 2;
		// const hypX = (measuresContainer.width / 2 + measuresInternal.width / 2) / 2;

		// function placePlate(itemId, index) {
		// 	const map = getMap();
		// 	const node = map.get(itemId);

		// 	node.style.top =
		// 		hypY * Math.sin(theta[index] + Math.PI / 2) -
		// 		node.getBoundingClientRect().height / 2 +
		// 		measuresInternal.height / 2 +
		// 		"px";
		// 	node.style.left =
		// 		hypX * Math.cos(theta[index] + Math.PI / 2) -
		// 		node.getBoundingClientRect().width / 2 +
		// 		measuresInternal.width / 2 +
		// 		"px";
		// }

		// recipes.map((recipe, index) => {
		// 	// if (resize) {
		// 	return placePlate(recipe.title, index);
		// 	// }
		// });

		// return () => {
		// 	setResize(false);
		// };

		const measuresContainer = menuRef.current.getBoundingClientRect();
		const measuresInternal = internal.current.getBoundingClientRect();
		const hypY =
			(measuresContainer.height / 2 + measuresInternal.height / 2) / 2;
		const hypX = (measuresContainer.width / 2 + measuresInternal.width / 2) / 2;

		// console.log("plates: " + hypY + " " + hypX);
		// console.log(measuresContainer);

		function placePlate(itemId, index) {
			const map = getMap();
			const node = map.get(itemId);

			// console.log(node);
			// animatePlates(node, {
			node.style.top =
				hypY * Math.sin(theta[index] + Math.PI / 2) -
				// Number(getComputedStyle(node).height.slice(0, -2)) / 2 +
				node.clientHeight / 2 +
				measuresInternal.height / 2 +
				// 5 +
				"px";
			node.style.left =
				hypX * Math.cos(theta[index] + Math.PI / 2) -
				// Number(getComputedStyle(node).width.slice(0, -2)) / 2 +
				node.clientWidth / 2 +
				measuresInternal.width / 2 +
				// 5 +
				"px";
			// });
			console.log("placePlate");
		}

		recipes.map((recipe, index) => {
			// if (resize) {
			return placePlate(recipe.title, index);
			// }
		});
		// }
	}, [recipes]);

	// const w = useMotionValue(null);

	// useEffect(() => {
	// 	// if (resize) {
	// 	const measuresContainer = menuRef.current.getBoundingClientRect();
	// 	const measuresInternal = internal.current.getBoundingClientRect();

	// 	// console.log("measuresContainer: ");
	// 	// console.log(measuresInternal);

	// 	// const hypY = measuresContainer.height / 2 - measuresInternal.height / 2;
	// 	// const hypX = measuresContainer.width / 2 - measuresInternal.width / 2;

	// 	const hypY =
	// 		(measuresContainer.height / 2 + measuresInternal.height / 2) / 2;
	// 	const hypX = (measuresContainer.width / 2 + measuresInternal.width / 2) / 2;

	// 	console.log("plates: " + hypY + " " + hypX);
	// 	console.log(measuresContainer);

	// 	function placePlate(itemId, index) {
	// 		const map = getMap();
	// 		const node = map.get(itemId);

	// 		// console.log(node.getBoundingClientRect());

	// 		animatePlates(node, {
	// 			// transform: `translateX(${hypX * Math.cos(theta[index] + Math.PI / 2)}px) translateY(${hypX * Math.cos(theta[index] + Math.PI / 2)}px)`
	// 			top:
	// 				// hypY * Math.sin(theta[index] + Math.PI / 2) +
	// 				// hypY +
	// 				// 0 +
	// 				// // measuresInternal.height / 4 +
	// 				// // measuresContainer.top / 2 +
	// 				// // node.getBoundingClientRect().height / 2 +
	// 				// // measuresInternal.height / 4 +
	// 				// // 50 +
	// 				// // measuresContainer.height / 2 +
	// 				// // node.getBoundingClientRect().height / 2 +
	// 				// // measuresInternal.height / 2 +
	// 				// "px",
	// 				hypY * Math.sin(theta[index] + Math.PI / 2) -
	// 				node.getBoundingClientRect().height / 2 +
	// 				measuresInternal.height / 2 +
	// 				"px",
	// 			left:
	// 				// hypX * Math.cos(theta[index] + Math.PI / 2) +
	// 				// hypX +
	// 				// 0 +
	// 				// // node.getBoundingClientRect().width / 2 +
	// 				// // measuresInternal.width / 2 +
	// 				// // 70 +
	// 				// // measuresContainer.left / 2 +
	// 				// // node.getBoundingClientRect().width / 2 +
	// 				// // measuresContainer.width / 2 +
	// 				// // measuresInternal.width / 4 +
	// 				// "px",
	// 				hypX * Math.cos(theta[index] + Math.PI / 2) -
	// 				node.getBoundingClientRect().width / 2 +
	// 				measuresInternal.width / 2 +
	// 				"px"
	// 			// transform: "translateX(-50%) translateY(-50%)"
	// 		});

	// 		// node.style.top =
	// 		// 	hypY * Math.sin(theta[index] + Math.PI / 2) -
	// 		// 	node.getBoundingClientRect().height / 2 +
	// 		// 	measuresInternal.height / 2 +
	// 		// 	"px";
	// 		// node.style.left =
	// 		// 	hypX * Math.cos(theta[index] + Math.PI / 2) -
	// 		// 	node.getBoundingClientRect().width / 2 +
	// 		// 	measuresInternal.width / 2 +
	// 		// 	"px";

	// 		// node.style.top =
	// 		// 	hypY * Math.sin(theta[index] + Math.PI / 2) -
	// 		// 	node.getBoundingClientRect().height / 2 +
	// 		// 	measuresInternal.height / 2 +
	// 		// 	"px";
	// 		// node.style.left =
	// 		// 	hypX * Math.cos(theta[index] + Math.PI / 2) -
	// 		// 	node.getBoundingClientRect().width / 2 +
	// 		// 	measuresInternal.width / 2 +
	// 		// 	"px";
	// 		console.log("placePlate");
	// 	}

	// 	recipes.map((recipe, index) => {
	// 		// if (resize) {
	// 		return placePlate(recipe.title, index);
	// 		// }
	// 	});
	// 	// }
	// 	// return () => {
	// 	// 	setResize(() => {
	// 	// 		return false;
	// 	// 	});
	// 	// };
	// }, [recipes]);

	// function resizeView() {
	// 	// setResize(() => {
	// 	// 	return false;
	// 	// });
	// 	console.log("change");
	// 	setRecipes((prevRecipes) => {
	// 		return [...prevRecipes];
	// 	});

	// 	// setResize(() => {
	// 	// 	return false;
	// 	// });

	// 	// setResize(true);
	// }

	const router = useRouter();

	useEffect(() => {
		// window.addEventListener("resize", resizeView);
		// const screen = window.screen;
		// const availHeight = window.screen.availHeight;
		// // console.log(orient);
		// const controls = animatePlates();
		// return () => {
		// 	window.removeEventListener("resize", resizeView);
		// 	controls.start();
		// 	// setResize(() => {
		// 	// 	return true;
		// 	// });
		// };

		function resizeView() {
			// setResize(() => {
			// 	return true;
			// });
			router.refresh();
			// router.replace(router.asPath);

			// console.log("change");
			setRecipes((prevRecipes) => {
				return [...prevRecipes];
			});
			// setResize(() => {
			// 	return true;
			// });

			// recipes.map((recipe, index) => {
			// 	// if (resize) {
			// 	return placePlate(recipe.title, index);
			// 	// }
			// });
			// setResize(() => {
			// 	return false;
			// });

			// setResize(true);
		}
		window.addEventListener("resize", resizeView);

		// const screen = window.screen;
		// const availHeight = window.screen.availHeight;
		// console.log(orient);
		// const controls = animatePlates();

		return () => {
			window.removeEventListener("resize", resizeView);

			// controls.start();
			// setResize(false);
		};
	}, []);

	// Motion Transmission Effect

	const [recVelocity, setRecVelocity] = useState([]);

	function rotateAngle(value, range) {
		const sign = -value / value;
		const newAngle = angle.get() + range * sign;
		angle.set(newAngle);
		xVelocity.jump(0);
	}

	useMotionValueEvent(x, "animationStart", () => {
		if (recVelocity.length === 0) {
			setRecVelocity((prevValue) => {
				return [...prevValue, x.getVelocity()];
			});
		}
	});

	useMotionValueEvent(x, "animationComplete", () => {
		recVelocity.length = 0;
	});

	const [menuRef, animate] = useAnimate();
	const [flowerRef, animateFlower] = useAnimate();

	useEffect(() => {
		if (recVelocity[0] && recVelocity[0] !== 0) {
			const vel = recVelocity[0];
			const difference = 45;
			const newAngle =
				vel > 0 ? angle.get() - difference : angle.get() + difference;
			animate(menuRef.current, { rotateZ: `${newAngle}deg` });
			animateFlower(flowerRef.current, { rotateZ: `${newAngle}deg` });
			angle.set(newAngle);
		} else {
			return;
		}

		return () => {
			if (recVelocity.length > 0) {
				recVelocity.length = 0;
			}
		};
	}, [recVelocity]);

	// Movement and Title Detect

	const invertedRecipes = [recipes[0], ...recipes.slice(1).reverse()];

	useMotionValueEvent(angle, "change", (lastAngle) => {
		if (lastAngle >= 0) {
			theta.map((piSection, index) => {
				if (
					((lastAngle % 360) - 15) * (Math.PI / 180) <= piSection &&
					piSection <= ((lastAngle % 360) + 15) * (Math.PI / 180)
				) {
					// change title if plate proximity

					const h4Title = titleRef.current.textContent;
					const actualTitle = invertedRecipes[index].title;
					h4Title !== actualTitle
						? (titleRef.current.textContent = invertedRecipes[index].title)
						: null;
				}
			});
		} else if (lastAngle < 0) {
			theta.map((piSection, index) => {
				if (
					((lastAngle % 360) + 15) * (Math.PI / 180) >= -piSection &&
					-piSection >= ((lastAngle % 360) - 15) * (Math.PI / 180)
				) {
					const h4Title = titleRef.current.textContent;
					const actualTitle = recipes[index].title;
					h4Title !== actualTitle
						? (titleRef.current.textContent = recipes[index].title)
						: null;
				}

				return;
			});
		}
	});

	// const [isPresent, safeToRemove] = usePresence();
	// const [suggScope, suggAnimate] = useAnimate();
	const [ulScope, ulAnimate] = useAnimate();

	// useEffect(() => {
	// 	if (isPresent) {
	// 		const enterAnimationSearch = async () => {
	// 			suggAnimate(
	// 				"li",
	// 				{ opacity: 1 },
	// 				{ delay: stagger(0.2, { startDelay: 0.15 }) }
	// 			);
	// 		};
	// 		if (view && filteredList.length > 0) {
	// 			enterAnimationSearch();
	// 		}
	// 	} else {
	// 		const exitAnimationSearch = async () => {
	// 			suggAnimate(
	// 				"li",
	// 				{ opacity: 0 },
	// 				{ delay: stagger(0.2, { startDelay: 0.15 }) }
	// 			);
	// 			safeToRemove();
	// 		};
	// 		exitAnimationSearch();
	// 	}
	// }, [view, filteredList.length, isPresent]);

	// Da riattivare --->

	// Blur Effect
	// useEffect(() => {
	// 	if (view === true) {
	// 		window.addEventListener("blur", handleCloseTab);
	// 		// setSearchData({ type: "default", results: [] });
	// 		return () => {
	// 			window.removeEventListener("blur", handleCloseTab);
	// 		};
	// 	}
	// }, [view, handleCloseTab]);

	const rawList = [
		...(filteredList.length > 0 ? filteredList : []),
		...(searchData.type === "positive" ? searchData["results"] : [])
	];

	const cleanSet = new Set(rawList.map((elem) => elem.id));
	const cleanList = Array.from(cleanSet).map((elem) => {
		const recipeObj = rawList.find(
			(recipe) => Number(recipe.id) === Number(elem)
		);
		return recipeObj;
	});
	// console.log(cleanList);

	// const appearList = [
	// 	...(searchData.type === "positive" ? searchData["results"] : filteredList)
	// ];

	useEffect(() => {
		if (view && cleanList.length > 0) {
			// const enterAnimationSearch = async () => {
			ulAnimate(
				"li",
				{ opacity: 1 },
				{ delay: stagger(0.2, { startDelay: 0.15 }) }
			);
			// };
			// if (view) {
			// 	enterAnimationSearch();
			// }
		} else {
			// const exitAnimationSearch = async () => {
			// 	ulAnimate(
			// 		"li",
			// 		{ opacity: 0 },
			// 		{ delay: stagger(0.2, { startDelay: 0.15 }) }
			// 	);
			// 	safeToRemove();
			// };
			// exitAnimationSearch();
			return;
		}
	}, [view, cleanList.length]);

	// const orient = useOrientation();

	// const availHeight = useMotionValue(0);

	return (
		<>
			<motion.section
				ref={sectionRef}
				className={`${styles["container"]} ${great_vibes.variable}`}
				dir="ltr"
				onContextMenu={(event) => event.preventDefault()}
			>
				<motion.div
					className={styles["invisible-div"]}
					ref={moveRef}
					drag="x"
					dragElastic={0}
					dragSnapToOrigin={true}
					// onResize={() => console.log("change")}
					style={{
						x,
						zIndex: view || showModal ? "0" : "26"
						// display: view ? "none" : "block"
					}}
				></motion.div>

				<div
					id="circ-hole"
					className={styles["title-search-part"]}
					ref={circHole}
				>
					<div className={styles["title-container"]}>
						<AnimatedText
							text={`Green Like Nature`}
							className={styles["title-general"]}
							// handleAnimComplete={handleAnimComplete}
							// handleAnimComplete={true}
						></AnimatedText>
					</div>
					<motion.div
						ref={flowerRef}
						style={{ position: "fixed" }}
						className={styles["flower-container"]}
						// test per evitare leggero sfarfallio iniziale, riattivare se non cambia nulla --->
						initial={{
							opacity: 0
						}}
						animate={{
							opacity: 1.0,
							transition: { duration: 0.5, delay: 0.5 }
						}}
					>
						<Flower />
					</motion.div>
					{/* <--- centrare */}
					{/* <--- utilizzare una prop per trasmattere...
					rotateZ */}
					{/* <--- test */}
					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className={styles["search-part"]}
					>
						<SearchBar
							id="searchBar"
							value={searchTerm}
							position="absolute"
							handleChange={handleChange}
						/>
					</form>
					{view && (
						<>
							<motion.div
								// style={{
								// top: circHole.current.getBoundingClientRect().bottom + "px"
								// sectionRef.current.getBoundingClientRect().height -
								// flowerRef.current.parentElement.getBoundingClientRect()
								// 	.height + "px"
								// }}
								initial={{
									opacity: 0.0,
									y: 800
									// <--- modificare per adattare ad altre dimensioni
								}}
								animate={{
									opacity: 1.0,
									y: 0,
									// sectionRef.current.getBoundingClientRect().height -
									// -flowerRef.current.parentElement.getBoundingClientRect()
									// 	.height + "px",
									// HERE
									transition: {
										duration: 1.5,
										delay: 0.1
									}
								}}
								className={styles["results-part"]}
							>
								<motion.button
									className={styles["cancel-btn"]}
									onClick={handleCloseTab}
								>
									<GoX className={styles["x-icon"]} />
								</motion.button>
								<div className={styles["results"]}>
									<AnimatePresence>
										<ul ref={ulScope} className={styles["list"]}>
											{searchData.type === "positive" && (
												<p className={styles["list-label"]}>
													{t("results_label")}
													<span className={styles["term-label"]}>
														{searchTerm}
													</span>
												</p>
											)}
											{searchData.type === "empty" &&
												filteredList.length === 0 && (
													<p className={styles["list-label"]}>
														{t("no_results_label")}
														<span className={styles["term-label"]}>
															{searchTerm}
														</span>
													</p>
												)}
											{searchData.type === "default" &&
												filteredList.length > 0 && (
													<span className={styles["list-label"]}>
														{/* aggiungere campo i18n */}
														Suggerimenti:
													</span>
												)}
											{searchData.type === "default" &&
												filteredList.length === 0 && (
													<p className={styles["no-suggest-label"]}>
														{t("no_suggestion_label")}
													</p>
												)}
											{cleanList.map((elem) => {
												const recipePresence =
													recipesList.filter((recipe) => recipe.id === elem.id)
														.length > 0;
												return (
													<Fragment key={elem.id}>
														<SearchResult
															id={elem.id}
															title={elem.title}
															image={elem.image}
															saved={recipePresence}
														/>
													</Fragment>
												);
											})}
										</ul>
										{/* {searchData.type === "positive" ||
										searchData.type === "empty" ? (
											<ul className={styles["list"]} ref={ulScope}>
												{" "}
												<p className={styles["list-label"]}>
													{searchData.type === "positive" && (
														<p>
															{t("results_label")}
															<span className={styles["term-label"]}>
																{searchTerm}
															</span>
														</p>
													)}
													{searchData.type === "empty" && (
														<>
															{t("no_results_label")}
															<span className={styles["term-label"]}>
																{searchTerm}
															</span>
														</>
													)}
												</p>
												{searchData.type === "positive" &&
													searchData["results"].map((elem) => {
														const recipePresence =
															recipesList.filter(
																(recipe) => recipe.id === elem.id
															).length > 0;
														return (
															<Fragment key={elem.id}>
																<SearchResult
																	id={elem.id}
																	title={elem.title}
																	image={elem.image}
																	saved={recipePresence}
																/>
															</Fragment>
														);
													})}
											</ul>
										) : filteredList.length > 0 ? (
											<ul className={styles["list"]} ref={suggScope}>
												{" "}
												<span className={styles["list-label"]}>
													Suggerimenti:
												</span>
												{filteredList.map((elem) => {
													const recipePresence =
														recipesList.filter(
															(recipe) => recipe.id === elem.id
														).length > 0;
													return (
														<Fragment key={elem.id}>
															<SearchResult
																id={elem.id}
																title={elem.title}
																image={elem.image}
																saved={recipePresence}
															/>
														</Fragment>
													);
												})}
											</ul>
										) : (
											<p className={styles["no-suggest-label"]}>
												{t("no_suggestion_label")}
											</p>
										)} */}
									</AnimatePresence>
								</div>
							</motion.div>
						</>
					)}
				</div>
				<div className={styles["carousel-container"]}>
					<motion.div
						// test per evitare leggero sfarfallio iniziale, riattivare se non cambia nulla --->
						initial={{
							opacity: 0
						}}
						animate={{
							opacity: 1.0,
							transition: { duration: 1.0, delay: 0.1 }
						}}
						ref={carouselRef}
						className={styles["carousel"]}
					>
						<div className={styles["circular-container"]}>
							<motion.div
								ref={menuRef}
								className={styles["circular-menu"]}
								// style={{ width: w }}
								// initial={{
								// 	opacity: 0.0
								// }}
								// animate={{
								// 	opacity: 1.0,
								// 	transition: {
								// 		duration: 1.0
								// 	}
								// }}
							>
								{/* <Suspense
									fallback={
										<div
											style={{
												width: "100%",
												height: "100%",
												backgroundColor: "#434343",
												borderRadius: "50%",
												zIndex: 5
											}}
										></div>
									}
								> */}
								<Image
									src={bkgImage}
									alt="wood-table"
									fill
									style={{
										objectFit: "cover",
										maxWidth: "100%",
										borderRadius: "50%",
										zIndex: 5
									}}
									className={styles["wood-image"]}
									quality={40}
									priority
								/>
								{/* <svg
										viewBox="0 0 500 500"
										className={styles["wood-image"]}
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill="url('#myGr')"
											filter="url('#shadow')"
											d="M 480 250 C 480.518 266.104 469.488 280.561 466.299 296.354 C 463.436 310.533 467.986 326.393 461.925 339.527 C 449.609 366.213 431.318 389.947 412.635 412.635 C 403.284 423.99 391.732 434.1 378.596 440.72 C 365.131 447.506 348.659 446.035 334.761 451.883 C 320.936 457.7 311.348 474.956 296.353 475.327 C 219.278 477.235 146.936 461.978 87.365 412.635 C 77.259 404.264 76.159 388.787 68.823 377.906 C 59.659 364.314 45.879 353.942 38.075 339.527 C 30.901 326.275 27.655 311.124 24.673 296.353 C 21.6 281.131 18.635 265.469 20 250 C 21.343 234.779 29.627 220.918 32.651 205.94 C 35.672 190.979 31.68 174.332 38.075 160.473 C 50.389 133.786 66.882 108.442 87.365 87.365 C 97.634 76.798 115.162 76.814 127.38 68.577 C 139.819 60.191 146.305 43.008 160.473 38.075 C 202.592 23.41 298.56 23.164 339.527 38.075 C 367.145 48.127 391.523 66.918 412.635 87.365 C 423.897 98.272 425.029 116.372 433.793 129.372 C 441.607 140.963 456.925 147.419 461.925 160.473 C 472.815 188.903 479.02 219.571 480 250 Z"
										/>
										<defs>
											<filter id="shadow">
												<feDropShadow
													dx="0"
													dy="0"
													stdDeviation="5"
													floodColor="rgb(106, 68, 46)"
												/>
											</filter>
											<filter id="emboss">
												<feConvolveMatrix
													kernelMatrix="1 0 0
                      0 0 0
                      0 0 -1"
												/>
											</filter>
											<radialGradient id="myGr">
												<stop offset="0%" stopColor="#FFF" />
												<stop offset="79.4%" stopColor="#FFF" />
												<stop offset="79.5%" stopColor="#232323" />
												<stop offset="80%" stopColor="#232323" />
												<stop offset="80.5%" stopColor="#FFF" />

												<stop offset="99%" stopColor="#FFF" />
												<stop offset="99.5%" stopColor="#232323" />
												<stop offset="100%" stopColor="rgb(106, 68, 46)" />
											</radialGradient>
										</defs>
									</svg> */}

								{/* For next project ---> */}
								{/* <svg
									viewBox="0 0 500 500"
									xmlns="http://www.w3.org/2000/svg"
									className={styles["wood-image"]}
								>
									<path
										d="M 480 250 C 480.518 266.104 469.488 280.561 466.299 296.354 C 463.436 310.533 467.986 326.393 461.925 339.527 C 449.609 366.213 431.318 389.947 412.635 412.635 C 403.284 423.99 391.732 434.1 378.596 440.72 C 365.131 447.506 348.659 446.035 334.761 451.883 C 320.936 457.7 311.348 474.956 296.353 475.327 C 219.278 477.235 146.936 461.978 87.365 412.635 C 77.259 404.264 76.159 388.787 68.823 377.906 C 59.659 364.314 45.879 353.942 38.075 339.527 C 30.901 326.275 27.655 311.124 24.673 296.353 C 21.6 281.131 18.635 265.469 20 250 C 21.343 234.779 29.627 220.918 32.651 205.94 C 35.672 190.979 31.68 174.332 38.075 160.473 C 50.389 133.786 66.882 108.442 87.365 87.365 C 97.634 76.798 115.162 76.814 127.38 68.577 C 139.819 60.191 146.305 43.008 160.473 38.075 C 202.592 23.41 298.56 23.164 339.527 38.075 C 367.145 48.127 391.523 66.918 412.635 87.365 C 423.897 98.272 425.029 116.372 433.793 129.372 C 441.607 140.963 456.925 147.419 461.925 160.473 C 472.815 188.903 479.02 219.571 480 250 Z"
										fill="url('#myGr')"
										filter="url('#shadow')"
									/>
									<path
										d="M 461.484 248.866 C 461.961 263.663 451.826 276.946 448.896 291.458 C 446.264 304.486 450.446 319.059 444.877 331.127 C 433.559 355.647 416.754 377.456 399.587 398.304 C 390.995 408.736 380.38 418.027 368.311 424.11 C 355.937 430.344 340.803 428.993 328.032 434.365 C 315.329 439.711 306.52 455.566 292.741 455.908 C 221.921 457.66 155.45 443.642 100.713 398.304 C 91.427 390.611 90.416 376.39 83.675 366.393 C 75.255 353.904 62.593 344.373 55.422 331.127 C 48.831 318.951 45.848 305.03 43.108 291.457 C 40.285 277.471 37.559 263.08 38.815 248.866 C 40.048 234.88 47.66 222.145 50.439 208.382 C 53.214 194.635 49.547 179.339 55.422 166.604 C 66.737 142.083 81.891 118.795 100.713 99.429 C 110.148 89.72 126.254 89.735 137.48 82.166 C 148.91 74.461 154.87 58.671 167.887 54.139 C 206.589 40.665 294.768 40.438 332.411 54.139 C 357.789 63.375 380.189 80.641 399.587 99.429 C 409.934 109.45 410.975 126.082 419.028 138.027 C 426.208 148.678 440.283 154.61 444.877 166.604 C 454.883 192.727 460.585 220.906 461.484 248.866 Z"
										style={{
											fill: "none",
											strokeWidth: "1px"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 451.484 248.92 C 451.938 263.018 442.283 275.673 439.491 289.499 C 436.984 301.911 440.968 315.795 435.662 327.292 C 424.879 350.653 408.869 371.431 392.514 391.293 C 384.328 401.232 374.215 410.083 362.716 415.879 C 350.927 421.818 336.509 420.531 324.342 425.649 C 312.239 430.742 303.847 445.847 290.719 446.173 C 223.248 447.842 159.92 434.487 107.771 391.293 C 98.924 383.964 97.96 370.415 91.538 360.891 C 83.516 348.992 71.453 339.912 64.621 327.292 C 58.342 315.692 55.5 302.429 52.889 289.498 C 50.2 276.173 47.603 262.462 48.799 248.92 C 49.974 235.596 57.226 223.463 59.874 210.35 C 62.517 197.253 59.024 182.681 64.621 170.548 C 75.401 147.186 89.838 124.999 107.771 106.549 C 116.759 97.299 132.104 97.313 142.799 90.102 C 153.689 82.761 159.367 67.718 171.769 63.4 C 208.641 50.563 292.65 50.347 328.514 63.4 C 352.692 72.199 374.033 88.649 392.514 106.549 C 402.371 116.096 403.363 131.942 411.035 143.322 C 417.876 153.469 431.285 159.121 435.662 170.548 C 445.195 195.436 450.628 222.282 451.484 248.92 Z"
										style={{
											fill: "none",
											strokeWidth: "1px"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 442.985 248.966 C 443.42 262.469 434.172 274.59 431.498 287.833 C 429.097 299.721 432.913 313.02 427.83 324.032 C 417.502 346.407 402.168 366.309 386.502 385.333 C 378.662 394.853 368.975 403.33 357.961 408.882 C 346.67 414.57 332.86 413.338 321.206 418.24 C 309.614 423.118 301.576 437.586 289.001 437.898 C 224.377 439.497 163.72 426.705 113.771 385.333 C 105.297 378.313 104.374 365.336 98.223 356.213 C 90.539 344.816 78.985 336.119 72.441 324.032 C 66.427 312.921 63.705 300.217 61.204 287.832 C 58.628 275.069 56.141 261.936 57.286 248.966 C 58.412 236.204 65.358 224.583 67.894 212.023 C 70.426 199.478 67.08 185.521 72.441 173.9 C 82.766 151.523 96.594 130.272 113.771 112.6 C 122.38 103.74 137.077 103.754 147.321 96.847 C 157.752 89.816 163.19 75.407 175.069 71.271 C 210.386 58.976 290.851 58.769 325.202 71.271 C 348.36 79.699 368.801 95.455 386.502 112.6 C 395.944 121.745 396.894 136.922 404.242 147.822 C 410.795 157.541 423.638 162.955 427.83 173.9 C 436.961 197.738 442.165 223.451 442.985 248.966 Z"
										style={{
											fill: "none",
											strokeWidth: "1px"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 437.486 248.995 C 437.909 262.113 428.924 273.889 426.327 286.754 C 423.994 298.304 427.701 311.224 422.763 321.922 C 412.729 343.659 397.832 362.994 382.613 381.476 C 374.996 390.724 365.585 398.96 354.885 404.354 C 343.916 409.88 330.5 408.683 319.178 413.445 C 307.916 418.184 300.107 432.24 287.89 432.543 C 225.108 434.096 166.18 421.669 117.654 381.476 C 109.422 374.656 108.525 362.049 102.549 353.186 C 95.084 342.113 83.859 333.664 77.502 321.922 C 71.659 311.127 69.015 298.785 66.585 286.753 C 64.083 274.354 61.666 261.595 62.779 248.995 C 63.873 236.597 70.621 225.307 73.085 213.105 C 75.544 200.917 72.294 187.358 77.502 176.068 C 87.533 154.329 100.967 133.684 117.654 116.515 C 126.018 107.908 140.296 107.921 150.248 101.211 C 160.382 94.38 165.665 80.382 177.205 76.364 C 211.516 64.419 289.688 64.218 323.06 76.364 C 345.558 84.552 365.416 99.859 382.613 116.515 C 391.786 125.4 392.709 140.144 399.847 150.733 C 406.214 160.175 418.69 165.435 422.763 176.068 C 431.634 199.227 436.69 224.207 437.486 248.995 Z"
										style={{
											fill: "none",
											strokeWidth: "1px"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 463.983 248.853 C 464.466 263.825 454.211 277.266 451.247 291.949 C 448.584 305.132 452.815 319.877 447.18 332.088 C 435.727 356.897 418.725 378.964 401.355 400.059 C 392.661 410.613 381.92 420.013 369.709 426.171 C 357.188 432.477 341.876 431.111 328.955 436.546 C 316.1 441.955 307.188 457.997 293.244 458.343 C 221.589 460.115 154.332 445.932 98.948 400.059 C 89.552 392.275 88.529 377.886 81.709 367.77 C 73.188 355.133 60.377 345.489 53.121 332.088 C 46.452 319.766 43.435 305.681 40.662 291.947 C 37.805 277.796 35.048 263.234 36.317 248.853 C 37.566 234.703 45.268 221.818 48.079 207.892 C 50.887 193.981 47.177 178.505 53.121 165.619 C 64.571 140.808 79.903 117.245 98.948 97.649 C 108.494 87.825 124.79 87.841 136.149 80.183 C 147.715 72.386 153.744 56.41 166.916 51.824 C 206.076 38.19 295.297 37.961 333.385 51.824 C 359.063 61.169 381.728 78.64 401.355 97.649 C 411.824 107.791 412.878 124.618 421.025 136.703 C 428.292 147.48 442.531 153.484 447.18 165.619 C 457.304 192.052 463.075 220.562 463.983 248.853 Z"
										style={{
											fill: "none",
											strokeWidth: "1px"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 421.487 249.081 C 421.874 261.079 413.656 271.851 411.28 283.618 C 409.147 294.182 412.537 306 408.021 315.785 C 398.843 335.667 385.217 353.352 371.297 370.257 C 364.33 378.716 355.722 386.249 345.935 391.183 C 335.902 396.237 323.631 395.142 313.275 399.498 C 302.974 403.832 295.831 416.689 284.657 416.966 C 227.232 418.387 173.333 407.02 128.948 370.257 C 121.418 364.019 120.598 352.488 115.132 344.381 C 108.304 334.253 98.036 326.525 92.222 315.785 C 86.877 305.911 84.459 294.622 82.236 283.617 C 79.948 272.276 77.737 260.606 78.755 249.081 C 79.756 237.741 85.928 227.414 88.182 216.254 C 90.431 205.106 87.458 192.704 92.222 182.377 C 101.397 162.493 113.685 143.61 128.948 127.906 C 136.598 120.033 149.657 120.045 158.76 113.908 C 168.029 107.66 172.862 94.856 183.417 91.181 C 214.8 80.255 286.301 80.072 316.826 91.181 C 337.404 98.67 355.567 112.671 371.297 127.906 C 379.687 136.033 380.531 149.519 387.06 159.204 C 392.884 167.84 404.295 172.651 408.021 182.377 C 416.135 203.56 420.759 226.408 421.487 249.081 Z"
										style={{
											fill: "none",
											strokeWidth: "1px"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 413.987 249.122 C 414.358 260.595 406.5 270.895 404.228 282.148 C 402.187 292.25 405.429 303.552 401.11 312.908 C 392.334 331.92 379.305 348.833 365.992 364.998 C 359.331 373.087 351.1 380.292 341.739 385.009 C 332.146 389.842 320.41 388.796 310.508 392.96 C 300.658 397.104 293.826 409.399 283.141 409.664 C 228.227 411.023 176.686 400.153 134.242 364.998 C 127.041 359.032 126.257 348.006 121.03 340.255 C 114.5 330.568 104.682 323.18 99.122 312.908 C 94.011 303.466 91.699 292.671 89.573 282.147 C 87.385 271.302 85.27 260.142 86.244 249.122 C 87.201 238.279 93.103 228.402 95.259 217.73 C 97.409 207.07 94.566 195.21 99.122 185.334 C 107.895 166.32 119.646 148.263 134.242 133.246 C 141.558 125.717 154.047 125.729 162.75 119.86 C 171.614 113.885 176.235 101.641 186.329 98.127 C 216.341 87.679 284.713 87.503 313.903 98.127 C 333.581 105.288 350.95 118.677 365.992 133.246 C 374.015 141.017 374.822 153.914 381.065 163.176 C 386.635 171.433 397.547 176.033 401.11 185.334 C 408.87 205.591 413.291 227.441 413.987 249.122 Z"
										style={{
											fill: "none",
											strokeWidth: "1px",
											stroke: "#7f562e66"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 406.488 249.162 C 406.841 260.11 399.342 269.938 397.174 280.676 C 395.227 290.317 398.321 301.102 394.199 310.03 C 385.825 328.172 373.391 344.312 360.687 359.738 C 354.331 367.457 346.476 374.332 337.543 378.834 C 328.389 383.446 317.19 382.447 307.741 386.421 C 298.341 390.375 291.821 402.108 281.625 402.362 C 229.223 403.657 180.039 393.286 139.536 359.738 C 132.664 354.044 131.915 343.523 126.927 336.126 C 120.696 326.883 111.327 319.832 106.022 310.03 C 101.145 301.019 98.938 290.718 96.909 280.675 C 94.822 270.327 92.803 259.677 93.733 249.162 C 94.646 238.814 100.278 229.389 102.336 219.204 C 104.387 209.032 101.675 197.715 106.022 188.29 C 114.393 170.146 125.607 152.915 139.536 138.585 C 146.517 131.4 158.435 131.411 166.74 125.811 C 175.199 120.109 179.609 108.424 189.24 105.072 C 217.88 95.102 283.125 94.934 310.981 105.072 C 329.759 111.905 346.333 124.681 360.687 138.585 C 368.343 146 369.113 158.308 375.071 167.146 C 380.386 175.026 390.8 179.416 394.199 188.29 C 401.604 207.62 405.824 228.472 406.488 249.162 Z"
										style={{
											fill: "none",
											strokeWidth: "1px",
											stroke: "#7f562e"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 395.989 249.219 C 396.318 259.432 389.322 268.601 387.3 278.618 C 385.483 287.613 388.37 297.674 384.524 306.003 C 376.712 322.928 365.112 337.985 353.261 352.376 C 347.331 359.577 340.003 365.991 331.67 370.191 C 323.13 374.493 312.682 373.561 303.867 377.269 C 295.098 380.957 289.015 391.903 279.503 392.14 C 230.617 393.348 184.733 383.673 146.947 352.376 C 140.536 347.064 139.838 337.249 135.184 330.348 C 129.371 321.725 120.631 315.147 115.682 306.003 C 111.132 297.597 109.073 287.987 107.18 278.617 C 105.233 268.964 103.35 259.028 104.217 249.219 C 105.069 239.565 110.323 230.772 112.243 221.271 C 114.157 211.781 111.627 201.223 115.682 192.431 C 123.491 175.504 133.953 159.429 146.947 146.061 C 153.46 139.358 164.578 139.368 172.326 134.144 C 180.218 128.824 184.332 117.923 193.317 114.796 C 220.035 105.495 280.903 105.338 306.89 114.796 C 324.408 121.171 339.87 133.089 353.261 146.061 C 360.403 152.978 361.122 164.46 366.68 172.705 C 371.638 180.057 381.353 184.152 384.524 192.431 C 391.433 210.464 395.369 229.917 395.989 249.219 Z"
										style={{
											fill: "none",
											strokeWidth: "1px",
											stroke: "#7f562e"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 385.99 249.272 C 386.296 258.786 379.779 267.326 377.896 276.657 C 376.203 285.036 378.892 294.408 375.31 302.167 C 368.033 317.932 357.227 331.958 346.188 345.363 C 340.664 352.071 333.838 358.046 326.076 361.958 C 318.121 365.966 308.389 365.097 300.177 368.551 C 292.009 371.987 286.343 382.183 277.482 382.404 C 231.945 383.529 189.203 374.517 154.005 345.363 C 148.034 340.415 147.383 331.273 143.048 324.844 C 137.633 316.812 129.492 310.684 124.882 302.167 C 120.644 294.336 118.726 285.385 116.962 276.656 C 115.149 267.665 113.395 258.409 114.202 249.272 C 114.996 240.279 119.89 232.089 121.678 223.238 C 123.461 214.398 121.105 204.563 124.882 196.374 C 132.156 180.606 141.901 165.632 154.005 153.18 C 160.072 146.936 170.429 146.945 177.646 142.079 C 184.998 137.123 188.83 126.969 197.199 124.056 C 222.087 115.392 278.786 115.246 302.993 124.056 C 319.311 129.995 333.714 141.096 346.188 153.18 C 352.841 159.623 353.511 170.318 358.688 177.999 C 363.306 184.847 372.356 188.662 375.31 196.374 C 381.746 213.172 385.412 231.292 385.99 249.272 Z"
										style={{
											fill: "none",
											strokeWidth: "1px",
											stroke: "#7f562e66"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 372.991 249.342 C 373.267 257.947 367.373 265.671 365.67 274.11 C 364.139 281.688 366.571 290.164 363.332 297.181 C 356.75 311.439 346.977 324.124 336.993 336.248 C 331.997 342.315 325.824 347.719 318.804 351.257 C 311.609 354.882 302.808 354.096 295.381 357.22 C 287.993 360.327 282.869 369.548 274.855 369.748 C 233.671 370.766 195.014 362.615 163.181 336.248 C 157.781 331.773 157.192 323.505 153.271 317.69 C 148.374 310.426 141.011 304.884 136.842 297.181 C 133.009 290.099 131.274 282.003 129.679 274.109 C 128.039 265.977 126.453 257.606 127.183 249.342 C 127.901 241.209 132.327 233.802 133.944 225.797 C 135.557 217.802 133.426 208.907 136.842 201.501 C 143.421 187.24 152.234 173.697 163.181 162.436 C 168.668 156.789 178.035 156.797 184.562 152.396 C 191.211 147.914 194.677 138.73 202.246 136.096 C 224.755 128.26 276.034 128.128 297.927 136.096 C 312.686 141.467 325.712 151.507 336.993 162.436 C 343.01 168.263 343.616 177.935 348.299 184.882 C 352.475 191.076 360.66 194.526 363.332 201.501 C 369.152 216.693 372.468 233.081 372.991 249.342 Z"
										style={{
											fill: "none",
											strokeWidth: "1px",
											stroke: "#7f562e66"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 364.991 249.384 C 365.249 257.429 359.738 264.651 358.146 272.541 C 356.714 279.626 358.988 287.551 355.96 294.111 C 349.806 307.442 340.669 319.302 331.334 330.638 C 326.663 336.31 320.891 341.362 314.328 344.67 C 307.601 348.06 299.372 347.325 292.428 350.245 C 285.521 353.15 280.73 361.772 273.237 361.959 C 234.732 362.91 198.589 355.29 168.827 330.638 C 163.778 326.454 163.227 318.723 159.561 313.287 C 154.983 306.495 148.099 301.313 144.201 294.111 C 140.617 287.49 138.995 279.921 137.504 272.54 C 135.97 264.937 134.488 257.11 135.17 249.384 C 135.841 241.78 139.98 234.855 141.491 227.37 C 142.999 219.895 141.007 211.579 144.201 204.655 C 150.352 191.321 158.592 178.659 168.827 168.13 C 173.957 162.851 182.715 162.858 188.817 158.743 C 195.034 154.553 198.274 145.966 205.351 143.504 C 226.396 136.177 274.34 136.054 294.809 143.504 C 308.608 148.525 320.787 157.912 331.334 168.13 C 336.96 173.578 337.526 182.621 341.905 189.116 C 345.809 194.908 353.462 198.133 355.96 204.655 C 361.401 218.858 364.502 234.181 364.991 249.384 Z"
										style={{
											fill: "none",
											strokeWidth: "1px",
											stroke: "#7f562e"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 361.491 249.404 C 361.741 257.204 356.398 264.206 354.854 271.856 C 353.466 278.725 355.671 286.409 352.735 292.769 C 346.768 305.695 337.909 317.194 328.858 328.185 C 324.329 333.684 318.733 338.582 312.37 341.79 C 305.848 345.076 297.869 344.364 291.136 347.195 C 284.44 350.011 279.795 358.371 272.53 358.552 C 235.197 359.474 200.154 352.086 171.297 328.185 C 166.402 324.128 165.868 316.632 162.313 311.362 C 157.875 304.777 151.2 299.752 147.421 292.769 C 143.946 286.35 142.373 279.011 140.928 271.855 C 139.44 264.483 138.004 256.895 138.665 249.404 C 139.315 242.031 143.328 235.317 144.793 228.06 C 146.256 220.812 144.324 212.749 147.421 206.036 C 153.385 193.108 161.374 180.831 171.297 170.623 C 176.271 165.504 184.763 165.511 190.679 161.522 C 196.707 157.459 199.848 149.133 206.71 146.746 C 227.114 139.642 273.599 139.523 293.445 146.746 C 306.824 151.615 318.632 160.716 328.858 170.623 C 334.313 175.905 334.862 184.673 339.108 190.97 C 342.893 196.586 350.313 199.713 352.735 206.036 C 358.01 219.807 361.017 234.663 361.491 249.404 Z"
										style={{
											fill: "none",
											strokeWidth: "1px",
											stroke: "#4b210b"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 351.492 249.457 C 351.719 256.557 346.856 262.932 345.45 269.895 C 344.187 276.149 346.194 283.143 343.522 288.933 C 338.089 300.7 330.025 311.167 321.785 321.173 C 317.662 326.178 312.568 330.637 306.777 333.558 C 300.839 336.548 293.576 335.9 287.446 338.478 C 281.351 341.041 277.122 348.651 270.509 348.816 C 236.525 349.656 204.624 342.93 178.355 321.173 C 173.899 317.479 173.414 310.656 170.178 305.858 C 166.137 299.864 160.061 295.29 156.621 288.933 C 153.457 283.09 152.025 276.409 150.71 269.895 C 149.355 263.184 148.049 256.276 148.65 249.457 C 149.242 242.745 152.895 236.633 154.228 230.028 C 155.561 223.429 153.802 216.09 156.621 209.979 C 162.05 198.21 169.323 187.034 178.355 177.742 C 182.883 173.082 190.613 173.088 195.999 169.457 C 201.487 165.758 204.346 158.179 210.593 156.006 C 229.166 149.539 271.483 149.431 289.549 156.006 C 301.728 160.439 312.477 168.724 321.785 177.742 C 326.751 182.55 327.251 190.531 331.116 196.263 C 334.561 201.377 341.317 204.223 343.522 209.979 C 348.323 222.515 351.061 236.038 351.492 249.457 Z"
										style={{
											fill: "none",
											strokeWidth: "1px",
											stroke: "#4b210b"
										}}
										filter="url('#shadow')"
									/>
									<path
										d="M 343.993 249.497 C 344.203 256.073 339.699 261.977 338.397 268.425 C 337.227 274.217 339.086 280.694 336.611 286.056 C 331.58 296.954 324.112 306.648 316.481 315.914 C 312.662 320.549 307.945 324.679 302.582 327.384 C 297.082 330.153 290.356 329.553 284.679 331.94 C 279.034 334.314 275.118 341.362 268.994 341.515 C 237.521 342.292 207.977 336.063 183.649 315.914 C 179.522 312.493 179.073 306.174 176.076 301.731 C 172.334 296.18 166.707 291.944 163.521 286.056 C 160.591 280.645 159.265 274.458 158.047 268.425 C 156.792 262.21 155.582 255.812 156.139 249.497 C 156.687 243.281 160.07 237.621 161.305 231.504 C 162.539 225.393 160.91 218.596 163.521 212.936 C 168.549 202.037 175.284 191.687 183.649 183.081 C 187.842 178.766 195.001 178.771 199.989 175.409 C 205.072 171.983 207.719 164.964 213.505 162.952 C 230.705 156.962 269.896 156.862 286.627 162.952 C 297.906 167.057 307.86 174.73 316.481 183.081 C 321.08 187.534 321.543 194.925 325.122 200.234 C 328.313 204.97 334.569 207.606 336.611 212.936 C 341.058 224.546 343.593 237.07 343.993 249.497 Z"
										style={{
											fill: "none",
											strokeWidth: "1px",
											stroke: "#4b210b66"
										}}
										filter="url('#shadow')"
									/>
									<path
										style={{
											fill: "rgb(15, 1, 1)",
											stroke: "transparent",
											strokeWidth: "0px"
										}}
										d="M 134.126 362.072 C 134.126 362.072 149.0347178349472 344.2842256458726 157.58 334.066 C 167.89717300541136 321.7289934786774 180.77814161061508 304.0474816680369 191.712 293.194 C 200.16008502915804 284.8080183338207 207.28734782736987 278.5716819915497 216.262 272.998 C 225.34171249317825 267.35907059769806 238.57718309841295 256.92925039911523 245.931 259.638 C 253.46945229243093 262.414759322632 251.6979765594281 280.88171707971594 260.552 290.547 C 273.9366193071294 305.1579995362002 314.3238374922548 319.5629181475768 327.994 330.008 C 334.8118996258817 335.21741280790127 336.057380625881 339.95306132775164 341.873 343.615 C 348.774923477151 347.960955068235 367.468959049122 353.29187273049035 367.604 352.961 C 367.7395619850383 352.6288506493867 348.7746133618104 346.17902717356776 342.489 341.546 C 337.66969269498924 337.99376405791253 336.72708156871636 333.35150271690077 331.71 329.429 C 324.22410774236744 323.57630808801594 309.8916670754737 318.2438884575668 299.741 312.649 C 290.30980963144935 307.45067581679285 279.95995040314705 303.36002803120255 272.757 297.05 C 266.375169176309 291.45930047633146 256.59684702335323 283.4177498821562 257.831 277.663 C 259.38801418072467 270.40277590899143 277.87316086119944 264.7491404269181 292.152 259.261 C 313.0309448931213 251.23607721562874 354.4555071282437 247.918317694049 372.996 239.329 C 384.12045698695806 234.1753346742888 397.60473105885507 222.25948934011552 397.289 221.767 C 396.94096169632866 221.22411658798595 377.7411483973488 235.24752826586004 365.575 239.683 C 351.2596976391208 244.90199921927498 331.28233517489684 245.0084101108672 316.005 248.958 C 302.43336565251826 252.46662170556417 288.9504237040634 257.92134429604965 278.24 261.515 C 270.2976748715996 264.17987888704874 262.763671103512 270.74186394922623 257.511 268.533 C 251.78474005940242 266.1249815085649 244.43178577680519 249.61474609157295 246.24 245.093 C 247.52558334101985 241.87818099621109 253.58796841050088 243.33024593186425 258.536 240.44 C 268.2711378287407 234.75350790779729 293.5698395366117 219.57021649833982 297.605 207.828 C 300.62139872597703 199.05035479676621 291.6789725338709 190.24651319727923 291.587 180.034 C 291.4745319660403 167.54569253749403 300.15866909771637 151.66854869835456 299.836 138.317 C 299.5349578003041 125.86033892540048 291.309997894149 102.30862765653981 290.91 102.394 C 290.512678442727 102.47880112757551 297.5057850940336 125.84337311786605 297.341 138.345 C 297.160370948735 152.048648477633 288.098582366092 169.8668100711997 288.478 181.323 C 288.7341550631126 189.05738235860085 292.9007976549934 195.4691546448106 293.805 200.602 C 294.38954363617864 203.92025293800032 295.57819760818137 205.78364498999886 294.466 208.935 C 292.34227110114523 214.95247716058702 281.97063073689594 226.13548570920864 273.519 231.075 C 265.0028248907544 236.05223693385696 247.73734699145277 241.74254507734088 243.495 238.573 C 240.59524966331503 236.40653661931128 243.97400128536202 230.72576387364464 242.877 224.128 C 240.32834552683354 208.79946699476062 232.5756758198704 170.3413961349804 220.803 149.274 C 210.12491260510666 130.16538777333335 190.78832807048082 111.96973656078292 177.873 101.534 C 169.51530453920276 94.78088404288566 154.80698061927149 87.7552052178648 154.552 88.156 C 154.20129866460863 88.70725470208009 185.8520485734448 106.52699421702448 196.17 117.392 C 204.63870305593701 126.3097108781736 208.3950183853898 135.02480442983628 214.392 146.408 C 222.17781879040766 161.1866842883004 234.17211552249742 182.6372758460226 237.36 199.397 C 240.01235722953643 213.34128682674915 243.9447133579924 233.44636363902836 236.038 239.354 C 224.5280610124493 247.95384812863946 179.1410933002723 221.76665747267117 154.044 218.037 C 133.35931843973185 214.9630672449968 109.40707098281467 219.7007730475735 96.543 215.695 C 89.19618781542584 213.40725902951974 80.98353635189837 205.25975306059118 80.67 205.676 C 80.34993004790985 206.10092086530832 88.65816106241387 216.09539348852252 95.271 218.693 C 104.43265405393444 222.29181322545742 120.86796111536104 219.00339323814978 132.809 219.462 C 143.72101933742863 219.88108630412566 153.31561127831586 218.6694412825233 164.113 221.226 C 176.7470495954697 224.21743528707674 190.40852057869202 234.31607937316883 203.505 238.286 C 215.6587760199368 241.9701600374625 233.94288447224932 241.15627153407695 239.878 244.903 C 242.5077601746319 246.56311887363856 244.52597585260446 248.4234924950557 244.122 250.791 C 243.14371983445372 256.5242279118605 219.97609098174044 266.25961490857196 209.192 275.113 C 198.69487891590742 283.7307922150487 190.4945305295335 291.59842686772805 180.143 303.087 C 166.04416280384604 318.7344950004624 134.126 362.072 134.126 362.072 C 134.12600000000003 362.07200000000006 134.126 362.072 134.126 362.072 C 134.126 362.072 134.126 362.072 134.126 362.072"
									/>

									<defs>
										<filter id="shadow">
											<feDropShadow
												dx="0"
												dy="0"
												stdDeviation="10"
												floodColor="#38230766"
											/>
										</filter>
										<radialGradient id="myGr">
											<stop offset="40%" stopColor="#7f562e" />
											<stop offset="50%" stopColor="#5f2c15" />
											<stop offset="65%" stopColor="#612307" />
											<stop offset="75%" stopColor="#4b210b" />
											<stop offset="100%" stopColor="#612307" />
										</radialGradient>
									</defs>
								</svg> */}
								{/* </Suspense> */}
								<div
									ref={internal}
									className={styles["circular-border-internal"]}
								>
									{/* {resize && ( */}
									{/* {recipes && ( */}
									<motion.ul ref={platesScope}>
										{recipes.map((recipe, index) => {
											return (
												<motion.li
													key={recipe.id}
													className={styles["plate-container"]}
													id={recipe.id}
													ref={(node) => {
														const map = getMap();
														if (node) {
															map.set(recipe.title, node);
														} else {
															map.delete(recipe.title);
														}
														// map.set(recipe.title, node);
														// return () => {
														// 	map.delete(recipe.title);
														// };
													}}
													initial={{ opacity: 0 }}
													animate={{
														rotateZ: (Math.PI / 4) * (180 / Math.PI) * index,
														opacity: 1.0
													}}
												>
													<div className={styles["plate-image-container"]}>
														{/* Testing suspense ---> */}
														{/* <Suspense
															fallback={
																<Image
																	src={fallbackImg}
																	style={{ transform: "translateX(0%)" }}
																/>
															}
														> */}
														<Image
															style={
																settingsType !== "seasonal" ||
																(errorsReport.network &&
																	errorsReport.network !== null)
																	? { transform: "translateX(0%)" }
																	: { transform: "translateX(-2%)" }
															}
															className={styles["plate-image"]}
															src={
																errorsReport.network &&
																errorsReport.network !== null
																	? fallbackImg
																	: recipe.image
															}
															alt={recipe.title}
															width="230"
															height="172"
															quality={100}
															priority
															// unoptimized
														/>
														{/* </Suspense> */}
													</div>
												</motion.li>
											);
										})}
									</motion.ul>
									{/* )} */}
									{/* )} */}
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
				<div
					// className={styles["recipe-title-container"]}
					className={
						showModal
							? styles["recipe-title-open"]
							: styles["recipe-title-container"]
					}
				>
					<h4
						ref={titleRef}
						className={
							showModal
								? styles["recipe-title-modal"]
								: styles["recipe-title-label"]
						}
					>
						{recipeData.title}
					</h4>
				</div>
				<AnimatePresence>
					{showModal ? (
						<Modal
							key={recipeData.id}
							id={recipeData.id}
							title={recipeData.title}
							time={recipeData.time}
							ingrNum={recipeData.ingrNum}
							likes={recipeData.likes}
							onClick={handleCloseDetails}
							ref={titleRef}
						/>
					) : (
						<motion.div
							key={`${recipeData.id}text`}
							className={
								!view ? styles["text-container"] : styles["text-container-down"]
							}
						>
							<p className={styles["text-info"]}>
								{settingsType === "seasonal" &&
									(seasonalRecipes.length > 0
										? `${t("suggest_seasonal")}`
										: `${t("suggest_default")}`)}
								{settingsType === "saved" &&
									(savedRecipes.length > 0
										? `${t("suggest_saved")}`
										: `${t("suggest_default")}`)}
							</p>
							{/* Controllare traduzione qui per ricette salvate */}
							<button
								onClick={handleOpenDetails}
								className={styles["modal-btn"]}
							>
								{t("details_btn")}
							</button>
						</motion.div>
					)}
				</AnimatePresence>
				{showError && (
					<ErrorModal
						errorsList={errorsMsgs}
						onClick={() => setShowError(false)}
					/>
				)}
			</motion.section>
		</>
	);
}
