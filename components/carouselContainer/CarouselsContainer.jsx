"use client";

import React, { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";
import styles from "./CarouselContainer.module.css";
import {
	motion,
	useScroll,
	useSpring,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
	transform,
	useInView,
	useVelocity,
	useDragControls
} from "framer-motion";

import AnimatedText from "../AnimatedText/AnimatedText";
import SearchBar from "../SearchBar/SearchBar";
import Flower from "../FlowerComponent/Flower";

const pathVariants = {
	hidden: {
		pathLength: 0,
		opacity: 1.0
	},
	visible: {
		stroke: "rgba(2, 180, 2, 0.8)",
		strokeWidth: "0.8px",
		pathLength: 1.1,
		opacity: 1.0,
		transition: {
			duration: 5
		}
	}
};

const netwrokError = null;

export default function CarouselsContainer({ recipes, data }) {
	// console.log(data);

	const recipeRef = useRef(null);
	const menuRef = useRef(null);
	const internal = useRef(null);

	const dragRef = useRef(null);

	const theta = [
		0,
		// Math.PI / 6,
		Math.PI / 4,
		// Math.PI / 3,
		Math.PI / 2,
		// 2 * (Math.PI / 3),
		3 * (Math.PI / 4),
		// 5 * (Math.PI / 6),
		Math.PI,
		// 7 * (Math.PI / 6),
		5 * (Math.PI / 4),
		// 4 * (Math.PI / 3),
		3 * (Math.PI / 2),
		// 5 * (Math.PI / 3),
		7 * (Math.PI / 4)
		// 11 * (Math.PI / 6)
	];

	function getMap() {
		if (!recipeRef.current) {
			recipeRef.current = new Map();
		}
		return recipeRef.current;
	}

	// Separare Components: SearchBar / carouselShow (rotating plates) /
	// carouselModern(Old) / carouselClassic (List) / Header (Title + Logo) /
	// ...

	const scrollRef = useRef(null);
	const sectionRef = useRef(null);

	const titleRef = useRef(null);

	const angle = useMotionValue(0);

	const x = useMotionValue(0);
	// const xSmooth = useSpring(x, {
	// 	// stiffness: 50,
	// 	// damping: 4,
	// 	// mass: 1,
	// 	type: "spring",
	// 	// restSpeed: 0.3,
	// 	// stiffness: 1000,
	// 	// damping: 50,
	// 	// mass: 2
	// 	duration: 0.5,
	// 	bounce: 2
	// });

	const xVelocity = useVelocity(x);

	// Da testare
	// const opacity = useTransform(
	// 	xVelocity,
	// 	// Map x from these values:
	// 	[0, 100],
	// 	// Into these values:
	// 	[0, 1],
	// 	{ clamp: false }
	// );

	useEffect(() => {
		return x.on("change", (lastValue) => {
			angle.set(
				angle.get() + -Number((xVelocity.current / (360 / Math.PI)).toFixed(1))
			);
		});
	}, []);

	const recipeDataConst = "";

	const [initialTitle, setInitialTitle] = useState(recipes[0].title);
	const [recipeData, setRecipeData] = useState({
		id: recipes[0].id,
		title: recipes[0].title,
		index: 0,
		missedIngredients: [],
		usedIngredients: []
	});

	const invertedRecipes = [recipes[0], ...recipes.slice(1).reverse()];
	// console.log(invertedRecipes[0].title);

	// useEffect(() => {
	// 	xVelocity.on("change", (lastVelocity) => {
	// 		if (lastVelocity === 0) {
	// 			x.set(0);
	// 		}
	// 	});
	// }, []);

	useEffect(() => {
		angle.on("change", (lastAngle) => {
			if (lastAngle > 360) {
				angle.set(0);
			} else if (lastAngle < -360) {
				angle.set(0);
			}

			const minRadians = Math.abs(lastAngle - 2) * (Math.PI / 180);
			const maxRadians = Math.abs(lastAngle + 2) * (Math.PI / 180);

			if (lastAngle >= 0 && Math.round(lastAngle) % 22.5 === 0) {
				angle.set(Math.round(lastAngle));
				x.set(x.get());
				xVelocity.set(0);
				theta.map((piSection, index) => {
					if (lastAngle * (Math.PI / 180) === piSection) {
						const h4Title = titleRef.current.textContent;
						const actualTitle = invertedRecipes[index].title;
						// Questo --->
						h4Title !== actualTitle
							? (titleRef.current.textContent = invertedRecipes[index].title)
							: null;
						// <--- Questo

						// oppure --->

						// if (invertedRecipes[index].title !== titleRef.current.textContent) {
						// 	titleRef.current.textContent = invertedRecipes[index].title;
						// } else if (
						// 	invertedRecipes[index].title === titleRef.current.textContent
						// ) {
						// 	return;
						// }
						// <--- oppure
					}
					return;

					// <--- Forse provare ad adattare useRef a vecchia struttura
					// sottostante?
				});
			} else if (lastAngle < 0 && Math.round(lastAngle) % -22.5 === 0) {
				angle.set(Math.round(lastAngle));
				x.set(x.get());
				xVelocity.set(0);

				theta.map((piSection, index) => {
					if (lastAngle * (Math.PI / 180) === -piSection) {
						const h4Title = titleRef.current.textContent;
						const actualTitle = recipes[index].title;
						// Questo --->
						h4Title !== actualTitle
							? (titleRef.current.textContent = recipes[index].title)
							: null;
					}
					return;
				});
				return;
			}
			// 		// - Inserire animazione di ritorno del plate al centro
			// 		// con range più estesi per lasciare meno spazi vuoti
			// 		// possibili

			// <--- Creare algoritmo di avvicinamento con distanze minime e
			// massime, capire se con rallentamento con spring o inertia
		});
	}, []);

	useEffect(() => {
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

	// function handleModalClick() {
	// 	recipes.map((recipe) => {

	// 	})
	// }

	return (
		<>
			<section ref={sectionRef} className={styles["container"]} dir="ltr">
				<motion.div
					className={styles["invisible-div"]}
					drag="x"
					dragConstraints={{ left: -1400, right: 1400 }}
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
					<SearchBar position="absolute" />
				</div>
				<div className={styles["carousel-container"]}>
					<div className={styles.dailyCarousel}>
						<div className={styles["circular-container"]}>
							<motion.div
								ref={menuRef}
								className={styles["circular-menu"]}
								// transition={{
								// 	type: "inertia",
								// 	velocity: 100
								// 	// power: 2.0
								// 	// modifyTarget: (target) => Math.round(target / 90) * 90
								// }}
								style={{
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
															// console.log(node);
														} else {
															map.delete(recipe.title);
														}
													}}
													initial={{ opacity: 0 }}
													animate={{
														rotateZ: (Math.PI / 4) * (180 / Math.PI) * index,
														opacity: 1.0
														// transition: { type: "inertia", power: 5 }
													}}
												>
													<div
														className={styles["plate-image-container"]}
														// transition={{ type: "spring", mass: 5 }}
													>
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
				{
					<div className={styles["text-container"]}>
						<p className={styles["text-info"]}>
							...oppure scegline una di stagione:
						</p>
						<motion.h4 ref={titleRef} className={styles["recipe-title-label"]}>
							{initialTitle}
						</motion.h4>
						<button
							onClick={() => console.log(titleRef.current.textContent)}
							// onClick={() => {
							// 	// Creare funzione clickHandler
							// 	// Inserire in invisible-div drag={showModal ? "none" : "x"}
							// 	return showModal(true);
							// }}
							className={styles["modal-btn"]}
						>
							Dettagli
						</button>
					</div>
				}
			</section>
		</>
	);
}
