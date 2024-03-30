"use client";

import React, {
	useState,
	useEffect,
	useRef,
	useContext,
	Fragment
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
	GeneralContext,
	GeneralDispatchContext
} from "@/app/generalContext/GeneralContext";

// test
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addRecipe } from "@/lib/features/recipes/recipesSlice";
// test

import {
	motion,
	AnimatePresence,
	useMotionValue,
	useVelocity
} from "framer-motion";

import AnimatedText from "../AnimatedText/AnimatedText";
import SearchBar from "../SearchBar/SearchBar";
import SearchResult from "../SearchResult/SearchResult";
import Flower from "../FlowerComponent/Flower";
import { Modal } from "../Modal/Modal";

import styles from "./MainPrimary.module.css";
import bkgImage from "../../public/retina-wood.png";
import { GoX } from "react-icons/go";

const netwrokError = null;

export default function MainPrimary({ recipes, searchByQuery }) {
	const { recipesList, ingrList } = useAppSelector((state) => state.recipes);

	console.log("From Main");

	const [recipeData, setRecipeData] = useState({
		id: recipes[0].id,
		title: recipes[0].title,
		time: recipes[0].readyInMinutes,
		ingrNum: recipes[0].extendedIngredients.length,
		likes: recipes[0].likes
	});
	const [showModal, setShowModal] = useState(false);

	const [view, setView] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [query, setQuery] = useState("");

	const [searchData, setSearchData] = useState([]);

	const recipeRef = useRef(null);
	const menuRef = useRef(null);
	const internal = useRef(null);

	const sectionRef = useRef(null);
	const titleRef = useRef(null);

	const generalDispatch = useContext(GeneralDispatchContext);
	const settings = useContext(GeneralContext);

	const allergens =
		settings["tomato-settings"]["allergens-list"].length > 0
			? settings["tomato-settings"]["allergens-list"]
					.map((elem) => elem.toLowerCase())
					.join(",")
			: "";

	// Attivare quando pronto intolerances nel GlobalContext --->
	// const intolerances =
	// 	settings["tomato-settings"]["intolerances-list"].length > 0
	// 		? settings["tomato-settings"]["intolerances-list"]
	// 				.map((elem) => elem.toLowerCase())
	// 				.join(",")
	// 		: "";
	// <--- Attivare quando pronto intolerances nel GlobalContext

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
		// searchByQuery(searchTerm);
		if (searchTerm.length > 0) {
			const response = await searchByQuery(searchTerm, allergens, "");

			// Attivare quando pronto intolerances nel GlobalContext --->
			// const response = await searchByQuery(searchTerm, allergens, intolerances);
			// <--- Attivare quando pronto intolerances nel GlobalContext

			// console.log(response);
			setSearchData(response["results"]);
			// [ ] Inserire try...catch
			// [ ] Usare Axios
		} else {
			return;
		}

		// [x] Impostare searchData in results come SearchPrimary
		// [x] Impostare al meglio allergens
		// [ ] Testare allergens funzionanti

		// [x] ATTENZIONE aggiungere alternativa testuale
		// se ricerca infruttuosa
	}

	function handleCloseTab() {
		// setQuery("");
		setSearchData([]);

		// if (searchData.length > 0) {
		// 	setSearchData([]);
		// }
		setSearchTerm("");
		setView(() => {
			return false;
		});
	}

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

	const invertedRecipes = [recipes[0], ...recipes.slice(1).reverse()];

	useEffect(() => {
		// Plates Positioning Effect
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

	useEffect(() => {
		// Motion Transmission Effect
		return x.on("change", (lastValue) => {
			angle.set(
				angle.get() + -Number((xVelocity.current / (360 / Math.PI)).toFixed(3))
			);
		});
	}, []);

	useEffect(() => {
		// Movement and Title Detect Effect
		angle.on("change", (lastAngle) => {
			if (lastAngle > 360) {
				angle.set(0);
			} else if (lastAngle < -360) {
				angle.set(0);
			}

			const minRadians = Math.abs(lastAngle - 2) * (Math.PI / 180);
			const maxRadians = Math.abs(lastAngle + 2) * (Math.PI / 180);

			if (lastAngle >= 0) {
				const actualVel = xVelocity.get();
				// console.log("pos " + lastAngle);

				theta.map((piSection, index) => {
					if (
						(lastAngle - 10) * (Math.PI / 180) <= piSection &&
						piSection <= (lastAngle + 10) * (Math.PI / 180)
					) {
						// heavier calculations for half of the total angles

						// slow if plate proximity

						xVelocity.set(actualVel * 0.001 * 2);

						// change title if plate proximity0
						const h4Title = titleRef.current.textContent;
						const actualTitle = invertedRecipes[index].title;
						h4Title !== actualTitle
							? (titleRef.current.textContent = invertedRecipes[index].title)
							: null;
						// if (Math.round(lastAngle) % 22.5 === 0) {
						// 	// heaviest calculations for 8 of the total angles

						// 	// stop if plate max proximity
						// 	xVelocity.set(0);
						// 	// set perfect angle if plate max proximity
						// 	angle.set(Math.round(lastAngle));
						// 	// stop at position for block next change
						// 	x.set(x.get());
						// }
					} else if (Math.round(lastAngle) % 22.5 === 0) {
						// heaviest calculations for 8 of the total angles

						// stop if plate max proximity
						xVelocity.set(0);
						// set perfect angle if plate max proximity
						angle.set(Math.round(lastAngle));
						// stop at position for block next change
						x.set(x.get());
					} else {
						xVelocity.set(xVelocity.get());
					}
					return;
				});
			} else if (lastAngle < 0) {
				// console.log("neg " + lastAngle);

				const actualVel = xVelocity.get();

				theta.map((piSection, index) => {
					if (
						(lastAngle + 10) * (Math.PI / 180) >= -piSection &&
						-piSection >= (lastAngle - 10) * (Math.PI / 180)
					) {
						xVelocity.set(actualVel * 0.01 * 2);
						const h4Title = titleRef.current.textContent;
						const actualTitle = recipes[index].title;
						// Questo --->
						h4Title !== actualTitle
							? (titleRef.current.textContent = recipes[index].title)
							: null;
						// if (Math.round(lastAngle) % -22.5 === 0) {
						// 	angle.set(Math.round(lastAngle));
						// 	x.set(x.get());
						// 	xVelocity.set(0);
						// }
					} else if (Math.round(lastAngle) % -22.5 === 0) {
						angle.set(Math.round(lastAngle));
						x.set(x.get());
						xVelocity.set(0);
					} else {
						xVelocity.set(xVelocity.get());
					}
					return;
				});
			}
		});
	}, []);

	useEffect(() => {
		window.addEventListener("blur", handleCloseTab);
		return () => {
			window.removeEventListener("blur", handleCloseTab);
		};
	}, []);

	return (
		<>
			<section
				ref={sectionRef}
				className={styles["container"]}
				dir="ltr"
				onContextMenu={(event) => event.preventDefault()}
			>
				<motion.div
					className={styles["invisible-div"]}
					drag="x"
					dragConstraints={
						!showModal ? { left: -1400, right: 1400 } : { left: 0, right: 0 }
					}
					dragElastic={0.1}
					style={{ x }}
					onPointerDown={() => {
						const actualAngle = angle.get();
						x.set(0);
						angle.set(actualAngle);
						xVelocity.set(0);
					}}
					onDragTransitionEnd={() => {
						const actualAngle = angle.get();
						x.set(0);
						angle.set(actualAngle);
					}}
				></motion.div>

				<div className={styles["title-search-part"]}>
					<div className={styles["title-container"]}>
						<AnimatedText
							text={`Green Like Nature`}
							className={styles["title-general"]}
						></AnimatedText>
					</div>
					<form onSubmit={handleSubmit} className={styles["search-part"]}>
						<SearchBar
							value={searchTerm}
							position="absolute"
							onChange={handleChange}
						/>
					</form>
					{view && (
						<>
							<motion.div
								initial={{
									opacity: 0.0,
									y: 800
									// <--- modificare per adattare ad altre dimensioni
								}}
								animate={{
									opacity: 1.0,
									y: 0,
									transition: {
										duration: 0.5
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
									{searchData.length > 0 ? (
										<ul className={styles["list"]}>
											{" "}
											<span className={styles["list-label"]}>
												Risultati per: {searchTerm}
											</span>
											{searchData.map((elem) => {
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
									) : filteredList.length > 0 ? (
										<ul className={styles["list"]}>
											{" "}
											<span className={styles["list-label"]}>
												Suggerimenti:
											</span>
											{filteredList.map((elem) => {
												// Here
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
										<p>{`Nessun suggerimento disponibile.`}</p>
									)}
								</div>
							</motion.div>
						</>
					)}
				</div>
				<div className={styles["carousel-container"]}>
					<div className={styles["carousel"]}>
						<div className={styles["circular-container"]}>
							<motion.div
								ref={menuRef}
								className={styles["circular-menu"]}
								style={{
									backgroundImage: `url(${bkgImage.src})`,
									rotateZ: angle
								}}
							>
								<div
									ref={internal}
									className={styles["circular-border-internal"]}
								>
									<Flower />
									<motion.ul
										initial={{
											opacity: 0.0
										}}
										animate={{
											opacity: 1.0,
											transition: {
												duration: 0.5,
												staggerChildren: 0.1
											}
										}}
									>
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
														<Image
															className={styles["plate-image"]}
															src={recipe.image}
															alt={recipe.title}
															width="321"
															height="231"
														/>
													</div>
												</motion.li>
											);
										})}
									</motion.ul>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
				<div className={styles["recipe-title-container"]}>
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
								...oppure ruota e scegline una di stagione:
							</p>
							{/* Text Alternativo qui per ricette salvate */}
							<button
								onClick={handleOpenDetails}
								className={styles["modal-btn"]}
							>
								Dettagli
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		</>
	);
}
