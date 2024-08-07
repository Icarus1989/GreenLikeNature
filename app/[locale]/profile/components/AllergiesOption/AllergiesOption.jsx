"use client";

import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef, useContext } from "react";

import { useAppDispatch } from "@/lib/hooks";
import { filterByAllergens } from "@/lib/features/recipes/recipesSlice";

import {
	GeneralContext,
	GeneralDispatchContext
} from "@/app/generalContext/GeneralContext";

import TomatoLeaf from "../TomatoLeaf/TomatoLeaf";
import anime from "animejs/lib/anime.es.js";

import { CiMedicalCross } from "react-icons/ci";
import { PiProhibitBold, PiTrash } from "react-icons/pi";
import styles from "./AllergiesOption.module.css";

export default function AllergiesOptions({
	translateToEng,
	translatedArr,
	onStartAnim
}) {
	const [playAnim, setPlayAnim] = useState({ first: false, second: false });

	const [inputText, setInputText] = useState("");
	const [inputSelect, setInputSelect] = useState("");

	const reduxDispatch = useAppDispatch();

	const inputRef = useRef(null);
	const selectRef = useRef(null);

	const generalDispatch = useContext(GeneralDispatchContext);
	const settings = useContext(GeneralContext);

	const settingsIntol = settings["tomato-settings"]["intolerances-list"];
	const allergiesList = settings["tomato-settings"]["allergens-list"];

	const allergensList = [...allergiesList, ...settingsIntol];

	const [termList, setTermList] = useState([]);
	const { t } = useTranslation();
	const params = useParams();

	const intolerancesObj = {
		dairy: `${t("dairy_value")}`,
		egg: `${t("egg_value")}`,
		gluten: `${t("gluten_value")}`,
		grain: `${t("grain_value")}`,
		peanut: `${t("peanut_value")}`,
		seafood: `${t("seafood_value")}`,
		sesame: `${t("sesame_value")}`,
		shellfish: `${t("shellfish_value")}`,
		soy: `${t("soy_value")}`,
		sulfite: `${t("sulfite_value")}`,
		tree_nut: `${t("treeNut_value")}`,
		wheat: `${t("wheat_value")}`
	};

	function removeAllergen(allergen) {
		const checkText = [];
		for (const elem of [...settingsIntol]) {
			if (elem === allergen) {
				checkText.push(elem);
			}
		}

		if (checkText.length > 0) {
			generalDispatch({
				type: "remove_intolerance",
				name: checkText[0]
			});
		} else {
			generalDispatch({
				type: "remove_allergen",
				name: allergen
			});
		}
	}

	function handleChange(event) {
		const name = event.target.name.split("_")[0];
		const value = event.target.value;
		if (value.length >= 0) {
			if (name === "intolerances") {
				setInputSelect(value);
			} else if (name === "allergies") {
				setInputText(value);
			}
		} else {
			return;
		}
	}

	async function handleClick(event) {
		const target = event.target.closest("button");
		const name = target.name.split("_")[0];

		if (name === "allergies") {
			if (inputText.length > 0) {
				const checkText = [];

				for (const [key, value] of Object.entries(intolerancesObj)) {
					if (value === inputText.toLowerCase()) {
						checkText.push(key);
					} else {
						return;
					}
				}

				if (checkText.length === 0) {
					generalDispatch({
						type: "add_allergen",
						name: inputText.toLowerCase()
					});
				} else {
					generalDispatch({
						type: "add_intolerance",
						name: checkText[0].toLowerCase()
					});
				}

				setPlayAnim((prevPlay) => {
					return { ...prevPlay, first: true };
				});
				setInputText("");
			} else {
				inputRef.current.style.borderColor = "red";
				setTimeout(() => {
					inputRef.current.style.borderColor = "rgb(133, 133, 133)";
				}, 2300);
				return;
			}
		} else if (name === "intolerances") {
			if (inputSelect.length > 0) {
				generalDispatch({
					type: "add_intolerance",
					name: inputSelect.toLowerCase()
				});
				setPlayAnim((prevPlay) => {
					return { ...prevPlay, second: true };
				});
				setInputSelect("");
			} else {
				selectRef.current.style.borderColor = "red";
				setTimeout(() => {
					selectRef.current.style.borderColor = "rgb(133, 133, 133)";
				}, 2300);
				return;
			}
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (inputText.length > 0) {
			const checkText = [];

			for (const [key, value] of Object.entries(intolerancesObj)) {
				if (value === inputText.toLowerCase()) {
					checkText.push(key);
				}
			}

			if (checkText.length === 0) {
				const result = await translateToEng(
					inputText.toLowerCase(),
					params.locale
				);
				generalDispatch({
					type: "add_allergen",
					name: result.text.toLowerCase()
				});

				setInputText("");
			} else {
				generalDispatch({
					type: "add_intolerance",
					name: checkText[0].toLowerCase()
				});
				setInputSelect("");
				setInputText("");
			}

			setPlayAnim((prevPlay) => {
				return { ...prevPlay, first: true };
			});
			setInputText("");
		} else {
			return;
		}
	}

	function animeObj(pathId) {
		return {
			targets: pathId,
			d: [
				{
					value:
						"m15 12.5h-2.5v2.5c0 0.6-1 0.6-1 0v-2.5h-2.5c-0.6 0-0.6-1 0-1h2.5v-2.5c0-0.6 1-0.6 1 0v2.5h2.5c0.6 0 0.6 1 0 1z"
				},
				{
					value:
						"m15.8,10.4c0.5,-0.5 -0.2,-1.2 -0.7,-0.7l-1.8,1.75l-1.8,1.75q-0.8,-0.8 -1.7,-1.7c-0.4,-0.4 -1.2,0.3 -0.7,0.7l2.1,2.1c0.2,0.2 0.5,0.2 0.7,0l1.95,-1.95l1.95,-1.95z"
				},
				{
					value:
						"m15 12.5h-2.5v2.5c0 0.6-1 0.6-1 0v-2.5h-2.5c-0.6 0-0.6-1 0-1h2.5v-2.5c0-0.6 1-0.6 1 0v2.5h2.5c0.6 0 0.6 1 0 1z"
				}
			],
			delay: 0,
			autoplay: false,
			easing: "easeOutElastic(.9, .9)",
			loop: false
		};
	}

	useEffect(() => {
		const btnAnimation = anime(animeObj("#firstBtnPath"));

		if (playAnim.first) {
			btnAnimation.play();
		}
		return () => {
			setPlayAnim({ first: false, second: false });
		};
	}, [playAnim.first]);

	useEffect(() => {
		const btnAnimation = anime(animeObj("#secondBtnPath"));

		if (playAnim.second) {
			btnAnimation.play();
		}
		return () => {
			setPlayAnim({ first: false, second: false });
		};
	}, [playAnim.second]);

	useEffect(() => {
		const namesList = translatedArr.map((elem) => {
			if (elem?.text) {
				return elem.text;
			} else {
				return elem;
			}
		});
		setTermList(() => {
			return namesList;
		});
	}, [translatedArr]);

	useEffect(() => {
		reduxDispatch(
			filterByAllergens({
				intolerances: settingsIntol,
				allergies: allergiesList
			})
		);
	}, [settingsIntol, allergiesList]);

	return (
		<>
			<form className={styles["allergies-form"]} onSubmit={handleSubmit}>
				<fieldset
					onFocus={onStartAnim}
					className={styles["allergies-fieldset"]}
				>
					<legend className={styles["allergies-legend"]}>
						<TomatoLeaf />
						{<CiMedicalCross className={styles["legend-svg"]} />}
					</legend>
					<p className={styles["description"]}>{t("intro_allergies")}</p>
					<div className={styles["add-intolerances"]}>
						<button
							type="submit"
							className={styles["add-btn"]}
							name="intolerances_btn"
							onClick={handleClick}
						>
							<svg
								version="1.2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<path
									id="secondBtnPath"
									d="m15 12.5h-2.5v2.5c0 0.6-1 0.6-1 0v-2.5h-2.5c-0.6 0-0.6-1 0-1h2.5v-2.5c0-0.6 1-0.6 1 0v2.5h2.5c0.6 0 0.6 1 0 1z"
								/>
							</svg>
						</button>
						<select
							name="intolerances_input"
							ref={selectRef}
							value={inputSelect}
							onChange={handleChange}
							className={styles["intolerances-select"]}
						>
							<option key="default" className={styles["intolerance"]} value="">
								{t("intolerance_placeholder")}
							</option>
							{Object.keys(intolerancesObj).map((intol) => {
								return (
									<option
										key={intol}
										value={intol}
										className={styles["intolerance"]}
									>
										{intolerancesObj[intol]}
									</option>
								);
							})}
						</select>
					</div>
					<div className={styles["add-allergens"]}>
						<button
							type="submit"
							className={styles["add-btn"]}
							name="allergies_btn"
						>
							<svg
								version="1.2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
							>
								<path
									id="firstBtnPath"
									d="m15 12.5h-2.5v2.5c0 0.6-1 0.6-1 0v-2.5h-2.5c-0.6 0-0.6-1 0-1h2.5v-2.5c0-0.6 1-0.6 1 0v2.5h2.5c0.6 0 0.6 1 0 1z"
								/>
							</svg>
						</button>
						<label
							htmlFor="allergies_input"
							className={styles["add-allergens-label"]}
						>
							<input
								id="allergies_input"
								placeholder={`${t("allergy_placeholder")}`}
								name="allergies_input"
								ref={inputRef}
								onChange={handleChange}
								value={inputText}
							/>
						</label>
					</div>
					{allergensList.length > 0 ? (
						<ul className={styles["allergens-list"]}>
							{t("list_allergies")}
							{allergensList.map((allergen) => {
								return (
									<li id={allergen} key={allergen}>
										<PiProhibitBold className={styles["donot_icon"]} />{" "}
										{intolerancesObj[allergen]
											? intolerancesObj[allergen]
											: termList.at(allergiesList.indexOf(allergen))}
										<button
											onClick={() => {
												return removeAllergen(allergen);
											}}
											className={styles["allergen-delete-btn"]}
										>
											<PiTrash className={styles["trash_icon"]} />
										</button>
									</li>
								);
							})}
						</ul>
					) : (
						<p className={styles["allergens-empty"]}>
							{t("list_allergies_empty")}
						</p>
					)}
				</fieldset>
			</form>
		</>
	);
}
