// import SingleRecipePrimary from "@/components/SingleRecipePrimary/SingleRecipePrimary";
// import { data } from "@/spoonTempData/testSingleRecipeData";
// import { secondRecipeData } from "@/spoonTempData/secondRecipeData";
import SingleRecipeSaved from "@/components/SingleRecipePrimary/SingleRecipeSaved";
// import * as deepl from "deepl-node";
import { translateRecipe } from "@/app/ServerComponent";

// per test
import recipes from "../../../../spoonTempData/tempList.json";
// per test

import { deeplTranslate } from "@/app/ServerComponent";

export default async function SingleRecipePage({ params }) {
	console.log(params);
	const internalData = recipes.find(
		(recipe) => String(recipe.id) === String(params.id)
	);
	// if (internalData.length === 0) {
	// }
	// console.log(internalData);

	// perfettamente funzionante --->
	// const cleanText = tempData.summary.replace(/(<([^>]+)>)/gi, "");
	// const translatedText = await deeplTranslate(cleanText);

	// Spostare cleanSummary da SingleRecipe per Eng Vers.
	// di default?
	return (
		<main>
			{
				<SingleRecipeSaved
					params={params}
					data={[]}
					translateRecipe={translateRecipe}
					saved={true}
				/>
			}
		</main>
	);
}
