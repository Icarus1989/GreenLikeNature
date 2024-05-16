import axios from "axios";
import TranslationsProvider from "@/app/i18nProvider/TranslationsProvider";
import initTranslations from "@/app/i18n";
import SingleRecipePrimary from "./components/SingleRecipePrimary/SingleRecipePrimary";
import {
	translateRecipe,
	detectIntolerance
} from "@/app/serverActions/ServerActions";
import ErrorPageId from "./error";

async function getDataByID(recipeId) {
	const apiKey = process.env.APIKEYSPOONTWO;
	const url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}
`;
	try {
		const response = await axios({
			method: "get",
			url: url,
			responseType: "json",
			validateStatus: function (status) {
				return status < 500;
			}
		});

		const data = await response.data;

		const {
			id,
			title,
			aggregateLikes,
			analyzedInstructions,
			dairyFree,
			extendedIngredients,
			glutenFree,
			image,
			readyInMinutes,
			servings,
			summary,
			vegan,
			vegetarian
		} = await data;

		const ingrsNames = await extendedIngredients.map((ingr) => ingr.name);

		const eggFree = detectIntolerance("egg", ingrsNames);
		const grainFree = detectIntolerance("grain", ingrsNames);
		const peanutFree = detectIntolerance("peanut", ingrsNames);
		const seafoodFree = detectIntolerance("seafood", ingrsNames);
		const sesameFree = detectIntolerance("sesame", ingrsNames);
		const shellfishFree = detectIntolerance("shellfish", ingrsNames);
		const soyFree = detectIntolerance("soy", ingrsNames);
		const sulfiteFree = detectIntolerance("sulfite", ingrsNames);
		const treeNutFree = detectIntolerance("treeNut", ingrsNames);
		const wheatFree = detectIntolerance("wheat", ingrsNames);

		return {
			id: id,
			title: title,
			aggregateLikes: aggregateLikes,
			analyzedInstructions: analyzedInstructions,
			dairyFree: dairyFree,
			extendedIngredients: extendedIngredients,
			glutenFree: glutenFree,
			eggFree: eggFree,
			grainFree: grainFree,
			peanutFree: peanutFree,
			seafoodFree: seafoodFree,
			sesameFree: sesameFree,
			shellfishFree: shellfishFree,
			soyFree: soyFree,
			sulfiteFree: sulfiteFree,
			treeNutFree: treeNutFree,
			wheatFree: wheatFree,
			image: image,
			readyInMinutes: readyInMinutes,
			servings: servings,
			summary: summary,
			vegan: vegan,
			vegetarian: vegetarian
		};
	} catch (error) {
		return {
			error: error.message
		};
	}
}

const i18nNamespaces = ["search_id"];

export default async function SingleRecipePage({ params }) {
	const lang = params.locale;

	const { t, resources } = await initTranslations(lang, i18nNamespaces);

	const data = await getDataByID(params.id);
	const newData = await translateRecipe(data, lang);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={lang}
			resources={resources}
		>
			<main>
				{data.error && <ErrorPageId error={data.error} />}
				{!data.error && (
					<SingleRecipePrimary
						data={newData}
						saved={false}
						originalData={data}
					/>
				)}
			</main>
		</TranslationsProvider>
	);
}
