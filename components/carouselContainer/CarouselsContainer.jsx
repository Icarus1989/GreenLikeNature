"use client";

import React, { useState, useEffect, useRef, Fragment } from "react";
import styles from "./CarouselContainer.module.css";
import { GoSearch, GoDotFill } from "react-icons/go";
import {
	motion,
	useScroll,
	useSpring,
	useMotionValue,
	useMotionValueEvent,
	useTransform
} from "framer-motion";

import Miniature from "../Miniature/Miniature";
import RecipeSummary from "../RecipeSummary/RecipeSummary";
// import Navbar from "../Navbar/Navbar";
import { firstRecipeData } from "../../spoonTempData/singleRecipeData";
import { secondRecipeData } from "../../spoonTempData/secondRecipeData";
import { thirdRecipeData } from "../../spoonTempData/thirdRecipeData";
import AnimatedText from "../AnimatedText/AnimatedText";
import SearchBar from "../SearchBar/SearchBar";

// const plateVariants = {
// 	hidden: { rotateZ: 0 },
// 	visible: {
// 		rotateZ: (Math.PI / 4) * (180 / Math.PI) * (index - 2)
// 	}
// };

const pathVariants = {
	hidden: {
		pathLength: 0,
		opacity: 0.0
	},
	visible: {
		stroke: "rgba(2, 180, 2, 0.9)",
		pathLength: 1.1,
		opacity: 1.0,
		transition: {
			duration: 5,
			delay: 0.2
		}
	}
};

const netwrokError = null;

export default function CarouselsContainer() {
	const dataImages = [
		"https://spoonacular.com/recipeImages/637187-556x370.jpg",
		"https://spoonacular.com/recipeImages/715551-556x370.jpg",
		"https://spoonacular.com/recipeImages/775585-556x370.jpg",
		"https://spoonacular.com/recipeImages/716426-556x370.jpg",
		"https://spoonacular.com/recipeImages/715381-556x370.jpg"
	];

	// const [isActive, setIsActive] = useState(0);

	const recipes = [
		{ title: "recipe 1", img: dataImages[0] },
		{ title: "recipe 2", img: dataImages[1] },
		{ title: "recipe 3", img: dataImages[2] },
		{ title: "recipe 4", img: dataImages[3] },
		{ title: "recipe 5", img: dataImages[4] },
		{ title: "recipe 6", img: dataImages[4] },
		{ title: "recipe 7", img: dataImages[4] },
		{ title: "recipe 8", img: dataImages[4] }
	];

	const recipeRef = useRef(null);

	const dataArray = [firstRecipeData, secondRecipeData, thirdRecipeData];

	const recipesSumm = dataArray.map((data, index) => {
		return (
			<RecipeSummary
				key={index}
				data={data}
				ref={(node) => {
					const map = getMap();
					if (node) {
						map.set(index, node);
					} else {
						map.delete(index);
					}
				}}
			/>
		);
	});

	function getMap() {
		if (!recipeRef.current) {
			recipeRef.current = new Map();
		}
		return recipeRef.current;
	}

	const menuRef = useRef(null);
	const internal = useRef(null);

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

	// Separare Components: SearchBar / carouselShow (rotating plates) /
	// carouselModern(Old) / carouselClassic (List) / Header (Title + Logo) /
	// ...

	const scrollRef = useRef(null);
	const sectionRef = useRef(null);

	const { scrollXProgress } = useScroll({
		container: sectionRef,
		target: menuRef
	});

	const rotation = useTransform(
		scrollXProgress,
		(latest) => latest * (Math.PI / 4) * (180 / Math.PI) * (recipes.length - 1)
	);

	const rotateZ = useSpring(rotation, {
		// min: 0,
		// max: 800,
		stiffness: 100,
		damping: 10,
		restDelta: 0.001
	});

	useEffect(() => {
		// scrollRef.current.style.width = `${recipes.length * 4}00vw`;
		const measuresContainer = menuRef.current.getBoundingClientRect();
		const measuresInternal = internal.current.getBoundingClientRect();
		// const angle = 0;
		// const angleRad = angle * (Math.PI / 180);

		const hypY =
			(measuresContainer.height / 2 + measuresInternal.height / 2) / 2;
		const hypX = (measuresContainer.width / 2 + measuresInternal.width / 2) / 2;

		function placePlate(itemId, index) {
			const map = getMap();
			const node = map.get(itemId);
			// console.log(node);
			node.style.top =
				hypY * Math.sin(theta[index]) -
				node.getBoundingClientRect().height / 2 +
				measuresInternal.height / 2 +
				"px";
			node.style.left =
				hypX * Math.cos(theta[index]) -
				node.getBoundingClientRect().width / 2 +
				measuresInternal.width / 2 +
				"px";
			// if (index === 3) {
			// 	node.style.display = "none";
			// }
			// node.style.transform = "rotateZ";
		}

		recipes.map((recipe, index) => {
			return placePlate(recipe.title, index);
		});
	}, []);

	// const deg = () => {
	// 	return () => rotateZ();
	// };

	// const rotation = useTransform(rotateZ, (latest) => latest * 360);

	// useMotionValueEvent(rotateZ, "change", (current) => {
	// 	rotateZ.set(current * 2);
	// });

	// console.log(deg());

	// function callRotate(obj) {
	// 	return obj.latest * 1000;
	// }

	// const latest = rotateZ.latest;
	// console.log(deg);

	return (
		<>
			<section
				ref={sectionRef}
				className={styles["container"]}
				// onScroll={() => console.log(rotateZ)}
				dir="ltr"
			>
				<ul
					ref={scrollRef}
					style={{ width: `${recipes.length}00vw` }}
					className={styles["invisible-scroll"]}
					dir="ltr"
				>
					{recipes.map((elem) => {
						return (
							<li key={elem.title} className={styles["invisible-element"]}></li>
						);
					})}
				</ul>
				<div className={styles["title-search-part"]}>
					<div className={styles["title-container"]}>
						<div className={styles["logo-container"]}>
							<motion.svg
								version="1.2"
								viewBox="0 0 256 420"
								width="256"
								height="420"
								className={styles["logo"]}
							>
								<motion.path
									fill="none"
									stroke="transparent"
									strokeWidth="5px"
									initial={{
										pathLength: 0,
										opacity: 0.0
									}}
									animate={{
										stroke: "rgba(2, 180, 2, 0.9)",
										pathLength: 1.1,
										opacity: 1.0,
										transition: {
											duration: 4,
											delay: 0.2
										}
									}}
									// exit="exit"
									d="m87.5 395.7h-13.1c-0.8 0-1.5-0.5-2-1.3-0.6-0.9-0.8-2-0.8-3.2 4.2-97.5 21.9-159 66.1-223.4-33.7 28.7-66.5 79.2-72.1 148.6-0.2 1.8-1 3.2-2.2 3.6-1.2 0.4-2.4-0.3-3-1.8-24.7-59.2-23.9-112.7 2.7-168.5 15.3-30.6 37.3-47.5 56.7-62.4 23.5-18.1 43.7-33.6 48.1-67.7 0.2-1.7 1.1-3 2.2-3.3 1.2-0.3 2.3 0.4 2.9 1.9 30.5 75.8 55.7 151.1 28.6 238.4-21.6 58-57.5 84.9-106.8 80-2.8 18.2-4.3 36.2-4.5 54.9 0 2.3-1.2 4.2-2.8 4.2zm-10.1-8.4h7.4c0.3-19.1 2-37.5 5.1-56.2 0.3-2 1.6-3.3 3-3.2 48.8 5.8 82.7-18.8 103.7-75.1 24.9-80.3 4.1-148.4-25-221.7-7.2 31.4-27.7 47.1-49.2 63.7-19.8 15.2-40.3 30.9-54.8 59.9-23.5 49.4-25.6 97-6.4 149 10-78.6 53.2-132.2 91.7-156.6 1.3-0.8 2.7-0.1 3.5 1.7 0.7 1.7 0.5 4-0.6 5.4-52.8 69.4-73.5 130.8-78.4 233.1z"
								/>
							</motion.svg>
						</div>
						<AnimatedText
							text={`Green Like Nature`}
							className={styles["title-general"]}
						></AnimatedText>
					</div>
					<SearchBar />
				</div>
				{/* <select id="selector" className={styles["recipes-types-selector"]}>
					<optgroup label="Categoria:">
						{netwrokError ? (
							<option disabled>Di Stagione</option>
						) : (
							<option>Di Stagione</option>
						)}
						<option>Salvate</option>
						<option>Suggerite</option>
					</optgroup>
				</select> */}
				<div className={styles["carousel-container"]}>
					<div className={styles.dailyCarousel}>
						<div className={styles["circular-container"]}>
							<motion.div
								ref={menuRef}
								className={styles["circular-menu"]}
								style={{
									rotateZ: rotateZ
								}}
							>
								<div
									ref={internal}
									className={styles["circular-border-internal"]}
								>
									<motion.ul
										initial={{
											opacity: 0.0
										}}
										animate={{
											opacity: 1.0,
											transition: {
												duration: 1,
												staggerChildren: 0.5
											}
										}}
									>
										{recipes.map((recipe, index) => {
											return (
												<motion.li
													key={recipe.title}
													className={styles["plate-container"]}
													id={index}
													ref={(node) => {
														const map = getMap();
														if (node) {
															map.set(recipe.title, node);
														} else {
															map.delete(recipe.title);
														}
													}}
													animate={{
														rotateZ:
															(Math.PI / 4) * (180 / Math.PI) * (index - 2),
														opacity: 1.0
													}}
												>
													{index}
												</motion.li>
											);
										})}
									</motion.ul>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
				<div className={styles["text-container"]}>
					<label className={styles["recipe-title-label"]}>Titolo Ricetta</label>
					<button className={styles["recipe-modal-btn"]}>Dettagli</button>
					{/* <label htmlFor="selector" className={styles["selector-label"]}>
						Seleziona Ricette:{" "}
					</label> */}
				</div>
			</section>
		</>
	);
}

// export default function platesList() {

// }
