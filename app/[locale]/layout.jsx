import { Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";
import { seasonalData, getSpoonData } from "../serverActions/ServerActions";
import GeneralProvider from "../generalContext/GeneralContext";
import { NavigationEvents } from "../utils/navigation/NavigationEvents";
import StoreProvider from "../reduxContext/StoreProvider";

import testList from "@/spoonTempData/tempList.json";

import { calcSeasonalListIDs } from "../utils/seasonal/seasonalUtility";

import "./globals.css";
import { Inter } from "next/font/google";

import { i18nConfig } from "@/i18nConfig";
import { dir } from "i18next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Green Like Nature",
	description: "Vegetarian Recipe App"
};

export const viewport = {
	themeColor: "#232323"
};

// <----
// {
// 	/* <meta name="theme-color" content="#123456"></meta> */
// }
// Qui oppure capire come inserire component Head in altre page

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params: { locale } }) {
	const completeList = await calcCleanList();

	const errorsObj = {
		recipes: null,
		seasonal: null
	};

	if (completeList["error"]) {
		errorsObj["recipes"] = completeList["error"];
	}

	const cleanList = await completeList["results"];
	const seasonalRecipes = await calcSeasonalRecipes(cleanList);

	if (seasonalRecipes["error"]) {
		errorsObj["seasonal"] = seasonalRecipes["error"];
	}

	async function calcCleanList() {
		try {
			// Riattivare qui --->
			// const spoonList = await getSpoonData("", "", "", 100, 0);
			// <--- Riattivare qui

			const spoonList = { results: testList };

			if (spoonList["error"]) {
				return { results: [], error: error.message };
			}
			const list =
				spoonList["results"].length > 0
					? spoonList["results"].map((recipe) => {
							return { ...recipe };
					  })
					: [];
			return { results: [...list] };
		} catch (error) {
			return {
				results: [],
				error: `Error on spoonacular suggestions list - ${error.message}`
			};
		}
	}

	async function calcSeasonalRecipes(list) {
		try {
			const seasonalResponse = await seasonalData();
			if (seasonalResponse["error"]) {
				return {
					results: [],
					seasonalList: [],
					error: seasonalResponse["error"]
				};
			}
			const seasonalList = await seasonalResponse["results"];
			const ids = calcSeasonalListIDs(seasonalList, list);
			const recipes =
				ids.length > 0
					? ids.map((id) => {
							return cleanList.find((recipe) => {
								if (Number(recipe.id) === Number(id)) {
									return true;
								} else {
									return false;
								}
							});
					  })
					: [];
			return { results: recipes, seasonalList: seasonalList };
		} catch (error) {
			return {
				results: [],
				seasonalList: [],
				error: `Error on EU Agrifood data loading - ${error.message}`
			};
		}
	}

	return (
		<html lang={locale} dir={dir(locale)}>
			<body className={inter.className}>
				<StoreProvider
					recipes={cleanList}
					list={seasonalRecipes["seasonalList"]}
					seasonal={seasonalRecipes["results"]}
					errors={errorsObj}
				>
					<GeneralProvider>
						{children}
						<Suspense fallback={null}>
							<NavigationEvents getSpoonData={getSpoonData} />
						</Suspense>
					</GeneralProvider>
					<Navbar />
				</StoreProvider>
			</body>
		</html>
	);
}
