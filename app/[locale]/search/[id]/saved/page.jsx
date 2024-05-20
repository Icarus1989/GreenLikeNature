import { Suspense } from "react";
import SearchLoading from "../../loading";
import TranslationsProvider from "@/app/i18nProvider/TranslationsProvider";
import initTranslations from "@/app/i18n";
// import SingleRecipeSaved from "@/app/[locale]/search/[id]/components/";
import SingleRecipeSaved from "../components/SingleRecipePrimary/SingleRecipeSaved";

import { translateRecipe } from "@/app/serverActions/ServerActions";

const i18nNamespaces = ["search_id"];

export default async function SingleRecipePage({ params }) {
	const locale = params.locale;
	const { t, resources } = await initTranslations(locale, i18nNamespaces);

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<main>
				{
					<Suspense fallback={<SearchLoading />}>
						<SingleRecipeSaved
							params={params}
							data={[]}
							translateRecipe={translateRecipe}
							saved={true}
						/>
					</Suspense>
				}
			</main>
		</TranslationsProvider>
	);
}
