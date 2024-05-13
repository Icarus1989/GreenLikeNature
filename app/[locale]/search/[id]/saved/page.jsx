import TranslationsProvider from "@/app/i18nProvider/TranslationsProvider";
import initTranslations from "@/app/i18n";
import SingleRecipeSaved from "../components/SingleRecipePrimary/SingleRecipeSaved";

import { translateRecipe } from "@/app/serverActions/ServerActions";

// per test
import recipes from "@/spoonTempData/tempList.json";
// per test

// import { deeplTranslate } from "@/app/ServerComponent";

const i18nNamespaces = ["search_id"];

export default async function SingleRecipePage({ params }) {
	const locale = params.locale;
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	const internalData = recipes.find(
		(recipe) => String(recipe.id) === String(params.id)
	);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
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
		</TranslationsProvider>
	);
}
