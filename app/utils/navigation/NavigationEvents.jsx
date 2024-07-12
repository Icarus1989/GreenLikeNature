"use client";

import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	reInitializeRecipes,
	filterByAllergens,
	setError
} from "@/lib/features/recipes/recipesSlice";

import { GeneralContext } from "@/app/generalContext/GeneralContext";

export function NavigationEvents({ getSpoonData }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// const { i18n } = useTranslation();
	// const currentLocale = i18n.language;

	const settings = useContext(GeneralContext);

	const intolerancesSettings = settings["tomato-settings"]["intolerances-list"];
	const allergiesSettings = settings["tomato-settings"]["allergens-list"];

	const { recipesList, initialList, errorsReport } = useAppSelector(
		(state) => state.recipes
	);
	const reduxDispatch = useAppDispatch();

	function elaborateList(list) {
		if (list.length > 0) {
			return list.length > 1 ? list.join(",") : list[0];
		} else {
			return "";
		}
	}

	async function getNewList(inclList, intolList, allergList, num, offset) {
		const includes = elaborateList(inclList);
		const intolerances = elaborateList(intolList);
		const allergies = elaborateList(allergList);
		const data = await getSpoonData(
			includes,
			allergies,
			intolerances,
			num,
			offset
		);
		return data;
	}

	const [lastPath, setLastPath] = useState("");

	// async function createList() {
	// 	const requestList = await getNewList(
	// 		[],
	// 		intolerancesSettings,
	// 		allergiesSettings,
	// 		50,
	// 		100
	// 	);
	// 	if (requestList?.error) {
	// 		reduxDispatch(
	// 			setError({ name: "recipes", message: requestList["error"] })
	// 		);
	// 	} else {
	// 		reduxDispatch(reInitializeRecipes(requestList["results"]));
	// 	}
	// }

	// provare useCallback domani --->

	const createList = useCallback(async () => {
		const requestList = await getNewList(
			[],
			intolerancesSettings,
			allergiesSettings,
			30,
			80
		);
		// console.log(requestList);
		if (requestList?.error) {
			reduxDispatch(
				setError({
					name: "recipes",
					message: `API Data not available -  ${requestList["error"]}`
				})
			);
			return;
		} else {
			reduxDispatch(reInitializeRecipes(requestList["results"]));
		}
	}, [allergiesSettings, intolerancesSettings]);

	useEffect(() => {
		let ignore = false;

		// async function createList() {
		// 	const requestList = await getNewList(
		// 		[],
		// 		intolerancesSettings,
		// 		allergiesSettings,
		// 		50,
		// 		100
		// 	);
		// 	if (requestList?.error) {
		// 		reduxDispatch(
		// 			setError({ name: "recipes", message: requestList["error"] })
		// 		);
		// 	}

		// 	if (!ignore) {
		// 		reduxDispatch(reInitializeRecipes(requestList["results"]));
		// 	}
		// }

		if (
			pathname !== "/profile" &&
			recipesList.length > 0 &&
			recipesList.length < 80 &&
			!ignore
		) {
			// console.log("UPDATE FROM NAVIGATION...");
			createList();
		}

		return () => {
			ignore = true;
		};
	}, [pathname, lastPath, recipesList.length, createList]);

	// rerender (spostare) -->
	// useEffect(() => {
	// 	// if (pathname === "/profile") {
	// 	// console.log("filtered");

	// 	reduxDispatch(
	// 		filterByAllergens({
	// 			intolerances: intolerancesSettings,
	// 			allergies: allergiesSettings
	// 		})
	// 	);
	// 	// }
	// }, [intolerancesSettings, allergiesSettings]);

	useEffect(() => {
		if (navigator.onLine && errorsReport?.network?.message !== null) {
			reduxDispatch(setError({ name: "network", message: null }));
		} else if (!navigator.onLine) {
			reduxDispatch(
				setError({ name: "network", message: "Check network connection." })
			);
		}
	}, [pathname, searchParams, errorsReport?.network?.message]);

	// const [resize, setResize] = useState(false);

	// const router = useRouter();
	console.log(pathname);
	console.log(pathname.slice(0, -2));

	useEffect(() => {
		// window.addEventListener("resize", resizeView);
		// const screen = window.screen;
		// const availHeight = window.screen.availHeight;
		// // console.log(orient);
		// const controls = animatePlates();
		// return () => {
		// 	window.removeEventListener("resize", resizeView);
		// 	controls.start();
		// 	// setResize(() => {
		// 	// 	return true;
		// 	// });
		// };

		function resizeView() {
			// setResize(() => {
			// 	return true;
			// });
			console.log("test refresh");
			// router.push("/");
			// router.replace(router.asPath);

			// console.log("change");
			if (pathname.length > 3) {
				return;
			} else if (pathname.length === 3) {
				console.log("reload");
				window.location.reload();
			}
			// setResize(() => {
			// 	return true;
			// });
			// setRecipes((prevRecipes) => {
			// 	return [...prevRecipes];
			// });
			// setResize(() => {
			// 	return true;
			// });
			// platesScope.animations.play();
			// for (let anim of platesScope.animations) {
			// 	anim.cancel();
			// }

			// recipes.map((recipe, index) => {
			// 	// if (resize) {
			// 	return placePlate(recipe.title, index);
			// 	// }
			// });
			// setResize(() => {
			// 	return false;
			// });

			// setResize(true);
		}
		window.addEventListener("resize", resizeView);

		// const screen = window.screen;
		// const availHeight = window.screen.availHeight;
		// console.log(orient);
		// const controls = animatePlates();

		return () => {
			console.log("clean");
			window.removeEventListener("resize", resizeView);
			// for (let anim of platesScope.animations) {
			// 	for (let group of anim.animations) {
			// 		group.cancel();
			// 	}
			// }

			// platesScope.animations.length = 0;
			// controls.start();
			// setResize(false);
			// setRecipes(() => {
			// 	return settingsType === "seasonal"
			// 		? seasonalRecipes.length > 0
			// 			? [...seasonalRecipes]
			// 			: [...defaultRecipes]
			// 		: savedRecipes;
			// });
		};
	}, [pathname]);

	// useEffect(() => {
	// 	if (resize === true) {
	// 		router.refresh();
	// 	}
	// 	return () => {
	// 		setResize(false);
	// 	};
	// }, [resize]);

	// console.log(recipesList);

	return null;
}
