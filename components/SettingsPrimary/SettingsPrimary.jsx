"use client";

import { useTranslation } from "react-i18next";
import { useState, Suspense, Fragment } from "react";
import UserOption from "../UserOption/UserOption";
import VisualOption from "../VisualOption/VisualOption";
import SavedRecipes from "../SavedRecipes/SavedRecipes";
import AllergiesOption from "../AllergiesOption/AllergiesOption";
import LanguageOption from "../LanguageOption/LanguageOption";
import GrowingTomato from "../GrowingTomato/GrowingTomato";

import styles from "./SettingsPrimary.module.css";

export default function SettingsPrimary({
	seasonalData,
	getSpoonData,
	translateToEng,
	translateList
}) {
	const [animationState, setAnimationState] = useState({
		firstPlant: false,
		secondPlant: false,
		thirdPlant: false,
		fourthPlant: false
	});

	const { t } = useTranslation();

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

	function handleClickFourth() {
		setAnimationState((prevValue) => {
			return {
				...prevValue,
				fourthPlant: true
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
				<p className={styles["description"]}>{t("introduction")}</p>
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
							translateToEng={translateToEng}
							translateList={translateList}
							onStartAnim={() => handleClickThird()}
						/>
					</Suspense>
				</UserOption>
			</Fragment>

			<Fragment>
				<Fragment key="thirdPlant">
					<GrowingTomato
						id="fourthPlant"
						lightPerc="34%"
						growingPerc="0.20"
						xPerc="28%"
						yPerc="63%"
						autoplay={animationState.fourthPlant}
					/>
				</Fragment>
				<UserOption>
					<Suspense fallback={<p>Loading languages...</p>}>
						<LanguageOption onStartAnim={() => handleClickFourth()} />
					</Suspense>
				</UserOption>
			</Fragment>
		</section>
	);
}

// clean
