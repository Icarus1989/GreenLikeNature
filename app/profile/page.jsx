"use client";

import UserOption from "@/components/UserOption/UserOption";
import VisualOption from "@/components/VisualOption/VisualOption";
import GrowingTomato from "@/components/GrowingTomato/GrowingTomato";
import DivAnimation from "@/components/DivAnimation/DivAnimation";
import SavedRecipes from "@/components/SavedRecipes/SavedRecipes";
import AllergiesOption from "@/components/AllergiesOption/AllergiesOption";
import TomatoPlant from "@/components/TomatoPlant/TomatoPlant";
import { useState, Suspense, Fragment } from "react";
import styles from "./page.module.css";

import { firstRecipeData } from "@/spoonTempData/singleRecipeData";
import { secondRecipeData } from "@/spoonTempData/secondRecipeData";
import { thirdRecipeData } from "@/spoonTempData/thirdRecipeData";

export default function Profile() {
	const [setting, setSettings] = useState({
		visualOption: "",
		savedOption: [],
		allergensOption: []
	});

	// const [tempRecipes, setTempRecipes] = useState([
	// 	firstRecipeData,
	// 	secondRecipeData,
	// 	thirdRecipeData,
	// 	firstRecipeData,
	// 	secondRecipeData,
	// 	thirdRecipeData,
	// 	thirdRecipeData
	// ]);

	const [playState, setPlayState] = useState({
		first: true,
		second: false,
		third: false
	});

	const [play, setPlay] = useState(false);

	function handleClickSecond() {
		console.log("click");
		setPlay((prevValue) => {
			return (prevValue = true);
		});
		console.log(play);
	}

	return (
		<main
			onContextMenu={(event) => event.preventDefault()}
			className={styles["main-container"]}
		>
			<div className={styles["title-section"]}>
				<h2 className={styles["title"]}>Tomato Settings</h2>
				<p className={styles["description"]}>
					Personalizza la tua esperienza modificando le opzioni per le varie
					pagine:
				</p>
			</div>
			<Fragment>
				<Fragment key="firstPlant">
					<GrowingTomato
						id="firstPlant"
						lightPerc="23%"
						growingPerc="0.26"
						xPerc="23%"
						yPerc="52%"
						autoplay={true}
					/>
				</Fragment>
				<UserOption>
					<VisualOption />
				</UserOption>
			</Fragment>

			<Fragment>
				<Fragment key="secondPlant">
					<GrowingTomato
						id="secondPlant"
						lightPerc="26%"
						growingPerc="0.23"
						xPerc="25%"
						yPerc="56%"
						autoplay={play}
					/>
				</Fragment>
				<UserOption>
					<Suspense fallback={<p>Loading saved recipes...</p>}>
						<SavedRecipes onClick={handleClickSecond} />
					</Suspense>
				</UserOption>
			</Fragment>

			<Fragment>
				<Fragment key="thirdPlant">
					<GrowingTomato
						id="thirdPlant"
						lightPerc="30%"
						growingPerc="0.20"
						xPerc="28%"
						yPerc="63%"
						autoplay={false}
					/>
				</Fragment>
				<UserOption>
					<Suspense fallback={<p>Loading saved allergens...</p>}>
						<AllergiesOption />
					</Suspense>
				</UserOption>
			</Fragment>
		</main>
	);
}
