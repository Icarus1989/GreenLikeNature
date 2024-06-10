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
	transform
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
import altImage from "@/public/plusCircleTrans.svg";
import fallbackImg from "@/public/tableNapkin.svg";
import { GoX } from "react-icons/go";

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

	// Positioning Effect
	useEffect(() => {
		const searchbarDim = formRef.current.children[0].getBoundingClientRect();
		const searchbarCenterX = searchbarDim.left + searchbarDim.width / 2;
		const searchbarCenterY = searchbarDim.top + searchbarDim.height / 2;
		const carouselDim = carouselRef.current.getBoundingClientRect();
		const flowerDim = flowerRef.current.getBoundingClientRect();

		// const sectionDim = sectionRef.current.getBoundingClientRect();

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

		const measuresContainer = menuRef.current.getBoundingClientRect();
		const measuresInternal = internal.current.getBoundingClientRect();

		const hypY =
			(measuresContainer.height / 2 + measuresInternal.height / 2) / 2;
		const hypX = (measuresContainer.width / 2 + measuresInternal.width / 2) / 2;

		function placePlate(itemId, index) {
			const map = getMap();
			const node = map.get(itemId);

			node.style.top =
				hypY * Math.sin(theta[index] + Math.PI / 2) -
				node.getBoundingClientRect().height / 2 +
				measuresInternal.height / 2 +
				"px";
			node.style.left =
				hypX * Math.cos(theta[index] + Math.PI / 2) -
				node.getBoundingClientRect().width / 2 +
				measuresInternal.width / 2 +
				"px";
		}

		recipes.map((recipe, index) => {
			return placePlate(recipe.title, index);
		});
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

	// Blur Effect
	useEffect(() => {
		if (view === true) {
			window.addEventListener("blur", handleCloseTab);
			// setSearchData({ type: "default", results: [] });
			return () => {
				window.removeEventListener("blur", handleCloseTab);
			};
		}
	}, [view, handleCloseTab]);

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
					style={{ x, zIndex: view ? "0" : "26" }}
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
						initial={{
							opacity: 0
						}}
						animate={{
							opacity: 1.0,
							transition: { duration: 1.0, delay: 0.1 }
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
									{searchData.type === "positive" ||
									searchData.type === "empty" ? (
										<ul className={styles["list"]}>
											{" "}
											{/* controllare traduzione i18 qui ---> */}
											<p className={styles["list-label"]}>
												{searchData.type === "positive" && (
													<>
														{t("results_label")}
														<span className={styles["term-label"]}>
															{searchTerm}
														</span>
													</>
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
										<ul className={styles["list"]}>
											{" "}
											<span className={styles["list-label"]}>
												Suggerimenti:
											</span>
											{filteredList.map((elem) => {
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
									) : (
										<p className={styles["no-suggest-label"]}>
											{t("no_suggestion_label")}
										</p>
									)}
								</div>
							</motion.div>
						</>
					)}
				</div>
				<div className={styles["carousel-container"]}>
					<motion.div
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
								<Suspense
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
								>
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
										quality={40}
										priority
									/>
								</Suspense>
								<div
									ref={internal}
									className={styles["circular-border-internal"]}
								>
									<motion.ul>
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
													}}
													initial={{ opacity: 0 }}
													animate={{
														rotateZ: (Math.PI / 4) * (180 / Math.PI) * index,
														opacity: 1.0
													}}
												>
													<div className={styles["plate-image-container"]}>
														{/* Testing suspense ---> */}
														<Suspense
															fallback={
																<Image
																	src={fallbackImg}
																	style={{ transform: "translateX(0%)" }}
																/>
															}
														>
															<Image
																style={
																	settingsType !== "seasonal" ||
																	(errorsReport.network &&
																		errorsReport.network !== null)
																		? { transform: "translateX(0%)" }
																		: { transform: "translateX(-12%%)" }
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
															/>
														</Suspense>
													</div>
												</motion.li>
											);
										})}
									</motion.ul>
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
							className={styles["text-container"]}
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
