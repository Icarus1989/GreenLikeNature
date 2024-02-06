import SingleRecipe from "@/components/SingleRecipe/SingleRecipe";
// import { data } from "@/spoonTempData/testSingleRecipeData";
import { secondRecipeData } from "@/spoonTempData/secondRecipeData";
import * as deepl from "deepl-node";

async function getData(id) {
	const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=1330da99e91849ae86b3e94990dd9365
`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Fetch Failed");
	}
	return response.json();
}

const deeplAuthKey = process.env.APIKEYDEEPL;
const translator = new deepl.Translator(deeplAuthKey);

async function deeplTranslate(text) {
	const result = await translator.translateText(text, null, "it");
	// console.log(result.text);
	return result;
}

export default async function Recipe({ params }) {
	// const spoonData = await getData(params.id);
	// deeplTranslate();
	const tempData = secondRecipeData;
	// console.log(data);

	// perfettamente funzionante --->
	// const cleanText = tempData.summary.replace(/(<([^>]+)>)/gi, "");
	// const translatedText = await deeplTranslate(cleanText);
	// const newData = { ...tempData, summary: translatedText.text };
	// console.log(newData);
	// <--- perfettamente funzionante
	// <--- Consolidare in text distinti: --->
	// summary
	// steps (tools / ingredients)
	// ingredients
	// ---> risuddividere corettamente
	// ---> creare nuovo object con traduzioni
	// ---> meno richieste possibili ma non una singola enorme

	// Spostare cleanSummary da SingleRecipe per Eng Vers.
	// di default?
	return (
		<main>
			{/* <h1>Recipe with ID: {params.id}</h1> */}
			{<SingleRecipe data={tempData} />}
		</main>
	);
}
