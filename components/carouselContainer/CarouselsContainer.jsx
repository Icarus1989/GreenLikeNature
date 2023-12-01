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
	transform
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
	const [isActive, setIsActive] = useState(0);

	const recipeRef = useRef(null);
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

	const { scrollXProgress } = useScroll({
		container: sectionRef,
		target: menuRef
	});

	const rotation = useTransform(
		scrollXProgress,
		(latest) => latest * (Math.PI / 4) * (180 / Math.PI) * (recipes.length - 1)
	);

	const rotateZ = useSpring(rotation, {
		stiffness: 100,
		damping: 10,
		restDelta: 0.001
	});

	useEffect(() => {
		const measuresContainer = menuRef.current.getBoundingClientRect();
		const measuresInternal = internal.current.getBoundingClientRect();

		const hypY =
			(measuresContainer.height / 2 + measuresInternal.height / 2) / 2;
		const hypX = (measuresContainer.width / 2 + measuresInternal.width / 2) / 2;

		// function setNewIndex(value) {
		// 	if (value === 0) {
		// 		return 0;
		// 	} else if (value > 0) {
		// 		return -value - 1;
		// 	}
		// }

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

	return (
		<>
			<section
				ref={sectionRef}
				className={styles["container"]}
				// onScroll={(event) => {
				// 	// i
				// 	console.log(event.target);
				// }}
				dir="ltr"
			>
				<ul
					ref={scrollRef}
					style={{ width: `${recipes.length}00vw` }}
					className={styles["invisible-scroll"]}
					dir="rtl"
				>
					{recipes.map((elem, index) => {
						if (index === 0) {
							return (
								<li key={elem.title} className={styles["invisible-element"]}>
									{/* <svg
										version="1.2"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles["arrow-right"]}
									>
										<path d="m19.3 12.2q0 0 0 0h-4.4l2.6 2.6q-1.1 1.1-2.5 1.7c-1.9 0.9-4.1 0.9-6.1 0.1-2-0.8-3.6-2.3-4.4-4.3-0.8-2-0.8-4.2-0.1-6.1m15.5 11v-5h-0.6c-0.4 1-1 1.9-1.8 2.6z" />
									</svg> */}
								</li>
							);
						} else if (index === recipes.length - 1) {
							return (
								<li key={elem.title} className={styles["invisible-element"]}>
									{/* <svg
										version="1.2"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24"
										height="24"
										className={styles["arrow-right"]}
									>
										<path d="m19.3 12.2q0 0 0 0h-4.4l2.6 2.6q-1.1 1.1-2.5 1.7c-1.9 0.9-4.1 0.9-6.1 0.1-2-0.8-3.6-2.3-4.4-4.3-0.8-2-0.8-4.2-0.1-6.1m15.5 11v-5h-0.6c-0.4 1-1 1.9-1.8 2.6z" />
									</svg> */}
								</li>
							);
						} else {
							return (
								<li key={elem.title} className={styles["invisible-element"]}>
									{/* <label>{elem.title}</label> */}
								</li>
							);
						}
						// console.log(recipes[index + 2]);
					})}
				</ul>
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
								// animate={{ rotate: 90 }}
								className={styles["circular-menu"]}
								style={{
									rotateZ: rotateZ
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
														{/* Here */}
														{/* <img
															className={styles["plate-image"]}
															src={recipe.image}
															alt={recipe.title}
														/> */}
														<Image
															className={styles["plate-image"]}
															src={recipe.image}
															alt={recipe.title}
															width="321"
															height="231"
														/>
														{/* <label>{index}</label> */}
														{/* <label>{recipe.title}</label> */}
														{/* <div
															className={styles["plate-image"]}
															style={{
																background: `url(${recipe.image})`,
																backgroundPosition: "center",
																backgroundSize: "cover",
																backgroundRepeat: "no-repeat",
																borderRadius: "50%"
															}}
														></div> */}
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
				<div className={styles["text-container"]}>
					<p className={styles["text-info"]}>
						...oppure scegline una di stagione:
					</p>
					<h4 className={styles["recipe-title-label"]}>Titolo Ricetta</h4>
					<button className={styles["modal-btn"]}>Dettagli</button>
				</div>
			</section>
		</>
	);
}

// function titleRecipeLabel(label) {
// 	return (

// 	)
// }

// export default function platesList() {

// }
