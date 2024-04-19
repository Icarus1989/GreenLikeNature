import TranslationsProvider from "@/app/i18nProvider/TranslationsProvider";
import initTranslations from "@/app/i18n";
import SingleRecipePrimary from "@/components/SingleRecipePrimary/SingleRecipePrimary";
import { secondRecipeData } from "@/spoonTempData/secondRecipeData";
// import { deeplTranslate } from "@/app/ServerComponent";
import { translateRecipe, detectIntolerance } from "@/app/ServerComponent";

async function getDataByID(recipeId) {
	const apiKey = process.env.APIKEYSPOONTWO;
	const url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}
`;
	// const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Fetch Failed");
	}
	const json = await response.json();
	// const results = await json["results"].map((recipe) => {
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
	} = await json;

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
		// ...json, // <--- forse eliminare le altre properties per alleggerire
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
	// });

	// return { results: [...results] };
	// console.log(json);
	// return json;
}

// [ ] Inserire uso Axios

const i18nNamespaces = ["search_id"];

export default async function SingleRecipePage({ params }) {
	const lang = params.locale;

	const { t, resources } = await initTranslations(lang, i18nNamespaces);

	// Provare ---> per distinguere lingua provare ad aggiungere
	// "-it" alla fine dell'id, poi qui dividere in base al "-"
	// e usare params[0] per id e params[1] per lang così da
	// verificarne la presenza, se non presente o "en" non trad.
	// Poi inserire al posto di lang.

	const data = await getDataByID(params.id);
	const newData = await translateRecipe(data, lang);

	// Spostare cleanSummary da SingleRecipe per Eng Vers.
	// di default?
	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={lang}
			resources={resources}
		>
			<main>
				{
					<SingleRecipePrimary
						data={newData}
						saved={false}
						originalData={data}
					/>
				}
			</main>
		</TranslationsProvider>
	);
}
