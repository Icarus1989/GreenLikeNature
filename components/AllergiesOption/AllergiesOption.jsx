"use client";

import { useEffect, useState, useRef } from "react";
import TomatoLeaf from "../TomatoLeaf/TomatoLeaf";
import anime from "animejs/lib/anime.es.js";
import styles from "./AllergiesOption.module.css";

import { CiMedicalCross } from "react-icons/ci";
import { PiProhibitBold, PiTrash } from "react-icons/pi";

export default function AllergiesOptions() {
	const [allergens, setAllergens] = useState([]);
	const [playAnim, setPlayAnim] = useState(false);
	const [placeholder, setPlaceholder] = useState({ msg: "", color: "" });

	const inputRef = useRef(null);
	// function playAnim() {
	// 	useEffect(() => {
	// 	});
	// }

	function removeAllergen(id) {
		console.log("Remove");
		const newList = allergens.filter((allergen) => allergen.id !== id);
		console.log(newList);
		return setAllergens(() => newList);
	}

	function addAllergen(value) {
		setAllergens((prevAllergenes) => {
			return [...prevAllergenes, { id: value, name: value }];
		});
	}

	function handleClick(value) {
		const itemExist = allergens.filter((allergen) => {
			// console.log(allergen);
			return allergen.name.toUpperCase() === value.toUpperCase();
		});
		if (itemExist.length > 0) {
			setPlaceholder({ msg: "Allergene già indicato", color: "red" });
		} else {
			addAllergen(value);
			setPlayAnim(true);
		}
	}

	// const btnAnimation = anime({
	// 	targets: "#btnPath",
	// 	d: [
	// 		{
	// 			value:
	// 				"m15 12.5h-2.5v2.5c0 0.6-1 0.6-1 0v-2.5h-2.5c-0.6 0-0.6-1 0-1h2.5v-2.5c0-0.6 1-0.6 1 0v2.5h2.5c0.6 0 0.6 1 0 1z"
	// 		},
	// 		{
	// 			value:
	// 				"m15.8,10.4c0.5,-0.5 -0.2,-1.2 -0.7,-0.7l-1.8,1.75l-1.8,1.75q-0.8,-0.8 -1.7,-1.7c-0.4,-0.4 -1.2,0.3 -0.7,0.7l2.1,2.1c0.2,0.2 0.5,0.2 0.7,0l1.95,-1.95l1.95,-1.95z"
	// 		},
	// 		{
	// 			value:
	// 				"m15 12.5h-2.5v2.5c0 0.6-1 0.6-1 0v-2.5h-2.5c-0.6 0-0.6-1 0-1h2.5v-2.5c0-0.6 1-0.6 1 0v2.5h2.5c0.6 0 0.6 1 0 1z"
	// 		}
	// 	],
	// 	delay: 0,
	// 	autoplay: false,
	// 	easing: "easeOutElastic(.6, .9)",
	// 	duration: 2000,
	// 	loop: false
	// });

	useEffect(() => {
		const btnAnimation = anime({
			targets: "#btnPath",
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
			easing: "easeOutElastic(.6, .9)",
			duration: 1500,
			loop: false
		});

		if (playAnim) {
			btnAnimation.play();
		}
		return () => {
			setPlayAnim(false);
		};
	}, [playAnim]);

	return (
		<>
			<fieldset className={styles["allergies-fieldset"]}>
				<legend className={styles["allergies-legend"]}>
					<TomatoLeaf />
					{<CiMedicalCross className={styles["legend-svg"]} />}
				</legend>
				<p className={styles["description"]}>
					Segnala le tue allergie o intolleranze per escuderle dalle ricerche
					automaticamente:
				</p>
				<label
					htmlFor="allergies_input"
					className={styles["add-allergens-label"]}
				>
					<button
						onClick={() => {
							if (inputRef.current.value.length > 0) {
								handleClick(inputRef.current.value);
								inputRef.current.value = "";
								inputRef.current.placeholder = "";
								return console.log("Added.");
							} else {
								// inputRef.current.placeholder = "Inserire un valore";
								setPlaceholder({ msg: "Inserire un valore", color: "" });
							}
						}}
					>
						<svg
							version="1.2"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<path
								id="btnPath"
								d="m15 12.5h-2.5v2.5c0 0.6-1 0.6-1 0v-2.5h-2.5c-0.6 0-0.6-1 0-1h2.5v-2.5c0-0.6 1-0.6 1 0v2.5h2.5c0.6 0 0.6 1 0 1z"
							/>
						</svg>
					</button>
					<input
						id="allergies_input"
						placeholder={placeholder.msg}
						onFocus={() => setPlaceholder({ msg: "", color: "white" })}
						// style={{ color: placeholder.color }}
						ref={inputRef}
					/>
				</label>
				{allergens.length > 0 ? (
					<ul className={styles["allergens-list"]}>
						Lista allergeni inseriti:
						{allergens.map((allergen) => {
							return (
								<li id={allergen.name} key={allergen.name}>
									<PiProhibitBold className={styles["donot_icon"]} />{" "}
									{allergen.name.toUpperCase()}
									<button
										onClick={() => removeAllergen(allergen.name)}
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
						Nessun allergene indicato.
					</p>
				)}
			</fieldset>
		</>
	);
}
