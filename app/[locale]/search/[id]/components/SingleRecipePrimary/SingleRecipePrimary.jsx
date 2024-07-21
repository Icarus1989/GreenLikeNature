"use client";

import { useTranslation } from "react-i18next";

import { useState, useRef, useEffect, useContext } from "react";
import parse from "html-react-parser";

import Link from "next/link";
import Image from "next/image";

import {
	GeneralContext,
	GeneralDispatchContext
} from "@/app/generalContext/GeneralContext";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addRecipe } from "@/lib/features/recipes/recipesSlice";

import { FaArrowLeft } from "react-icons/fa";
import {
	PiClockCountdownBold,
	PiUserBold,
	PiBookmarkSimpleFill,
	PiThumbsUpBold,
	PiCheckBold,
	PiArrowCounterClockwiseBold
} from "react-icons/pi";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
	circleStrokeGradient,
	circleFillGradient,
	forkFillGradient,
	forkStrokeGradient,
	sauceGradient,
	knifeFillGradient,
	knifeStrokeGradient
} from "./Defs";

import styles from "./SingleRecipePrimary.module.css";

export default function SingleRecipePrimary({ data, saved, originalData }) {
	const recipeData = data;

	const { t } = useTranslation();

	const { errorsReport } = useAppSelector((state) => state.recipes);
	const reduxDispatch = useAppDispatch();
	const generalDispatch = useContext(GeneralDispatchContext);
	const settings = useContext(GeneralContext);

	const [completed, setCompleted] = useState(
		settings["complete-recipes"].filter((id) => {
			return Number(recipeData.id) === id;
		}).length > 0
			? true
			: false
	);

	const [goDown, setGoDown] = useState(false);

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

	const ingredients = recipeData.extendedIngredients
		? recipeData.extendedIngredients
		: {
				"No Ingredients": true
		  };
	const steps =
		recipeData.analyzedInstructions.length > 0
			? recipeData.analyzedInstructions[0].steps
			: [
					{
						steps: [
							{
								number: 1,
								equipment: [],
								ingredients: [],
								step: "No steps"
							}
						]
					}
			  ];

	const [recipeInd, setRecipeInd] = useState({
		ingredients: ingredients.map((ingredient, index) => {
			return { [`${ingredient.name}_${index}`]: completed };
		}),
		steps: steps.map((step) => {
			return { [`step-${step.number}`]: completed };
		}),
		complete: { confirm: completed, timestamp: "none" }
	});

	const savedList = settings["saved-recipes"];

	const savedRecipe = savedList.filter((elem) => {
		return String(elem.id) === String(recipeData.id);
	});

	const btnsRef = useRef(null);
	const recipeRef = useRef(null);
	const containerRef = useRef(null);

	const sauceVaraints = {
		hidden: { opacity: 0 },
		visible: { opacity: 1.0, transition: { duration: 0.8 } }
	};
	const newSummary =
		saved === false
			? recipeData.summary
			: recipeData.summary.replaceAll(/\./g, ".\n");
	const cleanSummary = parse(newSummary, {
		replace(domNode) {
			if (domNode.name === "a") {
				return <b>{domNode.children[0].data}</b>;
			}
		}
	});

	function handleDelete() {
		generalDispatch({
			type: "delete",
			id: recipeData.id
		});
	}

	function handleSave() {
		if (settings["saved-recipes"].length === 8) {
			const updateList = settings["saved-recipes"]
				.sort((a, b) => {
					return a.savedAt < b.savedAt;
				})
				.filter((elem, index) => {
					return index !== 0;
				});
			generalDispatch({
				type: "rewrite",
				list: [...updateList, { ...recipeData, savedAt: Date.now() }]
			});
		} else {
			generalDispatch({
				type: "save",
				recipe: { ...recipeData, savedAt: Date.now() }
			});
		}
	}

	function handleChangeRecipe(target) {
		const value = target.checked;
		const name = target.name;
		const category = name.split("-")[0];
		const detail = category === "ingredient" ? name.split("-")[1] : name;
		const key = `${category}s`;
		setRecipeInd((prevRecipeInd) => {
			return {
				...prevRecipeInd,
				[key]: prevRecipeInd[key].map((field) => {
					if (Object.keys(field)[0] === detail) {
						return { [detail]: value };
					} else {
						return field;
					}
				})
			};
		});
	}

	function handleCompleteRecipe(value) {
		if (value === true) {
			setCompleted(() => {
				return value;
			});
			generalDispatch({
				type: "complete_recipe",
				id: recipeData.id
			});
		} else if (value === false) {
			setCompleted(() => {
				return value;
			});
			generalDispatch({
				type: "reset_recipe",
				id: recipeData.id
			});
		}

		setRecipeInd(() => {
			return {
				ingredients: ingredients.map((ingredient, index) => {
					return { [`${ingredient.name}_${index}`]: value };
				}),
				steps: steps.map((step) => {
					return { [`step-${step.number}`]: value };
				}),
				complete: { confirm: value, timestamp: "none" }
			};
		});
	}

	const { scrollYProgress } = useScroll({
		container: recipeRef
	});

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (
			!goDown &&
			scrollYProgress.get() * recipeRef.current.scrollHeight >
				containerRef.current.offsetTop + btnsRef.current.offsetHeight
		) {
			setGoDown(true);
		} else if (
			goDown &&
			scrollYProgress.get() * recipeRef.current.scrollHeight <
				containerRef.current.offsetTop + btnsRef.current.offsetHeight
		) {
			setGoDown(false);
		}
	});

	useEffect(() => {
		const ingrArr = recipeInd["ingredients"];
		const stepArr = recipeInd["steps"];
		let totalValues = 0;
		let checkCount = 0;

		for (let obj of ingrArr) {
			for (const [key, value] of Object.entries(obj)) {
				totalValues = totalValues + 1;
				if (value === true) {
					checkCount = checkCount + 1;
				}
			}
		}
		for (let obj of stepArr) {
			for (const [key, value] of Object.entries(obj)) {
				totalValues = totalValues + 1;
				if (value === true) {
					checkCount = checkCount + 1;
				}
			}
		}

		if (totalValues === checkCount) {
			setCompleted(true);
		} else {
			setCompleted(false);
		}
	}, [recipeInd]);

	if (!navigator.onLine) {
		reduxDispatch(
			setError({ name: "network", message: "Check network connection." })
		);
		setShowError(true);
	}

	return (
		<section
			onLoad={() => {
				if (saved === false) {
					const newReduxRecipe = {
						...originalData
					};
					reduxDispatch(addRecipe(newReduxRecipe));
				}
				return generalDispatch({
					type: "add_recent",
					recipe: recipeData
				});
			}}
			ref={recipeRef}
			className={styles["single-recipe"]}
		>
			<h1 className={styles["main-title"]}>{recipeData.title}</h1>
			<div className={styles["info-container"]}>
				<div className={styles["first-info"]}>
					<div className={styles["images-part"]}>
						<svg viewBox="0 0 20 10" className={styles["recipe-plate"]}>
							<circle
								cx="50%"
								cy="50%"
								r="50%"
								fill="url(#strokeGradient)"
								stroke="url(#fillGradient)"
							/>
							<defs>
								{circleStrokeGradient}
								{circleFillGradient}
							</defs>
						</svg>
						<div className={styles["image-container"]}>
							<Image
								className={styles["image"]}
								src={recipeData.image}
								alt={`${recipeData.title} sample image`}
								width="556"
								height="370"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
			<div ref={containerRef} className={styles["ghost-container"]}>
				<motion.div
					ref={btnsRef}
					className={
						goDown ? styles["btns-container-down"] : styles["btns-container"]
					}
				>
					<button className={styles["undo-btn"]}>
						<Link href="/search">
							<FaArrowLeft className={styles["undo-btn-icon"]} />
							<svg
								className={
									goDown ? styles["fork-svg-down"] : styles["fork-svg"]
								}
								viewBox="0 0 100 500"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeWidth="2px"
									fill="url(#forkFillGradient)"
									stroke="url(#forkStrokeGradient)"
									d="M 42.899 175.322 C 42.899 175.322 43.022 175.473 43.17 175.758 C 43.319 176.043 43.493 176.462 43.597 176.996 C 44.773 183.038 45.531 229.608 44.855 280.4 C 44.179 331.191 44.149 360.724 43.245 383.651 C 42.864 393.32 42.593 409.126 41.876 418.763 C 41.159 428.4 41.783 438.194 40.936 451.59 C 40.385 460.304 39.958 463.813 40.288 470.972 C 40.618 478.131 40.883 482.306 41.766 486.782 C 42.307 489.525 42.64 491.263 43.779 493.707 C 44.918 496.151 46.448 498.116 50.864 498.23 C 54.894 498.334 56.513 496.57 57.441 494.404 C 58.369 492.238 59.17 489.863 59.784 486.973 C 60.751 482.42 61.274 481.943 61.121 471.13 C 60.968 460.317 60.909 461.263 60.469 451.549 C 59.885 438.657 59.756 432.488 58.819 419.643 C 57.882 406.798 57.687 398.796 57.191 383.629 C 56.443 360.764 56.257 331.504 55.303 280.684 C 54.35 229.863 54.911 183.21 56.184 177.143 C 56.298 176.6 56.491 176.178 56.656 175.891 C 56.821 175.604 56.957 175.453 56.957 175.453 M 56.838 175.539 C 56.838 175.539 60.166 173.429 63.941 170.723 C 67.716 168.018 71.938 164.718 73.724 162.337 C 75.765 159.618 77.679 156.323 79.263 152.808 C 80.846 149.292 82.099 145.557 82.817 141.955 C 83.511 138.474 83.665 133.364 83.645 129.124 C 83.626 124.885 83.433 121.515 83.433 121.515 C 83.433 121.515 83.178 113.655 82.836 103.923 C 82.494 94.19 82.066 82.584 81.719 75.093 C 81.393 68.056 81.051 61.036 80.677 54.17 C 80.303 47.303 79.896 40.591 79.441 34.172 C 79.036 28.453 78.581 20.352 78.106 13.68 C 77.631 7.009 77.136 1.767 76.652 1.765 C 76.167 1.764 75.631 7.009 75.107 13.684 C 74.582 20.358 74.069 28.462 73.63 34.177 C 73.138 40.578 72.742 47.295 72.358 54.149 C 71.975 61.002 71.605 67.991 71.167 74.933 C 70.709 82.192 70.052 92.35 69.472 101.181 C 68.892 110.013 68.388 117.517 68.236 119.466 C 68.213 119.761 68.199 119.919 68.187 120.051 C 68.174 120.184 68.162 120.291 68.144 120.484 C 68.12 120.742 68.112 121.064 68.092 121.385 C 68.071 121.707 68.039 122.029 67.964 122.285 C 67.903 122.495 67.833 122.721 67.745 122.916 C 67.658 123.112 67.552 123.278 67.418 123.369 C 67.306 123.446 67.15 123.502 66.993 123.521 C 66.836 123.539 66.679 123.521 66.562 123.448 C 66.384 123.336 66.261 123.133 66.156 122.825 C 66.052 122.516 65.965 122.101 65.857 121.564 C 65.341 118.984 65.085 111.137 64.873 102.063 C 64.66 92.989 64.49 82.689 64.143 75.205 C 63.817 68.17 63.475 61.15 63.101 54.283 C 62.727 47.416 62.32 40.703 61.865 34.284 C 61.46 28.565 61.005 20.464 60.53 13.792 C 60.055 7.121 59.56 1.878 59.076 1.877 C 58.592 1.875 58.056 7.121 57.531 13.796 C 57.006 20.47 56.493 28.574 56.054 34.289 C 55.563 40.689 55.155 47.422 54.766 54.283 C 54.377 61.143 54.007 68.132 53.591 75.045 C 53.161 82.207 52.62 91.774 52.13 100.235 C 51.64 108.697 51.201 116.052 50.973 118.793 C 50.921 119.428 50.877 119.858 50.837 120.207 C 50.797 120.557 50.761 120.825 50.724 121.138 C 50.7 121.348 50.688 121.524 50.671 121.69 C 50.655 121.857 50.634 122.014 50.59 122.186 C 50.545 122.363 50.507 122.579 50.449 122.773 C 50.391 122.967 50.313 123.139 50.186 123.225 C 50.061 123.311 49.846 123.359 49.631 123.362 C 49.417 123.364 49.204 123.321 49.082 123.222 C 48.936 123.104 48.878 122.937 48.843 122.689 C 48.808 122.44 48.796 122.111 48.739 121.669 C 48.434 119.28 48.179 111.412 47.913 102.267 C 47.648 93.123 47.372 82.702 47.025 75.205 C 46.7 68.167 46.358 61.146 45.983 54.28 C 45.609 47.415 45.202 40.703 44.747 34.284 C 44.342 28.565 43.887 20.464 43.412 13.792 C 42.937 7.121 42.442 1.879 41.958 1.877 C 41.473 1.876 40.937 7.121 40.413 13.796 C 39.888 20.47 39.375 28.574 38.936 34.289 C 38.444 40.69 38.043 47.389 37.658 54.233 C 37.272 61.077 36.902 68.066 36.473 75.045 C 36.02 82.421 35.378 92.855 34.815 101.917 C 34.252 110.978 33.768 118.667 33.631 120.549 C 33.611 120.816 33.598 120.973 33.587 121.099 C 33.576 121.225 33.567 121.32 33.555 121.463 C 33.544 121.589 33.541 121.703 33.535 121.817 C 33.529 121.931 33.519 122.047 33.497 122.176 C 33.469 122.336 33.458 122.553 33.424 122.753 C 33.39 122.954 33.333 123.138 33.214 123.23 C 33.084 123.331 32.827 123.389 32.57 123.395 C 32.312 123.401 32.053 123.354 31.92 123.245 C 31.775 123.127 31.727 122.966 31.704 122.728 C 31.68 122.49 31.68 122.175 31.632 121.749 C 31.364 119.394 31.118 111.511 30.852 102.34 C 30.586 93.169 30.301 82.711 29.957 75.205 C 29.634 68.164 29.292 61.143 28.917 54.278 C 28.542 47.413 28.134 40.704 27.679 34.284 C 27.274 28.565 26.819 20.464 26.344 13.792 C 25.869 7.121 25.374 1.879 24.89 1.877 C 24.405 1.876 23.869 7.121 23.345 13.796 C 22.82 20.47 22.307 28.574 21.868 34.289 C 21.376 40.69 20.982 47.373 20.6 54.21 C 20.217 61.046 19.847 68.035 19.405 75.045 C 18.933 82.523 18.178 91.023 17.537 99.198 C 16.896 107.373 16.37 115.223 16.355 121.4 C 16.345 125.514 16.365 128.975 16.534 132.247 C 16.703 135.52 17.022 138.603 17.609 141.961 C 18.195 145.313 19.027 148.835 20.213 152.152 C 21.399 155.47 22.937 158.583 24.936 161.119 C 26.928 163.648 31.498 167.258 35.569 170.236 C 39.64 173.215 43.213 175.561 43.213 175.561"
									transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, 0)"
								/>
								<defs>
									{forkFillGradient}
									{forkStrokeGradient}
								</defs>
							</svg>
						</Link>
					</button>
					<button
						onClick={savedRecipe.length === 0 ? handleSave : handleDelete}
						className={styles["save-btn"]}
					>
						<PiBookmarkSimpleFill
							style={
								savedRecipe.length > 0
									? {
											fill: "rgba(255, 255, 255, 0.0)",
											stroke: "rgba(23, 180, 23, 0.9)"
									  }
									: {
											fill: "rgba(203, 203, 203, 0.85)",
											stroke: "rgba(35, 35, 35, 1.0)"
									  }
							}
							className={styles["save-btn-icon"]}
						/>
						<motion.svg
							viewBox="0 0 70 500"
							xmlns="http://www.w3.org/2000/svg"
							className={
								goDown ? styles["knife-svg-down"] : styles["knife-svg"]
							}
						>
							<path
								style={{ strokeWidth: "2px" }}
								fill="url(#knifeFillGradient)"
								stroke="url(#knifeStrokeGradient)"
								d="M 27.357 2.597 C 27.357 2.597 36.131555372986355 43.06530175220627 38.853 72.694 C 43.48448106819192 123.1174970087963 53.86238979542882 246.75777437929167 43.098 278.383 C 39.332237369980454 289.44661763850036 30.903277760119884 287.249884177024 27.329 298.012 C 18.100924628881586 325.7976458373837 28.13894483244894 433.846450112959 33.281 465.739 C 35.391163237416244 478.82685770012426 44.29320888142333 488.49468569125435 41.207 492.869 C 38.616990886118096 496.54001332473985 26.780806877316362 499.22172519030977 21.334 494.017 C -5.729955799751776 468.15589354384446 27.357 2.597 27.357 2.597 C 27.357000000000003 2.5970000000000004 27.357 2.597 27.357 2.597 C 27.357 2.597 27.356999999999996 2.5969999999999995 27.357 2.597"
								transform="matrix(1, 0, 0, 1, 5.684341886080802e-14, 0)"
							/>
							{savedRecipe.length > 0 && (
								<motion.path
									className={styles["green-sauce"]}
									fill="url(#greenSauce)"
									variants={sauceVaraints}
									initial="hidden"
									animate="visible"
									d="M 30.017 205.741 C 30.017 205.741 23.924768376069064 205.03672743629323 21.807 207.165 C 17.654347656590485 211.3382496098065 15.47322076139627 229.55190269953715 16.488 238.759 C 17.32097443401917 246.31658136455857 20.041925921718533 254.9440994649762 24.622 258.755 C 28.672843226508 262.12554823903395 36.89659157665506 264.60441320206667 41.16 262.168 C 47.085530950255006 258.7817323936868 52.04280203754803 239.76826765872042 51.697 231.297 C 51.448513325422134 225.2097104487286 48.07726719444055 217.404086523109 44.975 215.853 C 42.88334376229611 214.8072036201481 39.73822652934071 218.5232426420041 37.525 217.621 C 34.526574749460224 216.39866370317964 30.017 205.741 30.017 205.741 C 30.017 205.741 30.017 205.74099999999999 30.017 205.741"
								/>
							)}
							<defs>
								{sauceGradient}
								{knifeFillGradient}
								{knifeStrokeGradient}
							</defs>
						</motion.svg>
					</button>
				</motion.div>
			</div>
			<div className={styles["general-info"]}>
				<h3 className={styles["section-title"]}>{t("info_label")}</h3>
				<div className={styles["text-container"]}>
					<p className={styles["time"]}>
						{<PiClockCountdownBold />}{" "}
						<span>{recipeData.readyInMinutes} &apos;</span>
					</p>
					<p className={styles["servings"]}>
						{<PiUserBold />} <span>{recipeData.servings}</span>
					</p>
					<p className={styles["likes"]}>
						{<PiThumbsUpBold />} <span>{recipeData.aggregateLikes}</span>
					</p>
					{recipeData.vegan ? (
						<p className={styles["diet"]}>
							<span>{t("vegan_label")}</span> {<PiCheckBold />}
						</p>
					) : (
						<p className={styles["diet"]}>
							<span>{t("vegetarian_label")}</span> {<PiCheckBold />}
						</p>
					)}
				</div>
			</div>
			<div className={styles["recipe-presentation"]}>
				<h3 className={styles["section-title"]}>{t("presentation_label")}</h3>
				<summary className={styles["recipe-summary"]}>{cleanSummary}</summary>
			</div>
			<div className={styles["ingredients"]}>
				<h3 className={styles["section-title"]}>{t("ingredients_label")}</h3>
				<ul className={styles["total-ingredients"]}>
					{recipeData.extendedIngredients.map((ingredient, index) => {
						return (
							<li
								key={`${ingredient.id}${index}`}
								className={styles["ingredient"]}
							>
								<input
									type="checkbox"
									id={`${ingredient.id}${index}`}
									name={`ingredient-${ingredient.name}_${index}`}
									className={styles["ingredient-checkbox"]}
									checked={
										recipeInd.ingredients[index][`${ingredient.name}_${index}`]
									}
									onChange={(event) => handleChangeRecipe(event.target)}
								/>
								<label htmlFor={`${ingredient.id}${index}`}>
									{ingredient.original}
								</label>
							</li>
						);
					})}
				</ul>
			</div>

			{recipeData.analyzedInstructions.length > 0 && (
				<div className={styles["instructions-container"]}>
					<h3 className={styles["section-title"]}>{t("preparation_label")}</h3>
					<ul className={styles["instructions-list"]}>
						{steps?.map((step, index) => {
							return (
								<li key={`number${step.number}`} className={styles["step"]}>
									<details open={!completed}>
										<summary className={styles["step-title"]}>
											{t("step_label")} {step.number} / {steps.length}
											<input
												id={`step${step.number}`}
												name={`step-${step.number}`}
												type="checkbox"
												className={styles["step-checkbox"]}
												checked={recipeInd.steps[index][`step-${step.number}`]}
												onChange={(event) => handleChangeRecipe(event.target)}
											/>
										</summary>
										{step.equipment.length > 0 && (
											<div className={styles["equipment"]}>
												<h5 className={styles["equipment-title"]}>
													+ {t("tools_label")}
												</h5>
												<ul className={styles["equipment-list"]}>
													{step.equipment.map((tool) => {
														return (
															<li
																className={styles["tool-elem"]}
																key={tool.name}
															>
																<p className={styles["tool-name"]}>
																	{tool.name}
																	{tool.temperature &&
																		` - ${t("temperature_label")}: ${
																			tool.temperature.number
																		}° ${tool.temperature.unit}`}
																</p>
															</li>
														);
													})}
												</ul>
											</div>
										)}
										{step.ingredients.length > 0 && (
											<div className={styles["step-ingredients"]}>
												<h5 className={styles["ingredients-title"]}>
													+ {t("ingredients_label")}
												</h5>
												<ul className={styles["ingredients-list"]}>
													{step.ingredients.map((ingr, index) => {
														return (
															<li
																className={styles["ingredient-name"]}
																key={`${ingr.id}${index}`}
															>
																{ingr.name}
															</li>
														);
													})}
												</ul>
											</div>
										)}
										<p className={styles["step-text"]}>{step.step}</p>
									</details>
								</li>
							);
						})}
					</ul>
				</div>
			)}

			<div className={styles["controls-container"]}>
				<button
					disabled={completed}
					onClick={() => handleCompleteRecipe(true, recipeInd)}
					className={styles["complete-btn"]}
				>
					{completed ? (
						<>
							{t("complete_label")} <PiCheckBold />
						</>
					) : (
						<>{t("sign_complete_label")}</>
					)}
				</button>
				<button
					disabled={!completed}
					onClick={() => handleCompleteRecipe(false, recipeInd)}
					className={styles["reset-btn"]}
				>
					<PiArrowCounterClockwiseBold />
				</button>
			</div>
			{showError && (
				<ErrorModal
					errorsList={errorsMsgs}
					onClick={() => setShowError(false)}
				/>
			)}
		</section>
	);
}
