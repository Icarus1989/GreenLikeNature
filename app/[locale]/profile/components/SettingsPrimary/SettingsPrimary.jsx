"use client";

import { useState, useEffect, useContext, Suspense, Fragment } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setError } from "@/lib/features/recipes/recipesSlice";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";

import UserOption from "../UserOption/UserOption";
import VisualOption from "../VisualOption/VisualOption";
import SavedRecipes from "../SavedRecipes/SavedRecipes";
import AllergiesOption from "../AllergiesOption/AllergiesOption";
import LanguageOption from "../LanguageOption/LanguageOption";
import GrowingTomato from "../GrowingTomato/GrowingTomato";

import ErrorModal from "../../../../components/ErrorModal/ErrorModal";

import styles from "./SettingsPrimary.module.css";

// for testing
import SettingsLoading from "../../loading";
// for testing

// test

import {
	GeneralContext,
	GeneralDispatchContext
} from "@/app/generalContext/GeneralContext";

// test

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

	// const { errorsReport } = useAppSelector((state) => state.recipes);
	const reduxDispatch = useAppDispatch();

	const settings = useContext(GeneralContext);

	const settingsIntol = settings["tomato-settings"]["intolerances-list"];
	const allergiesList = settings["tomato-settings"]["allergens-list"];

	const allergensList = [...allergiesList, ...settingsIntol];

	const [resultsList, setResultsList] = useState([]);

	const params = useParams();

	useEffect(() => {
		let ignore = false;

		const translateToLocale = async () => {
			if (allergiesList.length > 0) {
				const result = await translateList(allergiesList, params.locale);
				console.log(result);

				// const result = await transMemo;

				// if (result[0]?.error) {
				// 	reduxDispatch(setError({ name: "list", message: result[0]?.error }));
				// 	// setVisualError(true);
				// } else if (!result[0]?.error) {
				// 	reduxDispatch(setError({ name: "list", message: null }));
				// 	// setVisualError(false);
				// }

				// restituire questo --->
				// const namesList = await result.map((elem) => elem.text);
				// portare fuori funzione da Effect
				// if (!ignore) {
				setResultsList(() => {
					return result;
				});
			} else {
				return;
			}
			// }
		};

		if (!ignore) {
			// const res = translateToLocale();
			// console.log(res);

			// // restituire questo --->
			// const namesList = res.map((elem) => elem.text);
			// portare fuori funzione da Effect
			// if (!ignore) {
			translateToLocale();
		}

		return () => {
			ignore = true;
		};
	}, [allergiesList, params.locale, translateList]);

	const { errorsReport } = useAppSelector((state) => state.recipes);

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
						<SavedRecipes handleClick={handleClickSecond} />
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
							translatedArr={resultsList}
							setVisualError={(value) => setShowError(value)}
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
			{showError && (
				<ErrorModal
					errorsList={errorsMsgs}
					onClick={() => setShowError(false)}
				/>
			)}
		</section>
		// <SettingsLoading />
	);
}
