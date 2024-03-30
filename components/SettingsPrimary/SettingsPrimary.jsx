"use client";

import { useState, Suspense, Fragment } from "react";
import UserOption from "../UserOption/UserOption";
import VisualOption from "../VisualOption/VisualOption";
import SavedRecipes from "../SavedRecipes/SavedRecipes";
import AllergiesOption from "../AllergiesOption/AllergiesOption";
import GrowingTomato from "../GrowingTomato/GrowingTomato";

import styles from "./SettingsPrimary.module.css";

export default function SettingsPrimary({ seasonalData, getSpoonData }) {
	const [animationState, setAnimationState] = useState({
		firstPlant: false,
		secondPlant: false,
		thirdPlant: false
	});

	function handleClickSecond() {
		setAnimationState((prevValue) => {
			return {
				...prevValue,
				secondPlant: true
			};
		});
	}

	function handleClickThird() {
		setAnimationState((prevValue) => {
			return {
				...prevValue,
				thirdPlant: true
			};
		});
	}

	return (
		<section
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
						autoplay={animationState.secondPlant}
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
						autoplay={animationState.thirdPlant}
					/>
				</Fragment>
				<UserOption>
					<Suspense fallback={<p>Loading saved allergens...</p>}>
						<AllergiesOption
							seasonalData={seasonalData}
							getSpoonData={getSpoonData}
							onStartAnim={() => handleClickThird()}
						/>
					</Suspense>
				</UserOption>
			</Fragment>
		</section>
	);
}

// clean
