import SingleRecipePrimary from "@/components/SingleRecipePrimary/SingleRecipePrimary";
import { secondRecipeData } from "@/spoonTempData/secondRecipeData";
// import { deeplTranslate } from "@/app/ServerComponent";
import { translateRecipe } from "@/app/ServerComponent";

async function getDataByID(id) {
	const apiKey = process.env.APIKEYSPOONTWO;
	const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}
`;
	// const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Fetch Failed");
	}
	const json = await response.json();
	return json;
}

// [ ] Inserire uso Axios

export default async function SingleRecipePage({ params }) {
	const lang = "it";

	// Provare ---> per distinguere lingua provare ad aggiungere
	// "-it" alla fine dell'id, poi qui dividere in base al "-"
	// e usare params[0] per id e params[1] per lang così da
	// verificarne la presenza, se non presente o "en" non trad.
	// Poi inserire al posto di lang.

	const data = await getDataByID(params.id);
	const newData = await translateRecipe(data, lang);

	// Spostare cleanSummary da SingleRecipe per Eng Vers.
	// di default?
	return <main>{<SingleRecipePrimary data={newData} saved={false} />}</main>;
}
